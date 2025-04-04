// lib/actions.js
'use server';
import nodemailer from 'nodemailer';

export async function sendEmail(formData) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // tls: {
    //     rejectUnauthorized: false, // This accepts self-signed certificates
    // },
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
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error('Failed to send message. Please try again later.');
  }
}