import { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

const HCAPTCHA_SECRET_KEY = import.meta.env.HCAPTCHA_SECRET_KEY;
const RECIPIENT_EMAIL = 'info@mulek.cc';
const SENDER_EMAIL = 'info@mulek.cc';

const transporter = nodemailer.createTransport({
  sendmail: true,
  newline: 'unix',
  path: '/usr/sbin/sendmail',
});

export const POST = async ({ request }) => {
  try {
    const body = await request.text();
    const data = new URLSearchParams(body);

    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    const hcaptchaToken = data.get('h-captcha-response');

    if (!name || !email || !message || !hcaptchaToken) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields or CAPTCHA token.' }), { status: 400 });
    }

    // HCAPTCHA Verification
    const verifyUrl = 'https://api.hcaptcha.com/siteverify';
    const verifyResponse = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: HCAPTCHA_SECRET_KEY, response: hcaptchaToken.toString() }),
    });

    const verifyResult = await verifyResponse.json();

    if (!verifyResult.success) {
      return new Response(JSON.stringify({ success: false, message: 'CAPTCHA verification failed. Please try again.' }), { status: 401 });
    }

    // Send Email
    const mailOptions = {
      from: `"${name}" <${SENDER_EMAIL}>`,
      replyTo: email.toString(),
      to: RECIPIENT_EMAIL,
      subject: `Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message.toString().replace(/\n/g, '<br>')}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true, message: 'Your message has been sent successfully! Thank you.' }), { status: 200 });

  } catch (error) {
    // This console error remains to capture any critical failures in your production logs
    console.error('Email submission system error:', error);
    return new Response(JSON.stringify({ success: false, message: 'An internal server error occurred. Please try again later.' }), { status: 500 });
  }
};
