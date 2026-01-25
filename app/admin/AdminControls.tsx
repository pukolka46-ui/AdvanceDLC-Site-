"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const generateKey = () =>
  crypto.randomUUID().replaceAll("-", "").toUpperCase();

export default function AdminControls() {
  const [days, setDays] = useState(30);
  const [uid, setUid] = useState("");
  const [hwid, setHwid] = useState("");
  const [message, setMessage] = useState("");

  // 🔑 Генерация ключа
  const createKey = async () => {
    const key = generateKey();

    await supabase.from("license_keys").insert({
      key,
      days,
    });

    setMessage(`Ключ создан: ${key}`);
  };

  // 🚫 Бан по HWID
  const banHwid = async () => {
    await supabase.from("uids").update({ blocked: true }).eq("hwid", hwid);
    setMessage("HWID заблокирован");
  };

  // 🔄 Сброс HWID
  const resetHwid = async () => {
    await supabase
      .from("uids")
      .update({ hwid: null, blocked: false })
      .eq("id", Number(uid));

    setMessage("HWID сброшен");
  };

  // ⭐ Выдача подписки
  const giveSub = async () => {
    const until = new Date();
    until.setDate(until.getDate() + days);

    await supabase
      .from("profiles")
      .update({ sub_until: until.toISOString() })
      .eq("uid", Number(uid));

    setMessage("Подписка выдана");
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h2 className="font-bold">Генерация ключа</h2>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="text-black p-2 mr-2"
        />
        <button onClick={createKey}>Создать</button>
      </div>

      <div>
        <h2 className="font-bold">Бан по HWID</h2>
        <input
          value={hwid}
          onChange={(e) => setHwid(e.target.value)}
          className="text-black p-2 mr-2"
        />
        <button onClick={banHwid}>Забанить</button>
      </div>

      <div>
        <h2 className="font-bold">Сброс HWID</h2>
        <input
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          className="text-black p-2 mr-2"
        />
        <button onClick={resetHwid}>Сбросить</button>
      </div>

      <div>
        <h2 className="font-bold">Выдать подписку</h2>
        <button onClick={giveSub}>Выдать</button>
      </div>

      {message && <p className="text-green-400">{message}</p>}
    </div>
  );
}
