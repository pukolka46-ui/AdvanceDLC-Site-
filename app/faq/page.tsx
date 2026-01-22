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
            alt="Background Shape"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute inset-0 -z-30 opacity-30">
          <Image
            src="/fluid2.png"
            alt="Background Shape 2"
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
            question="How do I launch the client?"
            answer="First, download the launcher and open it. In the window that appears, you will see a field where you can set RAM allocation. We recommend assigning no more than 8 GB. After that, press the Start button and wait for the client to load."
          />

          <FAQCard
            question="How do I load a config into the client?"
            answer="To load a config, first launch the client at least once. Then go to this directory: C:\\Async\\beta\\client\\configs and place your .async config file into that folder."
          />

          <FAQCard
            question="How can I create my own script for the client?"
            answer="To create a custom script, you need to read the documentation first. It contains usage examples, event hooks, and API references. Make sure to follow the development guidelines to ensure compatibility."
          />

          <FAQCard
            question="How can I contact tech support?"
            answer="There are two ways to reach support. First - open a ticket on our Discord server in the Support channel. Second - send a message to our VK group. Support typically responds within 24 hours."
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
