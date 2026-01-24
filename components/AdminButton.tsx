"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { FaUserShield } from "react-icons/fa"; // иконка для админки

export default function AdminButton() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return; // пользователь не залогинен
      if (user.email === "pukolka46@gmail.com") setIsAdmin(true);
    };
    checkAdmin();
  }, []);

  if (!isAdmin) return null; // не показываем кнопку, если не админ

  return (
    <button
      onClick={() => router.push("/admin")}
      className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-xl font-semibold shadow-lg transition"
    >
      <FaUserShield className="text-white" />
      <span>Админ панель</span>
    </button>
  );
}
