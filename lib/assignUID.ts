import { supabase } from "./supabaseClient";

// Если понадобится порядковый UID отдельно
export async function assignUID(): Promise<number | null> {
  const { data, error } = await supabase
    .from("uids")
    .select("id")
    .order("id", { ascending: false })
    .limit(1);

  if (error) return null;
  return data?.[0]?.id ?? 0 + 1;
}
