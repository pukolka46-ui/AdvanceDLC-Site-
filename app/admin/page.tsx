"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaKey, FaUserShield, FaUser, FaTrash, FaSyncAlt, FaLock, FaUnlock } from "react-icons/fa";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [licenseKeys, setLicenseKeys] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [newKeyModal, setNewKeyModal] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);

  // ----------------------- Проверка доступа -----------------------
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");
      if (user.email !== "pukolka46@gmail.com") return router.push("/dashboard");
      setUser(user);
    };
    fetchUser();
  }, [router]);

  // ----------------------- Загрузка данных -----------------------
  useEffect(() => {
    const fetchData = async () => {
      const { data: usersData } = await supabase.from("uids").select("*");
      setUsers(usersData || []);

      const { data: keysData } = await supabase.from("license_keys").select("*");
      setLicenseKeys(keysData || []);

      const { data: subsData } = await supabase.from("subscriptions").select("*");
      setSubscriptions(subsData || []);
    };
    fetchData();
  }, []);

  // ----------------------- Функции -----------------------
  const generateKey = async () => {
    const key = `ADV-${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000)}-SUPERCAR`;
    const { data, error } = await supabase.from("license_keys").insert([{ key, used: false }]);

    if (error) {
      alert("Ошибка создания ключа: " + error.message);
      return;
    }

    // Проверка на null и пустой массив
    if (!data || data.length === 0) {
      alert("Ошибка: ключ не был создан");
      return;
    }

    setLicenseKeys(prev => [{ ...data[0] }, ...prev]);
    setNotifications(prev => [`Создан ключ: ${key}`, ...prev]);
    setNewKeyModal(false);
  };

  const resetUserHWID = async (uid: string) => {
    const newHWID = window.navigator.userAgent.replace(/\D+/g, "") + Math.floor(Math.random() * 10000);
    await supabase.from("uids").update({ hwid: newHWID }).eq("id", uid);
    setUsers(prev => prev.map(u => u.id === uid ? { ...u, hwid: newHWID } : u));
    setNotifications(prev => [`HWID сброшен пользователю ${uid}`, ...prev]);
  };

  const toggleBlockUser = async (uid: string, blocked: boolean) => {
    await supabase.from("uids").update({ blocked: !blocked }).eq("id", uid);
    setUsers(prev => prev.map(u => u.id === uid ? { ...u, blocked: !blocked } : u));
    setNotifications(prev => [`Пользователь ${uid} ${blocked ? "разблокирован" : "заблокирован"}`, ...prev]);
  };

  // ----------------------- UI -----------------------
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0F1B] via-[#101828] to-[#1B2233] text-white px-6 pt-24">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 flex items-center gap-2">
          <FaUserShield /> Админ панель
        </h1>

        {/* ----------------------- Ключи ----------------------- */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Лицензионные ключи</h2>
          <button onClick={() => setNewKeyModal(true)} className="bg-blue-600 hover:bg-blue-700 p-2 rounded-xl flex items-center gap-2">
            <FaKey /> Новый ключ
          </button>
        </div>
        <div className="bg-white/10 rounded-xl p-4 mb-6">
          {licenseKeys.length === 0 ? <p>Нет ключей</p> : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {licenseKeys.map((k) => (
                <div key={k.id} className="p-2 bg-white/20 rounded flex justify-between items-center">
                  <span>{k.key}</span>
                  <span>{k.used ? "Использован" : "Свободен"}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ----------------------- Пользователи ----------------------- */}
        <h2 className="text-2xl font-bold mb-2">Пользователи</h2>
        <div className="bg-white/10 rounded-xl p-4 mb-6 space-y-2">
          {users.length === 0 ? <p>Нет пользователей</p> : users.map((u) => (
            <div key={u.id} className="flex justify-between items-center p-2 bg-white/20 rounded">
              <div className="flex flex-col">
                <span><FaUser /> UID: {u.uid}</span>
                <span>HWID: {u.hwid}</span>
                <span>Status: {u.blocked ? "Заблокирован" : "Активен"}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => resetUserHWID(u.id)} className="p-2 bg-purple-600 hover:bg-purple-700 rounded"><FaSyncAlt /></button>
                <button onClick={() => toggleBlockUser(u.id, u.blocked)} className="p-2 bg-red-600 hover:bg-red-700 rounded">
                  {u.blocked ? <FaUnlock /> : <FaLock />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ----------------------- Модалка генерации ключа ----------------------- */}
        <AnimatePresence>
          {newKeyModal && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className="bg-black/90 p-8 rounded-3xl w-96 flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-center mb-2">Создать новый ключ</h2>
                <button onClick={generateKey} className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold flex justify-center gap-2">
                  <FaKey /> Создать
                </button>
                <button onClick={() => setNewKeyModal(false)} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold">
                  Закрыть
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ----------------------- Пуш уведомления ----------------------- */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
          {notifications.slice(0, 5).map((note, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg"
            >
              {note}
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
