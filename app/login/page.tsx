"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Вход</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 px-4 py-2 rounded-xl bg-white/10 w-72 focus:outline-none"
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 px-4 py-2 rounded-xl bg-white/10 w-72 focus:outline-none"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={handleLogin}
        disabled={loading}
        className="px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl font-semibold"
      >
        {loading ? "Загрузка..." : "Войти"}
      </button>
    </main>
  );
}
