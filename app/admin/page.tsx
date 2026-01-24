"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaKey, FaUserShield, FaUser, FaSyncAlt, FaLock, FaUnlock, FaGift } from "react-icons/fa";

type UserData = {
  id: number; // Auto increment ID → UID
  hwid: string;
  blocked: boolean;
  subscription?: string | null;
};

type LicenseKey = {
  id: number;
  key: string;
  used: boolean;
};

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [licenseKeys, setLicenseKeys] = useState<LicenseKey[]>([]);
  const [newKeyModal, setNewKeyModal] = useState(false);
  const [hwidModal, setHwidModal] = useState<{ open: boolean; uid: number | null }>({ open: false, uid: null });
  const [blockModal, setBlockModal] = useState<{ open: boolean; uid: number | null; blocked: boolean }>({ open: false, uid: null, blocked: false });
  const [subscriptionModal, setSubscriptionModal] = useState<{ open: boolean; uid: number | null }>({ open: false, uid: null });
  const [notifications, setNotifications] = useState<string[]>([]);

  // ----------------------- Загрузка пользователей и ключей -----------------------
  useEffect(() => {
    const fetchData = async () => {
      const { data: usersData } = await supabase.from("uids").select("*").order("id", { ascending: true });
      setUsers(usersData as UserData[] || []);

      const { data: keysData } = await supabase.from("license_keys").select("*");
      setLicenseKeys(keysData as LicenseKey[] || []);
    };
    fetchData();
  }, []);

  // ----------------------- Генерация нового ключа -----------------------
  const generateKey = async () => {
    const key = `ADV-${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000)}-SUPERCAR`;
    const { data, error } = await supabase.from("license_keys").insert([{ key, used: false }]).select();

    if (error || !data || data.length === 0) {
      alert("Ошибка при создании ключа");
      return;
    }

    setLicenseKeys(prev => [data[0] as LicenseKey, ...prev]);
    setNotifications(prev => [`Создан ключ: ${key}`, ...prev]);
    setNewKeyModal(false);
  };

  // ----------------------- HWID -----------------------
  const resetHWID = async (uid: number) => {
    const newHWID = `HWID-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    await supabase.from("uids").update({ hwid: newHWID }).eq("id", uid);
    setUsers(prev => prev.map(u => u.id === uid ? { ...u, hwid: newHWID } : u));
    setNotifications(prev => [`HWID сброшен пользователю ${uid}`, ...prev]);
    setHwidModal({ open: false, uid: null });
  };

  // ----------------------- Блокировка -----------------------
  const toggleBlockUser = async (uid: number, blocked: boolean) => {
    await supabase.from("uids").update({ blocked: !blocked }).eq("id", uid);
    setUsers(prev => prev.map(u => u.id === uid ? { ...u, blocked: !blocked } : u));
    setNotifications(prev => [`Пользователь ${uid} ${blocked ? "разблокирован" : "заблокирован"}`, ...prev]);
    setBlockModal({ open: false, uid: null, blocked: false });
  };

  // ----------------------- Подписка -----------------------
  const grantSubscription = async (uid: number, type: string) => {
    await supabase.from("subscriptions").insert([{ uid, type }]);
    setUsers(prev => prev.map(u => u.id === uid ? { ...u, subscription: type } : u));
    setNotifications(prev => [`Выдана подписка "${type}" пользователю ${uid}`, ...prev]);
    setSubscriptionModal({ open: false, uid: null });
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
              {licenseKeys.map(k => (
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
          {users.length === 0 ? <p>Нет пользователей</p> : users.map(u => (
            <div key={u.id} className="flex justify-between items-center p-2 bg-white/20 rounded">
              <div className="flex flex-col">
                <span><FaUser /> UID: {u.id}</span>
                <span>HWID: {u.hwid}</span>
                <span>Status: {u.blocked ? "Заблокирован" : "Активен"}</span>
                <span>Подписка: {u.subscription || "Нет"}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setHwidModal({ open: true, uid: u.id })} className="p-2 bg-purple-600 hover:bg-purple-700 rounded"><FaSyncAlt /></button>
                <button onClick={() => setBlockModal({ open: true, uid: u.id, blocked: u.blocked })} className="p-2 bg-red-600 hover:bg-red-700 rounded">
                  {u.blocked ? <FaUnlock /> : <FaLock />}
                </button>
                <button onClick={() => setSubscriptionModal({ open: true, uid: u.id })} className="p-2 bg-green-600 hover:bg-green-700 rounded">
                  <FaGift />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ----------------------- Модалки ----------------------- */}
        <AnimatePresence>
          {/* Новый ключ */}
          {newKeyModal && (
            <motion.div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="bg-black/90 p-8 rounded-3xl w-96 flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-center">Создать новый ключ</h2>
                <button onClick={generateKey} className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl flex justify-center gap-2"><FaKey /> Создать</button>
                <button onClick={() => setNewKeyModal(false)} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl">Закрыть</button>
              </motion.div>
            </motion.div>
          )}

          {/* Сброс HWID */}
          {hwidModal.open && hwidModal.uid !== null && (
            <motion.div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="bg-black/90 p-8 rounded-3xl w-96 flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-center">Сбросить HWID?</h2>
                <button onClick={() => hwidModal.uid !== null && resetHWID(hwidModal.uid)} className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl">Сбросить</button>
                <button onClick={() => setHwidModal({ open: false, uid: null })} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl">Закрыть</button>
              </motion.div>
            </motion.div>
          )}

          {/* Блокировка / Разблокировка */}
          {blockModal.open && blockModal.uid !== null && (
            <motion.div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="bg-black/90 p-8 rounded-3xl w-96 flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-center">{blockModal.blocked ? "Разблокировать" : "Заблокировать"} пользователя?</h2>
                <button onClick={() => blockModal.uid !== null && toggleBlockUser(blockModal.uid, blockModal.blocked)} className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl">
                  {blockModal.blocked ? "Разблокировать" : "Заблокировать"}
                </button>
                <button onClick={() => setBlockModal({ open: false, uid: null, blocked: false })} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl">Закрыть</button>
              </motion.div>
            </motion.div>
          )}

          {/* Выдача подписки */}
          {subscriptionModal.open && subscriptionModal.uid !== null && (
            <motion.div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="bg-black/90 p-8 rounded-3xl w-96 flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-center">Выдать подписку</h2>
                <button onClick={() => subscriptionModal.uid !== null && grantSubscription(subscriptionModal.uid, "VIP")} className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl">Выдать VIP</button>
                <button onClick={() => subscriptionModal.uid !== null && grantSubscription(subscriptionModal.uid, "Pro")} className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-xl">Выдать Pro</button>
                <button onClick={() => setSubscriptionModal({ open: false, uid: null })} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl">Закрыть</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ----------------------- Пуш уведомления ----------------------- */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
          {notifications.slice(0, 5).map((note, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg">{note}</motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
