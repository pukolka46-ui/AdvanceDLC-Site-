"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

const generateHWID = () => `HWID-${crypto.randomUUID()}`;

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    if (!/^[a-zA-Z0-9]{3,20}$/.test(nickname)) {
      setError("Никнейм должен быть 3–20 символов (англ. буквы и цифры)");
      setLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError || !data.user) {
        setError(signUpError?.message || "Ошибка регистрации");
        setLoading(false);
        return;
      }

      const hwid = generateHWID();

      const { data: uidRow, error: uidError } = await supabase
        .from("uids")
        .insert([{ hwid, blocked: false }])
        .select()
        .single();

      if (uidError) {
        setError("Ошибка сервера");
        setLoading(false);
        return;
      }

      const { error: profileError } = await supabase.from("profiles").insert([
        {
          user_id: data.user.id,
          nickname,
          uid: uidRow.id,
        },
      ]);

      if (profileError) {
        setError("Ошибка сервера");
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError("Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 to-black text-white">
      <div className="w-full max-w-md rounded-3xl bg-black/70 p-8">
        <h1 className="mb-6 text-center text-3xl font-bold">Регистрация</h1>

        <input
          className="mb-3 w-full rounded-xl p-3 bg-white/10"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mb-3 w-full rounded-xl p-3 bg-white/10"
          placeholder="Никнейм"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <input
          type="password"
          className="mb-3 w-full rounded-xl p-3 bg-white/10"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="mb-3 text-red-500">{error}</p>}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full rounded-xl bg-purple-600 p-3 font-bold"
        >
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </div>

      {/* ✅ MODAL */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
          <div className="bg-black rounded-2xl p-8 text-center max-w-sm">
            <h2 className="text-2xl font-bold mb-3 text-green-400">
              Регистрация успешна
            </h2>
            <p className="mb-6 text-white/80">
              Проверьте письмо на почте для подтверждения аккаунта.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="w-full rounded-xl bg-purple-600 p-3 font-bold"
            >
              Перейти к входу
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
