"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

// Генератор уникального HWID
const generateHWID = () =>
  `HWID-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    if (!/^[a-zA-Z0-9]{3,20}$/.test(nickname)) {
      setError("Никнейм должен быть 3-20 символов, только англ. буквы и цифры");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Регистрируем пользователя через Supabase Auth
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError || !signUpData.user) {
        setError(signUpError?.message || "Ошибка регистрации");
        setLoading(false);
        return;
      }

      const userId = signUpData.user.id;

      // 2️⃣ Генерируем HWID
      const hwid = generateHWID();

      // 3️⃣ Вставляем запись в таблицу uids (auto-increment id)
      const { data: uidsData, error: uidsError } = await supabase
        .from("uids")
        .insert([{ hwid, blocked: false }])
        .select();

      if (uidsError || !uidsData || uidsData.length === 0) {
        console.error("UID/HWID insert error:", uidsError);
        setError("Не удалось создать запись UID/HWID");
        setLoading(false);
        return;
      }

      // Получаем UID, который сгенерировал Supabase
      const uid = uidsData[0].id;

      // 4️⃣ Вставляем никнейм в таблицу profiles
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ user_id: userId, nickname, uid }]);

      if (profileError) {
        console.error("Profile insert error:", profileError);
        setError("Не удалось сохранить никнейм");
        setLoading(false);
        return;
      }

      setLoading(false);
      alert(
        `Регистрация успешна!\nUID: ${uid}\nHWID: ${hwid}\nНикнейм: ${nickname}\nПроверьте email для подтверждения.`
      );

      router.push("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Произошла ошибка регистрации");
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black text-white px-4">
      <div className="bg-black/70 p-10 rounded-3xl shadow-lg flex flex-col items-center w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6">Регистрация</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 px-4 py-3 rounded-xl bg-white/10 w-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="text"
          placeholder="Никнейм (только англ.)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="mb-4 px-4 py-3 rounded-xl bg-white/10 w-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 px-4 py-3 rounded-xl bg-white/10 w-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 hover:brightness-110 rounded-2xl font-bold text-black shadow-lg transition"
        >
          {loading ? "Загрузка..." : "Зарегистрироваться"}
        </button>

        <p className="mt-4 text-white/70 text-sm">
          Уже есть аккаунт?{" "}
          <span
            className="text-purple-400 cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Войти
          </span>
        </p>
      </div>
    </main>
  );
}
