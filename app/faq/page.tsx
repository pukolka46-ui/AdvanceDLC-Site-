"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQCard from "@/components/FAQCard";

export default function FAQPage() {
  return (
    <>
      <Header />

      <main className="relative min-h-screen bg-black text-white overflow-hidden">
        <div className="absolute inset-0 -z-20 opacity-40">
          <Image
            src="/fluid1.png"
            alt="Фоновая фигура"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute inset-0 -z-30 opacity-30">
          <Image
            src="/fluid2.png"
            alt="Дополнительная фоновая фигура"
            fill
            className="object-cover"
          />
        </div>

        <section className="relative z-10 pt-40 pb-32 flex flex-col items-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl font-extrabold mb-16 text-center"
          >
            FAQ
          </motion.h1>

          <FAQCard
            question="Как запустить клиент?"
            answer="Для начала, вы должны купить клиент по тарифу который вам нравится больше всего,как вы купили заходите в личный кабинет,там жмите скачать лаунчер,в лаунчере вы должны войти в аккаунт и там запустить. !!СОВЕТУЮ СТАВИТЬ МИНИМУМ 4 ГБ ПАМЯТИ!!"
          />

          <FAQCard
            question="Как загрузить конфиг в клиент?"
            answer="Наш клиент имеет функцию под названием .cfg dir, если вы её пропишите у вас откроется папка с конфигами куда вы можете закинуть свои конфиги,приятной игры."
          />

          <FAQCard
            question="Насколько безопасен наш чит? И как часты обновления?"
            answer="Мы не можем точно сказать насколько часты обновоение,но мы гарантируем минимум 4 обновление в месяц,может быть и чаще. Наш чит старается получить актуальные обходы под  популярные сервера,безопасность будет зависить от нас и от вас,как вы играете с читом."
          />

          <FAQCard
            question="Как связаться с технической поддержкой?"
            answer="На данный момент поддержка находится в разработке.Она откроется когда будет ВОЗМОЖНЫЙ релиз или же бета. "
          />

          <FAQCard
            question="Советы и рекомендации"
            answer="Наш чит подходит для популярных серверов,не для хвх,советуем играть вам на популярных серверах ибо на хвх будет отдельный клиент(или же нет) Чтоб следить за новостями вы можете подписаться на наш канал,скоро мы добавим их"
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
