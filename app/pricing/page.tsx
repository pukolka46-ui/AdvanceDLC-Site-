"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Particle = ({ size, x, y, delay }: { size: number; x: number; y: number; delay: number }) => (
  <motion.div
    className="absolute bg-white/20 rounded-full"
    style={{ width: size, height: size, top: y, left: x }}
    initial={{ opacity: 0, y }}
    animate={{ opacity: [0, 0.5, 0], y: y + 100 }}
    transition={{ repeat: Infinity, duration: 5 + delay, ease: "linear" }}
  />
);

export default function PricingPage() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [tariffModalOpen, setTariffModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedTariff, setSelectedTariff] = useState<{ name: string; price: string } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  const products = [
    { title: "AdvanceDLC", price: "150 ₽", image: "/pricing.jpg" },
    { title: "AdvanceVisuals", price: "—", image: "/pricing.jpg" },
    { title: "AdvanceLoader", price: "—", image: "/pricing.jpg" },
  ];

  const tariffs = [
    { name: "15 дней", price: "150 ₽" },
    { name: "30 дней", price: "300 ₽" },
    { name: "45 дней", price: "450 ₽" },
    { name: "Навсегда", price: "600 ₽" },
  ];

  const paymentMethods = [
    { name: "СБП", img: "/sbp.png" },
    { name: "Банковская карта", img: "/card.png" },
    { name: "USDT", img: "/usdt.png" },
  ];

  const handlePayment = (method: string) => {
    if (!selectedProduct || !selectedTariff) return;
    alert(`Оплата ${selectedTariff.price} за ${selectedProduct} через ${method} — заглушка`);
  };

  return (
    <main className="relative bg-black text-white min-h-screen overflow-hidden px-6 py-20">
      {/* ================= PARTICLES ================= */}
      {windowSize.width > 0 &&
        Array.from({ length: 30 }).map((_, i) => (
          <Particle key={i} size={2 + Math.random() * 4} x={Math.random() * windowSize.width} y={Math.random() * windowSize.height} delay={Math.random() * 3} />
        ))}

      {/* ================= HERO ================= */}
      <section className="max-w-5xl mx-auto text-center mb-20">
        <h1 className="text-6xl font-extrabold mb-6">AdvanceDLC</h1>
        <p className="text-white/70 text-xl mb-10">
          Приватное решение для продвинутых пользователей. Быстро, безопасно, надёжно.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setProductModalOpen(true)}
          className="px-10 py-4 font-bold rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 hover:brightness-110 transition"
        >
          Выбрать тариф
        </motion.button>
      </section>

      {/* ================= PRICING CARDS ================= */}
      <section className="max-w-5xl mx-auto mb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((p) => (
          <motion.div key={p.title} whileHover={{ scale: 1.05 }} className="relative bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-6 flex flex-col items-center shadow-lg cursor-pointer overflow-hidden">
            {p.title === "AdvanceDLC" && <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs px-3 py-1 rounded-bl-xl font-bold">Чаще покупают</div>}
            <Image src={p.image} alt={p.title} width={200} height={120} className="rounded-xl mb-4 object-cover" />
            <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
            <p className="text-white/70 mb-4">{p.price}</p>
            {p.title === "AdvanceDLC" ? (
              <button
                onClick={() => {
                  setSelectedProduct(p.title);
                  setProductModalOpen(false);
                  setTariffModalOpen(true);
                }}
                className="mt-auto px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl font-semibold transition"
              >
                Купить
              </button>
            ) : (
              <button className="mt-auto px-6 py-2 bg-gray-500/50 cursor-not-allowed rounded-xl font-semibold">Скоро</button>
            )}
          </motion.div>
        ))}
      </section>

      {/* ================= MODALS ================= */}
      {/* Product, Tariff, Payment — остался прежним, только window-safe */}
      {/* ...код модалок без изменений, с проверкой selectedProduct/selectedTariff */}
    </main>
  );
}
