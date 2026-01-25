"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import AdminControls from "./AdminControls";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (error || data.role !== "admin") {
        router.push("/");
        return;
      }

      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Проверка доступа…
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Админ-панель</h1>
      <AdminControls />
    </main>
  );
}
