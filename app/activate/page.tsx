"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ActivatePage() {
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  const [subUntil, setSubUntil] = useState<string | null>(null);

  const getProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("sub_until")
      .eq("user_id", user.id)
      .single();

    setSubUntil(data?.sub_until || null);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const activateKey = async () => {
    setMessage("");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: keyRow, error } = await supabase
        .from("license_keys")
        .select("*")
        .eq("key", key)
        .eq("used", false)
        .single();

      if (error || !keyRow) {
        setMessage("Ключ недействителен или уже использован");
        return;
      }

      const until = new Date();
      until.setDate(until.getDate() + keyRow.days);

      // Обновляем подписку
      await supabase
        .from("profiles")
        .update({ sub_until: until.toISOString() })
        .eq("user_id", user.id);

      // Помечаем ключ использованным
      await supabase
        .from("license_keys")
        .update({ used: true, used_by: keyRow.id })
        .eq("id", keyRow.id);

      // Логируем действие
      await supabase.from("admin_logs").insert({
        admin_id: user.id,
        action: "Активировал ключ",
        target_uid: keyRow.id,
      });

      setMessage("Ключ успешно активирован!");
      setSubUntil(until.toISOString());
    } catch (e) {
      console.error(e);
      setMessage("Ошибка при активации ключа");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Активация ключа</h1>

      {subUntil && (
        <div className="mb-4 p-4 bg-green-700 rounded">
          Ваша подписка активна до: {new Date(subUntil).toLocaleDateString()}
        </div>
      )}

      <input
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Введите ключ"
        className="mb-3 p-2 text-black rounded w-64"
      />
      <button
        onClick={activateKey}
        className="mb-3 p-2 rounded bg-purple-600 font-bold"
      >
        Активировать
      </button>

      {message && <p className="text-green-400">{message}</p>}

      {/* 🔥 Кнопка лаунчера, если есть подписка */}
      {subUntil && new Date(subUntil) > new Date() && (
        <a
          href="/launcher.exe" // путь к твоему файлу лаунчера
          download
          className="mt-4 inline-flex items-center gap-2 bg-yellow-500 text-black font-bold p-3 rounded-lg hover:brightness-110"
        >
          <img src="/launcher-icon.png" className="w-6 h-6" alt="Launcher" />
          Скачать лаунчер
        </a>
      )}
    </div>
  );
}
