import nodemailer from 'nodemailer';

export const POST = async ({ request }) => {
  // Environment variables
  const host = import.meta.env.SMTP_HOST;
  const port = parseInt(import.meta.env.SMTP_PORT) || 2525;
  const user = import.meta.env.SMTP_USER;
  const pass = import.meta.env.SMTP_PASS;
  const secret = import.meta.env.HCAPTCHA_SECRET_KEY;

  try {
    const data = await request.json();
    const { name, email, message, captcha } = data;

    // --- hCaptcha Verification ---
    const verifyUrl = 'https://hcaptcha.com/siteverify';
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        response: captcha,
        secret: secret,
      }).toString(),
    });
    const verification = await response.json();

    if (!verification.success) {
      console.error("hCaptcha REJECTED the request. Error codes:", verification['error-codes']);
      return new Response(JSON.stringify({ 
        success: false, 
        message: `Captcha rejected by server: ${verification['error-codes']?.join(', ')}`
      }), { status: 403 });
    }

    // --- Mail Sending Logic ---
    const transporter = nodemailer.createTransport({
      host: host,
      port: port,
      secure: port === 465 || port === 8465, // Only true for "Implicit" ports
      auth: { user, pass },
      requireTLS: true, // Forces encryption
      proxy: false 
    });

    await transporter.sendMail({
      from: 'info@mulek.cc',
      replyTo: `"${name}" <${email}>`,
      to: 'info@mulek.cc',
      subject: `Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return new Response(JSON.stringify({ success: true, message: "Sent!" }), { status: 200 });
    
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
};