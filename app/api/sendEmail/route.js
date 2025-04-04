// app/api/sendEmail/route.js
import nodemailer from 'nodemailer';

export async function POST(request) {
  // Parse the incoming form data
  const formData = await request.formData();

  // Create the transporter using explicit SMTP configuration for Gmail
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,       // Use port 465 for SSL
    secure: true,    // Use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    ...(process.env.NODE_ENV === 'development' && {
        tls: {
          rejectUnauthorized: false,
        },
    }),
  });

  const mailOptions = {
    from: formData.get('email'),
    to: process.env.YOUR_EMAIL,
    subject: `New message from ${formData.get('name')}`,
    text: `
      Name: ${formData.get('name')}
      Email: ${formData.get('email')}
      Message: ${formData.get('message')}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: 'Failed to send message. Please try again later.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
