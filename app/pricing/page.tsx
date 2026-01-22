"use client";

import { motion } from "framer-motion";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PricingCard from "@/components/PricingCard";

export default function PricingPage() {
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
            Pricing
          </motion.h1>

          <div className="flex flex-wrap gap-14 justify-center">
            <PricingCard
              title="30 days"
              price="300Рублей"
              image="/pricing.jpg"
            />

            <PricingCard
              title="Forever"
              price="600рублей"
              image="/pricing.jpg"
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
