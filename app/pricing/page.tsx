"use client";

import { useState } from "react";
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
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [tariffModalOpen, setTariffModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedTariff, setSelectedTariff] = useState<{ name: string; price: string } | null>(null);

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
    { name: "СБП", img: "/icons/sbp.png" },
    { name: "Банковская карта", img: "/icons/card.png" },
    { name: "USDT", img: "/icons/usdt.png" },
  ];

  const handlePayment = (method: string) => {
    if (!selectedTariff || !selectedProduct) return;
    alert(`Оплата ${selectedTariff.price} за ${selectedProduct} через ${method} — заглушка`);
  };

  return (
    <main className="relative bg-black text-white min-h-screen overflow-hidden px-6 py-20">
      {/* ================= PARTICLES ================= */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Particle key={i} size={2 + Math.random() * 4} x={Math.random() * window.innerWidth} y={Math.random() * window.innerHeight} delay={Math.random() * 3} />
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
          <motion.div
            key={p.title}
            whileHover={{ scale: 1.05 }}
            className="relative bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-6 flex flex-col items-center shadow-lg cursor-pointer overflow-hidden"
          >
            {p.title === "AdvanceDLC" && (
              <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs px-3 py-1 rounded-bl-xl font-bold">
                Чаще покупают
              </div>
            )}
            <Image src={p.image} alt={p.title} width={200} height={120} className="rounded-xl mb-4 object-cover" />
            <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
            <p className="text-white/70 mb-4">{p.price}</p>

            {p.title === "AdvanceDLC" ? (
              <button
                onClick={() => {
                  setSelectedProduct(p.title);
                  setProductModalOpen(false);
                  setTariffModalOpen(true); // теперь сразу открывается выбор тарифа
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

      {/* ================= PRODUCT MODAL ================= */}
      <AnimatePresence>
        {productModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="bg-black/90 rounded-3xl p-10 w-96 flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-center mb-4">Выберите продукт</h2>
              {products.map((p) => (
                <motion.div key={p.title} whileHover={{ scale: 1.03 }} className="bg-white/10 rounded-xl p-4 flex flex-col items-center mb-4">
                  <Image src={p.image} alt={p.title} width={120} height={80} className="rounded-xl mb-2" />
                  <h3 className="font-bold mb-1">{p.title}</h3>
                  <p className="text-white/70 mb-2">{p.price}</p>
                  {p.title === "AdvanceDLC" ? (
                    <button
                      onClick={() => {
                        setSelectedProduct(p.title);
                        setProductModalOpen(false);
                        setTariffModalOpen(true);
                      }}
                      className="px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl font-semibold"
                    >
                      Купить
                    </button>
                  ) : (
                    <button className="px-6 py-2 bg-gray-500/50 cursor-not-allowed rounded-xl font-semibold">Скоро</button>
                  )}
                </motion.div>
              ))}
              <button onClick={() => setProductModalOpen(false)} className="mt-4 text-white/50 text-sm">Закрыть</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= TARIFF MODAL ================= */}
      <AnimatePresence>
        {tariffModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="bg-black/90 rounded-3xl p-10 w-96 flex flex-col gap-4">
              <h2 className="text-3xl font-bold text-center mb-4">Выберите тариф для {selectedProduct}</h2>
              {tariffs.map((t) => (
                <button
                  key={t.name}
                  onClick={() => {
                    setSelectedTariff(t);
                    setTariffModalOpen(false);
                    setPaymentModalOpen(true);
                  }}
                  className="w-full py-3 bg-white/10 rounded-xl hover:bg-white/20 transition font-semibold"
                >
                  {t.name} — {t.price}
                </button>
              ))}
              <button onClick={() => setTariffModalOpen(false)} className="mt-4 text-white/50 text-sm">Закрыть</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= PAYMENT MODAL ================= */}
      <AnimatePresence>
        {paymentModalOpen && selectedProduct && selectedTariff && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="bg-black/90 rounded-3xl p-10 w-96 flex flex-col gap-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Оплата {selectedProduct}</h2>
              <p className="text-white/70 mb-6">Тариф: {selectedTariff.name} — {selectedTariff.price}</p>
              <div className="grid grid-cols-3 gap-4">
                {paymentMethods.map((m) => (
                  <button
                    key={m.name}
                    onClick={() => handlePayment(m.name)}
                    className="flex flex-col items-center p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition"
                  >
                    <Image src={m.img} alt={m.name} width={50} height={50} className="mb-2" />
                    <span className="text-white text-sm">{m.name}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setPaymentModalOpen(false)} className="mt-6 px-4 py-2 rounded-xl text-black font-semibold bg-white hover:bg-gray-300 transition">
                Закрыть
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
