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
            answer="Сначала скачайте лаунчер и откройте его. В появившемся окне вы увидите поле для настройки объёма выделенной оперативной памяти. Рекомендуется выделять не более 8 ГБ. После этого нажмите кнопку «Старт» и дождитесь полной загрузки клиента."
          />

          <FAQCard
            question="Как загрузить конфиг в клиент?"
            answer="Чтобы загрузить конфиг, сначала запустите клиент хотя бы один раз. Затем перейдите в папку: C:\\Async\\beta\\client\\configs и поместите туда свой файл с расширением .async. После этого клиент сможет использовать ваш конфиг."
          />

          <FAQCard
            question="Как создать свой скрипт для клиента?"
            answer="Для создания собственного скрипта сначала ознакомьтесь с документацией. В ней есть примеры использования, доступные хуки событий и описание API. Следуйте рекомендациям по разработке, чтобы обеспечить совместимость со всеми версиями клиента."
          />

          <FAQCard
            question="Как связаться с технической поддержкой?"
            answer="Есть два способа связаться с поддержкой. Первый — открыть тикет на нашем Discord-сервере в канале Support. Второй — написать в нашу группу ВКонтакте. Обычно поддержка отвечает в течение 24 часов."
          />

          <FAQCard
            question="Советы и рекомендации"
            answer="Регулярно обновляйте клиент до последней версии, чтобы использовать новые функции и улучшения. Также следите за нашими анонсами и документацией, чтобы быть в курсе последних изменений."
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
