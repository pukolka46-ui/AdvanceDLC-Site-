"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { assignUID } from "../../lib/assignUID";

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

    // Проверяем никнейм на английские буквы и цифры
    if (!/^[a-zA-Z0-9]{3,20}$/.test(nickname)) {
      setError("Никнейм должен быть 3-20 символов, только англ. буквы и цифры");
      setLoading(false);
      return;
    }

    // 1️⃣ Регистрируем пользователя
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message);
      return;
    }

    const userId = data.user?.id;
    if (!userId) {
      setLoading(false);
      setError("Не удалось получить ID пользователя");
      return;
    }

    // 2️⃣ Присваиваем UID
    const uid = await assignUID(userId);
    if (!uid) {
      setLoading(false);
      setError("Не удалось присвоить UID");
      return;
    }

    // 3️⃣ Сохраняем Никнейм в таблицу profiles
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([{ user_id: userId, nickname, uid }]);

    if (profileError) {
      setLoading(false);
      setError("Не удалось сохранить Никнейм");
      return;
    }

    setLoading(false);
    alert(`Регистрация успешна! Ваш UID: ${uid}\nНикнейм: ${nickname}\nПроверьте email для подтверждения.`);
    router.push("/login");
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
