import { supabase } from "./supabaseClient";

export async function assignUID(): Promise<number | null> {
  // Берём max ID из таблицы uids
  const { data, error } = await supabase.from("uids").select("id").order("id", { ascending: false }).limit(1);
  if (error) return null;

  const lastId = data?.[0]?.id ?? 0;
  return lastId + 1;
}
