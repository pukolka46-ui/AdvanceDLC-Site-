import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendMail } from "@/lib/mailer";

export async function POST(req: Request) {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { key, hwid, email } = await req.json();

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

  // 4️⃣ Отправка письма через mailer
  if (email) {
    await sendMail(
      email,
      "Регистрация успешно выполнена",
      `Ваш ключ ${key} успешно активирован!`
    );
  }

  return NextResponse.json({ ok: true });
}
