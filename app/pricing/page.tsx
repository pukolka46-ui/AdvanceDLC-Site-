"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { supabase } from "../../lib/supabaseClient";
import { toggleTheme, loadTheme } from "../../lib/theme";

interface Product {
  title: string;
  price: string;
  image: string;
}

interface Tariff {
  name: string;
  price: string;
}

interface PaymentMethod {
  name: string;
  img: string;
}

const products: Product[] = [
  { title: "AdvanceDLC", price: "150 ₽", image: "/pricing.jpg" },
  { title: "AdvanceVisuals", price: "—", image: "/pricing.jpg" },
  { title: "AdvanceLoader", price: "—", image: "/pricing.jpg" },
];

const tariffs: Tariff[] = [
  { name: "15 дней", price: "150 ₽" },
  { name: "30 дней", price: "300 ₽" },
  { name: "45 дней", price: "450 ₽" },
  { name: "Навсегда", price: "600 ₽" },
];

const paymentMethods: PaymentMethod[] = [
  { name: "СБП", img: "/sbp.png" },
  { name: "Банковская карта", img: "/card.png" },
  { name: "USDT", img: "/usdt.png" },
];

export default function PricingPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [tariffModalOpen, setTariffModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedTariff, setSelectedTariff] = useState<Tariff | null>(null);

  // Получаем пользователя
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
    loadTheme();
  }, []);

  const handlePayment = (method: string) => {
    if (!selectedProduct || !selectedTariff) return;
    alert(`Оплата ${selectedTariff.price} за ${selectedProduct.title} через ${method} — заглушка`);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#001a2e] via-[#00264d] to-[#003366] text-white px-6 pt-24">
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-6 bg-black/40 backdrop-blur-md z-50">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>
          AdvanceDLC
        </h1>

        <div className="flex gap-4">
          {!user ? (
            <>
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition"
                onClick={() => router.push("/login")}
              >
                Войти
              </button>
              <button
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl font-semibold transition"
                onClick={() => router.push("/register")}
              >
                Регистрация
              </button>
            </>
          ) : (
            <>
              <button
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl font-semibold transition"
                onClick={() => router.push("/pricing")}
              >
                Тарифы
              </button>
              <button
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-xl font-semibold transition"
                onClick={() => router.push("/dashboard")}
              >
                Личный кабинет
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition"
                onClick={handleLogout}
              >
                Выйти
              </button>
            </>
          )}
          <button
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-xl font-semibold transition"
            onClick={toggleTheme}
          >
            Тема
          </button>
        </div>
      </header>

      {/* ================= PRODUCTS ================= */}
      <section className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  setSelectedProduct(p);
                  setTariffModalOpen(true);
                }}
                className="mt-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition"
              >
                Купить
              </button>
            ) : (
              <button className="mt-auto px-6 py-2 bg-gray-500/50 cursor-not-allowed rounded-xl font-semibold">
                Скоро
              </button>
            )}
          </motion.div>
        ))}
      </section>

      {/* ================= MODALS ================= */}
      {/* ...оставляем тариф и платежные модальные окна как раньше... */}
    </main>
  );
}
