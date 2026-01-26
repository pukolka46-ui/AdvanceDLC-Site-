// app/api/check/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Используем require для nodemailer, чтобы не ломался TypeScript
const nodemailer = require("nodemailer");

// Инициализация SMTP внутри функции, чтобы не запускалось на build-time
async function sendMail(to: string, subject: string, text: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log("Email sent:", info.response);
    return info;
  } catch (err) {
    console.error("Mailer error:", err);
    return null;
  }
}

export async function POST(req: Request) {
  // Инициализируем Supabase внутри функции, чтобы не запускался на build
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { key, hwid, email } = await req.json(); // email добавлен для уведомления

  // 1️⃣ Проверка ключа
  const { data: license } = await supabase
    .from("license_keys")
    .select("*")
    .eq("key", key)
    .single();

  if (!license || !license.used) {
    return NextResponse.json({ ok: false, reason: "INVALID_KEY" });
  }

  // 2️⃣ Проверка бана
  const { data: ban } = await supabase
    .from("bans")
    .select("*")
    .eq("user_id", license.user_id)
    .single();

  if (ban) {
    return NextResponse.json({ ok: false, reason: "BANNED" });
  }

  // 3️⃣ Проверка HWID
  const { data: saved } = await supabase
    .from("hwids")
    .select("*")
    .eq("user_id", license.user_id)
    .single();

  if (!saved) {
    await supabase.from("hwids").insert({
      user_id: license.user_id,
      hwid,
    });
  } else if (saved.hwid !== hwid) {
    return NextResponse.json({ ok: false, reason: "HWID_MISMATCH" });
  }

  // 4️⃣ Отправка уведомления на почту (если email передан)
  if (email) {
    await sendMail(
      email,
      "Регистрация успешно выполнена",
      `Ваш ключ ${key} был успешно активирован!`
    );
  }

  return NextResponse.json({ ok: true });
}
