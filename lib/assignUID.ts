import { supabase } from "./supabaseClient";

export async function assignUID(userId: string) {
  // Получаем максимальный UID
  const { data: maxData, error: maxError } = await supabase
    .from("uids")
    .select("uid")
    .order("uid", { ascending: false })
    .limit(1)
    .single();

  if (maxError && maxError.code !== "PGRST116") { // пустая таблица
    console.error("Ошибка получения max UID:", maxError);
    return null;
  }

  const nextUID = maxData?.uid ? maxData.uid + 1 : 1;

  // Сохраняем новый UID
  const { data, error } = await supabase.from("uids").insert([
    { user_id: userId, uid: nextUID },
  ]);

  if (error) {
    console.error("Ошибка присвоения UID:", error);
    return null;
  }

  return nextUID;
}
