import nodemailer from 'nodemailer';

const RECIPIENT_EMAIL = 'info@mulek.cc';

// Use msmtp/sendmail or SMTP
const transporter = nodemailer.createTransport({
  sendmail: true,
  newline: 'unix',
  path: '/usr/bin/msmtp', // adjust if needed
});

export const POST = async ({ request }) => {
  try {
    const data = await request.json(); // parse JSON payload

    const name = data.name?.trim();
    const email = data.email?.trim();
    const message = data.message?.trim();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid email address.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Send email
    await transporter.sendMail({
      from: 'info@mulek.cc',
      replyTo: `"${name}" <${email}>`,
      to: RECIPIENT_EMAIL,
      subject: `Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message.replace(/\n/g, '<br>')}</p>`,
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Your message has been sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Email submission error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error. Please try again later.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
