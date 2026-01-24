"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaKey, FaCog, FaBell, FaSyncAlt, FaUser, FaUserShield } from "react-icons/fa";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [uid, setUID] = useState<number | null>(null);
  const [hwid, setHWID] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);
  const [keyModalOpen, setKeyModalOpen] = useState(false);
  const [enteredKey, setEnteredKey] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");
      setUser(user);

      // ----------------------- UID & HWID -----------------------
      const { data: uidData } = await supabase
        .from("uids")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (!uidData) {
        // Создаем уникальный UID и HWID
        const newUID = Math.floor(Math.random() * 10 + 10);
        const newHWID = window.navigator.userAgent.replace(/\D+/g, "") + Math.floor(Math.random() * 1);
        await supabase.from("uids").insert([{ user_id: user.id, uid: newUID, hwid: newHWID }]);
        setUID(newUID);
        setHWID(newHWID);
      } else {
        setUID(uidData.uid);
        setHWID(uidData.hwid);
      }

      // ----------------------- История покупок -----------------------
      const { data: purchaseData } = await supabase
        .from("purchases")
        .select("*")
        .eq("user_id", user.id)
        .order("purchased_at", { ascending: false });
      setPurchases(purchaseData || []);

      // ----------------------- Подписка -----------------------
      const { data: subData } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .single();
      setSubscription(subData || null);
    };

    fetchUserData();
  }, [router]);

  const progressPercentage = subscription ? subscription.progress : 0;

  // ----------------------- Функции -----------------------
  const resetHWID = () => {
    alert("HWID можно сбросить только через админку!");
  };

  const activateKey = async () => {
    if (!enteredKey) return alert("Введите ключ!");
    const { data: keyData, error } = await supabase
      .from("license_keys")
      .select("*")
      .eq("key", enteredKey)
      .eq("used", false)
      .single();

    if (!keyData || error) return alert("Неверный или использованный ключ!");
    await supabase.from("license_keys").update({
      used: true,
      user_id: user.id,
      uid: uid
    }).eq("key", enteredKey);

    setNotifications(prev => [`Ключ активирован: ${enteredKey}`, ...prev]);
    setKeyModalOpen(false);
    setEnteredKey("");
  };

  const openAdmin = () => {
    if (user?.email === "pukolka46@gmail.com") router.push("/admin");
    else alert("Доступ запрещен!");
  };

  // ----------------------- UI -----------------------
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B0F1C] via-[#1B1F2D] to-[#2C2F42] text-white px-6 pt-24">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 flex items-center gap-2">
          <FaUser /> Личный кабинет
        </h1>
        <p className="text-white/70 mb-6">Привет, {user?.email}</p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/10 p-6 rounded-3xl flex flex-col gap-2">
            <h3 className="text-2xl font-bold">UID</h3>
            <p>{uid}</p>
          </div>
          <div className="bg-white/10 p-6 rounded-3xl flex flex-col gap-2">
            <h3 className="text-2xl font-bold">HWID</h3>
            <p className="text-red-500 font-bold">{hwid}</p>
          </div>
          <div className="bg-white/10 p-6 rounded-3xl col-span-full">
            <h3 className="text-2xl font-bold mb-2">Подписка</h3>
            {subscription ? (
              <div className="bg-white/20 rounded-xl h-6 w-full relative overflow-hidden">
                <motion.div
                  className="bg-green-500 h-6 rounded-xl"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            ) : (
              <p className="text-red-500 font-bold">Нет подписки</p>
            )}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">История покупок</h3>
          {purchases.length === 0 ? <p className="text-white/70">Пока нет покупок.</p> : (
            <div className="space-y-3">
              {purchases.map((p) => (
                <div key={p.id} className="p-4 bg-white/10 rounded-xl flex justify-between">
                  <span>{p.product} — {p.tariff}</span>
                  <span>{p.price}</span>
                  <span className="text-white/50 text-sm">{new Date(p.purchased_at).toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <button
            onClick={() => setKeyModalOpen(true)}
            className="flex items-center gap-2 p-4 bg-blue-600 hover:bg-blue-700 rounded-xl transition font-semibold"
          >
            <FaKey /> Активация
          </button>
          <button
            onClick={() => alert("Настройки откроются позже")}
            className="flex items-center gap-2 p-4 bg-purple-600 hover:bg-purple-700 rounded-xl transition font-semibold"
          >
            <FaCog /> Настройки
          </button>
          <button
            onClick={() => alert("Уведомления")}
            className="flex items-center gap-2 p-4 bg-green-600 hover:bg-green-700 rounded-xl transition font-semibold"
          >
            <FaBell /> Уведомления
          </button>
          {user?.email === "pukolka46@gmail.com" && (
            <button
              onClick={openAdmin}
              className="flex items-center gap-2 p-4 bg-yellow-500 hover:bg-yellow-600 rounded-xl transition font-semibold"
            >
              <FaUserShield /> Admin Panel
            </button>
          )}
        </div>

        {/* Модалка активации ключа */}
        <AnimatePresence>
          {keyModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className="bg-black/90 p-8 rounded-3xl w-96 flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-center mb-2">Введите ключ</h2>
                <input
                  type="text"
                  placeholder="ADVANCE-1234-5678-LOW"
                  value={enteredKey}
                  onChange={(e) => setEnteredKey(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-white/10 w-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-4">
                  <button
                    onClick={activateKey}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
                  >
                    Активировать
                  </button>
                  <button
                    onClick={() => setKeyModalOpen(false)}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold"
                  >
                    Закрыть
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Пуш уведомления */}
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
