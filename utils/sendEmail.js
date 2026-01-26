import nodemailer from "nodemailer";

export async function sendConfirmationEmail(toEmail, token) {
  // Настройка SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL
    auth: {
      user: process.env.dvancsdlc@gmail.com, // advancsdlc@gmail.com
      pass: process.env.uwwh gmbz pfdy gsfr, // App Password
    },
  });

  // Тело письма
  const mailOptions = {
    from: '"AdvanceDLCSupport" <advancsdlc@gmail.com>', 
    to: toEmail,
    subject: "Подтвердите свой email",
    html: `<p>Привет! Чтобы подтвердить регистрацию, нажми <a href="https://advance-dlc-site-39hn.vercel.app/confirm?token=${token}">сюда</a>.</p>`,
  };

  // Отправка письма
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}
