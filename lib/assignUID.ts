import { supabase } from "./supabaseClient";

export async function assignUID(userId: string): Promise<number | null> {
  try {
    // Берём последний UID
    const { data, error } = await supabase.from("uids").select("id").order("id", { ascending: false }).limit(1);
    if (error) return null;

    const lastId = data && data.length > 0 ? (data[0].id as number) : 0;
    return lastId + 1; // следующий порядковый UID
  } catch {
    return null;
  }
}
