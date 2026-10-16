import nodemailer from 'nodemailer';

// Field limits, also mirrored as maxlength on the form in contact.astro
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
const MAX_BODY_LENGTH = 32 * 1024; // the captcha token is a few KB; anything bigger isn't a real submission

// Each IP gets RATE_LIMIT valid submissions per RATE_WINDOW_MS. Kept in memory, so it resets when the server restarts.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const attempts = new Map(); // ip -> timestamps of recent submissions

// --- Config check, runs once when the server first loads this endpoint ---
const env = {
  SMTP_HOST: import.meta.env.SMTP_HOST,
  SMTP_USER: import.meta.env.SMTP_USER,
  SMTP_PASS: import.meta.env.SMTP_PASS,
  HCAPTCHA_SECRET_KEY: import.meta.env.HCAPTCHA_SECRET_KEY,
};
const missing = Object.keys(env).filter((key) => !env[key]);
if (missing.length) {
  console.error(`[contact] Contact form is disabled. Missing environment variables: ${missing.join(', ')}`);
}

const port = parseInt(import.meta.env.SMTP_PORT) || 2525;
const transporter = missing.length
  ? null
  : nodemailer.createTransport({
      host: env.SMTP_HOST,
      port,
      secure: port === 465 || port === 8465, // Only true for "Implicit" ports
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
      requireTLS: true, // Forces encryption
      proxy: false,
    });

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const reply = (status, message, headers = {}) =>
  new Response(JSON.stringify({ success: status === 200, message }), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });

// The site runs behind Dokploy's reverse proxy, which appends the real client address
// as the last X-Forwarded-For entry. Earlier entries come from the client and can be faked.
function clientIp(request, clientAddress) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',').pop().trim();
  return clientAddress;
}

// Records this attempt and returns how many seconds to wait if the IP is over the limit
function rateLimited(ip) {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);

  // Forget IPs that have gone quiet so the map doesn't grow forever
  if (attempts.size > 1000) {
    for (const [key, times] of attempts) {
      if (now - times[times.length - 1] >= RATE_WINDOW_MS) attempts.delete(key);
    }
  }

  if (recent.length >= RATE_LIMIT) {
    attempts.set(ip, recent);
    return Math.ceil((recent[0] + RATE_WINDOW_MS - now) / 1000);
  }
  recent.push(now);
  attempts.set(ip, recent);
  return 0;
}

// Collapses line breaks so a name can't add lines to the email subject
const singleLine = (value) => value.replace(/[\r\n\t]+/g, ' ').trim();

export const POST = async ({ request, clientAddress }) => {
  if (!transporter) {
    return reply(503, 'The contact form is temporarily unavailable. Please try again later.');
  }

  // Refuse obviously oversized requests before reading them into memory
  if (Number(request.headers.get('content-length')) > MAX_BODY_LENGTH) {
    return reply(413, 'That message is too long.');
  }

  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_LENGTH) {
      return reply(413, 'That message is too long.');
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return reply(400, 'Invalid request.');
    }

    const fields = [data?.name, data?.email, data?.message, data?.captcha];
    if (!fields.every((field) => typeof field === 'string')) {
      return reply(400, 'Please fill in all fields.');
    }

    const name = singleLine(data.name);
    const email = data.email.trim();
    const message = data.message.trim();

    if (!name || !email || !message) {
      return reply(400, 'Please fill in all fields.');
    }
    if (name.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
      return reply(400, `Please keep your name under ${MAX_NAME} characters and your message under ${MAX_MESSAGE}.`);
    }
    if (!EMAIL_PATTERN.test(email)) {
      return reply(400, 'Please enter a valid email address.');
    }
    if (!data.captcha) {
      return reply(400, 'Please complete the captcha.');
    }

    // Only count submissions that pass validation, so typos don't use up a visitor's attempts
    const retryAfter = rateLimited(clientIp(request, clientAddress));
    if (retryAfter) {
      return reply(429, 'Too many messages. Please try again later.', { 'Retry-After': String(retryAfter) });
    }

    // --- hCaptcha Verification ---
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        response: data.captcha,
        secret: env.HCAPTCHA_SECRET_KEY,
      }).toString(),
    });
    const verification = await response.json();

    if (!verification.success) {
      console.error('[contact] hCaptcha rejected the request. Error codes:', verification['error-codes']);
      return reply(403, 'Captcha verification failed. Please try again.');
    }

    // --- Mail Sending Logic ---
    await transporter.sendMail({
      from: 'info@mulek.cc',
      replyTo: { name, address: email },
      to: 'info@mulek.cc',
      subject: `Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return reply(200, 'Thanks! Your message has been sent.');
  } catch (error) {
    console.error('[contact] Failed to send message:', error);
    return reply(500, 'Something went wrong sending your message. Please try again later.');
  }
};
