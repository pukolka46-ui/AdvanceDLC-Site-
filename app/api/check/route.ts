import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  // Инициализируем Supabase внутри функции, чтобы не запускался на этапе build
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { key, hwid } = await req.json();

  // 1. Проверка ключа
  const { data: license } = await supabase
    .from("license_keys")
    .select("*")
    .eq("key", key)
    .single();

  if (!license || !license.used) {
    return NextResponse.json({ ok: false, reason: "INVALID_KEY" });
  }

  // 2. Бан
  const { data: ban } = await supabase
    .from("bans")
    .select("*")
    .eq("user_id", license.user_id)
    .single();

  if (ban) {
    return NextResponse.json({ ok: false, reason: "BANNED" });
  }

  // 3. HWID
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

  return NextResponse.json({ ok: true });
}
