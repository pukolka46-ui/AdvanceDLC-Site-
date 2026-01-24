"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

// ==================== PARTICLES ====================
interface ParticleProps {
  size: number;
  x: number;
  y: number;
  delay: number;
}
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
  const [windowSize, setWindowSize] = useState<{ width: number; height: number } | null>(null);

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

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <main className="relative overflow-hidden min-h-screen text-white" style={{ background: "linear-gradient(135deg, #0d031b, #2c0d4c)" }}>
      
      {/* ================= PARTICLES ================= */}
      {windowSize &&
        Array.from({ length: 50 }).map((_, i) => (
          <Particle
            key={i}
            size={2 + Math.random() * 4}
            x={Math.random() * windowSize.width}
            y={Math.random() * windowSize.height}
            delay={Math.random() * 3}
          />
        ))}

      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-6 bg-black/50 z-50 backdrop-blur-md">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>
          AdvanceDLC
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/register")}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl font-semibold transition"
          >
            Регистрация
          </button>
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Войти
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-xl font-semibold transition"
          >
            Личный кабинет
          </button>
        </div>
      </header>

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
