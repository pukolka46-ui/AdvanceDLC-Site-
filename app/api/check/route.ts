import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Nodemailer через require для TS
const nodemailer = require("nodemailer");

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
  } catch (err) {
    console.error("Mailer error:", err);
  }
}

export async function POST(req: Request) {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { key, hwid, email } = await req.json(); // email нужен для уведомления

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

  // 4️⃣ Отправка письма, если email передан
  if (email) {
    await sendMail(
      email,
      "Регистрация успешно выполнена",
      `Ваш ключ ${key} успешно активирован!`
    );
  }

  return NextResponse.json({ ok: true });
}
