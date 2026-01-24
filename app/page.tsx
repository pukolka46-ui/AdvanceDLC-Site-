"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

// ==================== PARTICLE ====================
const Particle = ({ size, x, y, opacity, color }: { size: number; x: number; y: number; opacity?: number; color?: string }) => (
  <motion.div
    className="absolute rounded-full"
    style={{ width: size, height: size, top: y, left: x, backgroundColor: color ?? "rgba(200,150,255,0.3)" }}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, opacity ?? 0.4, 0], y: y + 100 }}
    transition={{ repeat: Infinity, duration: 5 + Math.random() * 5, ease: "linear" }}
  />
);

// ==================== STAR ====================
interface StarProps { size: number; left: number; duration: number }
const Star = ({ size, left, duration }: StarProps) => (
  <motion.div
    className="absolute bg-white rounded-full"
    style={{ width: size, height: size, top: -10, left }}
    animate={{ y: window.innerHeight + 20, opacity: [0, 0.8, 0] }}
    transition={{ duration, repeat: Infinity, ease: "linear" }}
  />
);

export default function HomePage() {
  const router = useRouter();
  const [activeUpdate, setActiveUpdate] = useState<string | null>(null);
  const [mouseParticles, setMouseParticles] = useState<{ x: number; y: number; id: number }[]>([]);
  const [time, setTime] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const screenshots = [
    { src: "/Screen1.jpg", alt: "Screen 1" },
    { src: "/Screen2.jpg", alt: "Screen 2" },
    { src: "/Screen3.png", alt: "Screen 3" },
  ];

  const updates = {
    "AdvanceDLC": ["Новый приватный модуль","Исправлены баги","Улучшена совместимость","Оптимизация скорости","Новые функции"],
    "Visuals": ["Обновлены визуальные эффекты","Новые шрифты и темы","Оптимизация GPU","Улучшена совместимость","Новые анимации"],
    "Loader": ["Ускорена загрузка","Проверка целостности","Стабильная работа","Оптимизация памяти","Повышена надёжность"]
  };

  // ================= CURSOR PARTICLES =================
  useEffect(() => {
    let id = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setMouseParticles(prev => [...prev, { x: e.clientX, y: e.clientY, id: id++ }].slice(-20));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ================= BACKGROUND ANIMATION =================
  useEffect(() => {
    const interval = setInterval(() => setTime(t => t + 0.005), 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className="relative overflow-hidden min-h-screen text-white"
      style={{
        background: `radial-gradient(circle at ${50 + Math.sin(time)*30}% ${50 + Math.cos(time)*30}%, #1b003f, #3e0b6e, #20002c)`,
        transition: "background 0.1s linear"
      }}
    >
      {/* ================= COSMIC PARTICLES ================= */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Particle key={i} size={1 + Math.random() * 4} x={Math.random() * window.innerWidth} y={Math.random() * window.innerHeight} opacity={0.1 + Math.random() * 0.4} color={`rgba(${150 + Math.random()*100}, ${50 + Math.random()*50}, ${200 + Math.random()*55}, ${0.2 + Math.random()*0.3})`} />
      ))}

      {/* ================= FALLING STARS ================= */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Star key={i} size={2 + Math.random()*3} left={Math.random() * window.innerWidth} duration={2 + Math.random()*4} />
      ))}

      {/* ================= CURSOR PARTICLES ================= */}
      {mouseParticles.map((p) => (
        <Particle key={p.id} size={3 + Math.random() * 4} x={p.x} y={p.y} opacity={0.5} color="rgba(255,255,255,0.7)" />
      ))}

      {/* ================= HERO ================= */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.h1 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-7xl font-extrabold mb-6">
          AdvanceDLC
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.2 }} className="text-white/70 text-xl mb-10 max-w-2xl">
          Приватные решения для продвинутых пользователей. Быстро, безопасно, надёжно.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/pricing")}
          className="relative px-10 py-4 font-bold rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-purple-400 text-black"
        >
          <span className="absolute inset-0 animate-pulse blur-sm bg-gradient-to-r from-purple-600 via-pink-500 to-purple-400 rounded-2xl" />
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
          <div className="grid md:grid-cols-2 gap-10 mt-10">
            <div className="bg-white/10 p-6 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">Плюсы</h3>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>Приватные сборки</li>
                <li>Поддержка обновлений</li>
                <li>Минимальный риск детекта</li>
                <li>Простая установка и управление</li>
              </ul>
            </div>
            <div className="bg-white/10 p-6 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">Минусы</h3>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>Только для продвинутых пользователей</li>
                <li>Цена выше базовых решений</li>
                <li>Ограниченный доступ</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= SCREENSHOTS LIGHTBOX ================= */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-10 text-center">Скриншоты клиента</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {screenshots.map((s, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.05 }} className="overflow-hidden rounded-3xl shadow-lg cursor-pointer" onClick={() => setLightbox(s.src)}>
              <Image src={s.src} alt={s.alt} width={400} height={250} className="object-cover rounded-3xl" />
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}>
            <Image src={lightbox} alt="Screenshot" width={800} height={500} className="object-contain" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= UPDATE ================= */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-10 text-center">Update</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {Object.keys(updates).map((title) => (
            <motion.div
              key={title}
              whileHover={{ scale: 1.03 }}
              onClick={() => setActiveUpdate(title)}
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
