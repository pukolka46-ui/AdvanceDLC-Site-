import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // сюда Vercel автоматически подставит EMAIL_USER
    pass: process.env.EMAIL_PASS,   // сюда Vercel автоматически подставит EMAIL_PASS
  },
});

export async function sendMail(to: string, subject: string, text: string) {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
  return info;
}
