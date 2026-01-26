// lib/mailer.ts
const nodemailer = require("nodemailer");

// Функция отправки почты
export async function sendMail(to: string, subject: string, text: string) {
  // Инициализация транспорта внутри функции для безопасного SSR
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "persanul211@gmail.com",      // Твоя почта Gmail
      pass: process.env.EMAIL_PASS,       // App Password Gmail
    },
  });

  try {
    const info = await transporter.sendMail({
      from: "persanul211@gmail.com",      // Обязательно совпадает с Gmail
      to,
      subject,
      text,
    });
    console.log("Email sent:", info.response);
    return info;
  } catch (err) {
    console.error("Mailer error:", err);
    throw err;
  }
}
