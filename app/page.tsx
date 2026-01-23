"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main className="relative bg-black text-white overflow-hidden">

        {/* Hero-блок */}
        <section className="flex min-h-screen items-center px-48 gap-20">
          <div className="w-1/2 flex flex-col justify-center">
            <h1 className="text-7xl font-extrabold mb-6">Привет</h1>
            <p className="text-xl text-white/60 mb-6">
              Добро пожаловать на сайт AdvanceDLC-современный проект который имеет в себе 3 проекта и каждый из них уникален по особому,дальше-больше,следите за нами!
            </p>
          </div>
          <div className="w-1/2 flex justify-end">
            <Image
              src="/chat.jpg"
              alt="Hero"
              width={650}
              height={650}
              className="drop-shadow-[0_0_70px_rgba(150,80,255,0.45)] select-none"
            />
          </div>
        </section>

        {/* 4️⃣ Скриншоты / Галерея */}
        <section className="px-48 py-20">
          <h2 className="text-5xl font-bold mb-10 text-center">Скриншоты клиента</h2>
          <div className="grid grid-cols-3 gap-8">
            <Image src="/Screen1.png" width={400} height={300} alt="Chat"/>
            <Image src="/Screen2.png" width={400} height={300} alt="Pricing"/>
            <Image src="/Screen3.png" width={400} height={300} alt="Background"/>
          </div>
        </section>

        {/* 7️⃣ Новости / Updates */}
        <section className="px-48 py-20 bg-white/5 rounded-2xl my-10">
          <h2 className="text-5xl font-bold mb-10 text-center">Новости и обновления</h2>
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white/10 rounded-xl">
              <h3 className="text-2xl font-bold mb-2">Версия 1.0.2</h3>
              <p className="text-white/70">Хз</p>
            </div>
            <div className="p-6 bg-white/10 rounded-xl">
              <h3 className="text-2xl font-bold mb-2">Версия 1.0.1</h3>
              <p className="text-white/70">+Оптимизация,+Выход на новуюверсию.</p>
            </div>
          </div>
        </section>

        {/* 6️⃣ Отзывы пользователей */}
        <section className="px-48 py-20">
          <h2 className="text-5xl font-bold mb-10 text-center">Отзывы</h2>
          <div className="grid grid-cols-2 gap-10">
            <div className="p-6 bg-white/10 rounded-xl">
              <p className="text-white/80 mb-4">“Впервые вижу проект который разрабатывает сразу несколько проекто,и старается удивитьпользователей,мне все нравится”</p>
              <span className="text-purple-400 font-bold">— SimplyIdk</span>
            </div>
            <div className="p-6 bg-white/10 rounded-xl">
              <p className="text-white/80 mb-4">“Лучшийпроект который я видел,отзывы говорят о себе)) покупайте и станьте крутым.”</p>
              <span className="text-purple-400 font-bold">— Pukolka</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
