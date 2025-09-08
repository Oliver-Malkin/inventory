'use server';

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECCURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

export async function sendEmail({
  recipient,
  subject,
  body,
}: {
  recipient: string;
  subject: string;
  body: string;
}) {
  try {
    await transporter.verify();
  } catch (error) {
    console.error('Something went wrong', error);
    return;
  }
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: recipient,
    subject: subject,
    text: body,
  });
  console.log('Message Sent', info.messageId);
  return info;
}
