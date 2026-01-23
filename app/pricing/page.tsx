"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PricingPage() {
  const [tariffModalOpen, setTariffModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);

  const products = [
    { title: "AdvanceDLC", price: "", image: "/pricing.jpg", hasOptions: true },
    { title: "AdvanceVisuals", price: "250 руб.", image: "/pricing.jpg" },
    { title: "AdvanceLoader", price: "Цены пока нет", image: "/pricing.jpg" },
  ];

  const tariffs = [
    { name: "15 дней", price: "150 руб." },
    { name: "30 дней", price: "300 руб." },
    { name: "45 дней", price: "450 руб." },
    { name: "Навсегда", price: "600 руб." },
  ];

  const paymentMethods = ["СБП", "Банковская карта", "USDT"];

  return (
    <>
      <Header />

      <main className="text-white bg-black min-h-screen relative overflow-hidden">
        <section className="relative z-10 pt-48 pb-40 flex flex-col items-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-extrabold mb-20 text-center"
          >
            Цены
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-center">
            {products.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="relative bg-white/10 rounded-3xl overflow-hidden border border-white/10 w-64 text-center mx-auto flex flex-col"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={256}
                  height={160}
                  className="object-cover"
                />

                <div className="p-6 flex flex-col gap-4">
                  <h3 className="text-2xl font-bold">{product.title}</h3>
                  {product.price && <p className="text-white/70 text-lg">{product.price}</p>}

                  {product.hasOptions && (
                    <button
                      onClick={() => setTariffModalOpen(true)}
                      className="mt-6 relative px-4 py-2 rounded-xl text-white font-semibold overflow-hidden"
                    >
                      {/* Мигающая градиентная подсветка */}
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 animate-pulse rounded-xl blur-sm"></span>
                      <span className="relative z-10">Выбрать тариф</span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Модальное окно тарифов AdvanceDLC */}
        <AnimatePresence>
          {tariffModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-black/90 rounded-3xl p-10 w-96 flex flex-col gap-6 relative"
                initial={{ y: -50, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -50, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-center mb-4">Выберите тариф</h2>

                {tariffs.map((t, i) => {
                  const isPopular = t.name === "30 дней";
                  return (
                    <div key={i} className="relative w-full flex flex-col items-center">
                      {isPopular && (
                        <span className="absolute -top-6 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                          Чаще покупают
                        </span>
                      )}

                      <button
                        onClick={() => {
                          setSelectedTariff(`${t.name} — ${t.price}`);
                          setPaymentModalOpen(true);
                          setTariffModalOpen(false);
                        }}
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden ${
                          isPopular
                            ? "bg-purple-600 text-white shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-400 before:via-pink-500 before:to-yellow-400 before:animate-pulse before:rounded-xl"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`}
                      >
                        <span className="relative z-10">
                          {t.name} — {t.price}
                        </span>
                      </button>
                    </div>
                  );
                })}

                <button
                  onClick={() => setTariffModalOpen(false)}
                  className="absolute top-4 right-4 text-white/50 hover:text-white text-xl font-bold transition"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Модальное окно оплаты */}
        <AnimatePresence>
          {paymentModalOpen && selectedTariff && (
            <motion.div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-black/90 rounded-3xl p-10 w-96 flex flex-col gap-4 relative"
                initial={{ y: -50, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -50, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-center mb-4">
                  Оплата за {selectedTariff}
                </h2>
                {paymentMethods.map((method, idx) => (
                  <button
                    key={idx}
                    className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all duration-300"
                  >
                    {method}
                  </button>
                ))}

                <button
                  onClick={() => setPaymentModalOpen(false)}
                  className="absolute top-4 right-4 text-white/50 hover:text-white text-xl font-bold transition"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}
