"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

// Надёжный генератор HWID
const generateHWID = () => `HWID-${crypto.randomUUID()}`;

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

    // Проверка никнейма
    if (!/^[a-zA-Z0-9]{3,20}$/.test(nickname)) {
      setError("Никнейм должен быть 3–20 символов (англ. буквы и цифры)");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Регистрация пользователя
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signUpError || !signUpData.user) {
        setError(signUpError?.message || "Ошибка регистрации");
        setLoading(false);
        return;
      }

      const userId = signUpData.user.id;

      // 2️⃣ HWID
      const hwid = generateHWID();

      // 3️⃣ UID
      const { data: uidRow, error: uidError } = await supabase
        .from("uids")
        .insert([{ hwid, blocked: false }])
        .select()
        .single();

      if (uidError || !uidRow) {
        console.error("UID insert error:", uidError);
        setError("Ошибка сервера. Попробуйте позже.");
        setLoading(false);
        return;
      }

      // 4️⃣ Профиль
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          user_id: userId,
          nickname,
          uid: uidRow.id,
        },
      ]);

      if (profileError) {
        console.error("Profile insert error:", profileError);
        setError("Ошибка сервера. Попробуйте позже.");
        setLoading(false);
        return;
      }

      // ✅ ГОТОВО (без UID/HWID)
      alert(
        "Регистрация прошла успешно!\n\nПожалуйста, подтвердите аккаунт, перейдя по ссылке в письме, отправленном на вашу почту."
      );

      router.push("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Произошла ошибка регистрации");
    } finally {
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
