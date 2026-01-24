"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ParticleProps {
  size: number;
  x: number;
  y: number;
  delay: number;
}

// Частица
const Particle = ({ size, x, y, delay }: ParticleProps) => (
  <motion.div
    className="absolute bg-white/20 rounded-full"
    style={{ width: size, height: size, top: y, left: x }}
    initial={{ opacity: 0, y }}
    animate={{ opacity: [0, 0.5, 0], y: y + 100 }}
    transition={{ repeat: Infinity, duration: 5 + delay, ease: "linear" }}
  />
);

type UpdateKeys = "AdvanceDLC" | "Visuals" | "Loader";

export default function HomePage() {
  const router = useRouter();
  const [activeUpdate, setActiveUpdate] = useState<UpdateKeys | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Получаем размер окна **только на клиенте**
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  const screenshots = ["/Screen1.jpg", "/Screen2.jpg", "/Screen3.png"];

  const updates: Record<UpdateKeys, string[]> = {
    AdvanceDLC: [
      "Добавлен новый приватный модуль",
      "Исправлены баги при загрузке",
      "Улучшена совместимость с последними версиями",
    ],
    Visuals: [
      "Обновлены визуальные эффекты",
      "Добавлены новые шрифты и темы",
      "Оптимизация GPU-рендеринга",
    ],
    Loader: [
      "Ускорена загрузка файлов",
      "Добавлена проверка целостности",
      "Стабильная работа на Windows и Mac",
    ],
  };

  const paymentMethods = [
    { name: "СБП", img: "/sbp.png" },
    { name: "Банковская карта", img: "/card.png" },
    { name: "USDT", img: "/usdt.png" },
  ];

  const handlePayment = (method: string) => alert(`Оплата через ${method} — заглушка`);

  return (
    <main className="relative overflow-hidden min-h-screen text-white" style={{ background: "linear-gradient(135deg, #1a0a2a, #4b1d67)" }}>
      
      {/* ================= PARTICLES ================= */}
      {windowSize.width > 0 &&
        Array.from({ length: 50 }).map((_, i) => (
          <Particle
            key={i}
            size={2 + Math.random() * 4}
            x={Math.random() * windowSize.width}
            y={Math.random() * windowSize.height}
            delay={Math.random() * 3}
          />
        ))}

      {/* ================= HERO ================= */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-7xl font-extrabold mb-6">
          AdvanceDLC
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="text-white/70 text-xl mb-10 max-w-2xl">
          Приватные решения для продвинутых пользователей. Быстро, безопасно, надёжно.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/pricing")}
          className="relative px-10 py-4 font-bold rounded-2xl overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-black"
        >
          <span className="absolute inset-0 animate-pulse blur-sm bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 rounded-2xl" />
          <span className="relative z-10">Выбрать тариф</span>
        </motion.button>
      </section>

      {/* ================= ADVANCEDLC INFO ================= */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-5xl font-extrabold mb-10 text-center">Что такое AdvanceDLC?</h2>
          <p className="text-white/70 text-lg mb-6 text-center max-w-3xl mx-auto">
            AdvanceDLC — это приватное решение для пользователей, которые ценят безопасность и скорость. Вы получаете эксклюзивные сборки, регулярные обновления и минимальный риск детекта.
          </p>
        </motion.div>
      </section>

      {/* ================= SCREENSHOTS ================= */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-10 text-center">Скриншоты клиента</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {screenshots.map((s, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.05 }} className="overflow-hidden rounded-3xl shadow-lg">
              <Image src={s} alt={`Screen ${idx+1}`} width={400} height={250} className="object-cover rounded-3xl" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= UPDATE ================= */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-10 text-center">Update</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {Object.keys(updates).map((title) => (
            <motion.div
              key={title}
              whileHover={{ scale: 1.03 }}
              onClick={() => setActiveUpdate(title as UpdateKeys)}
              className="bg-white/10 rounded-3xl p-6 text-center shadow-lg cursor-pointer"
            >
              <h3 className="text-2xl font-bold mb-4">{title}</h3>
              <p className="text-white/70">Последние обновления и улучшения функционала {title}.</p>
            </motion.div>
          ))}
        </div>

        {/* ================= RATING ================= */}
        <div className="mt-10 text-center">
          <h3 className="text-3xl font-bold mb-4">Оценка клиентов</h3>
          <div className="flex justify-center items-center gap-2 text-yellow-400 text-2xl">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <p className="text-white/70 mt-2 text-lg">5/5 звезд</p>
        </div>
      </section>

      {/* ================= UPDATE MODAL ================= */}
      <AnimatePresence>
        {activeUpdate && (
          <motion.div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-black/90 rounded-3xl p-10 w-96 max-h-[80vh] overflow-y-auto flex flex-col gap-4">
              <h2 className="text-3xl font-bold mb-4 text-center">{activeUpdate} — Полный апдейт</h2>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                {updates[activeUpdate].map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <button onClick={() => setActiveUpdate(null)} className="mt-6 px-4 py-2 rounded-xl text-black font-semibold bg-white hover:bg-gray-300 transition">
                Закрыть
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
