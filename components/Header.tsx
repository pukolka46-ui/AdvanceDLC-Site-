"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { House, ShoppingCartSimple, Question } from "@phosphor-icons/react";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        fixed top-0 left-0 z-[25]
        h-20
        w-full
        px-10
        backdrop-blur-xl
        bg-black/60
        border-b border-white/10
      "
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-24 py-4">
        <div className="flex items-center gap-16">
          <Link
            href="/"
            className="flex items-center gap-3 group transition hover:opacity-100"
          >
            <Image
              src="/advance-dlc-icon.png" // новый логотип
              alt="AdvanceDLC"
              width={45}
              height={45}
              priority
            />
            <span className="text-white font-bold text-xl">AdvanceDLC</span>
          </Link>

          <div className="flex items-center gap-12 text-white/85">
            <Link
              href="/"
              className="flex items-center gap-2 cursor-pointer group"
            >
              <House
                size={24}
                weight="fill"
                className="group-hover:text-white transition"
              />
              <span className="text-sm group-hover:text-white transition">
                Главная
              </span>
            </Link>

            <Link
              href="/pricing"
              className="flex items-center gap-2 cursor-pointer group"
            >
              <ShoppingCartSimple
                size={24}
                weight="fill"
                className="group-hover:text-white transition"
              />
              <span className="text-sm group-hover:text-white transition">
                Цены
              </span>
            </Link>

            <Link
              href="/faq"
              className="flex items-center gap-2 cursor-pointer group"
            >
              <Question
                size={24}
                weight="fill"
                className="group-hover:text-white transition"
              />
              <span className="text-sm group-hover:text-white transition">
                FAQ
              </span>
            </Link>
          </div>
        </div>

        <Link className="flex items-center" href={"/login"}>
          <p
            className="
              text-white text-sm font-medium
              px-5 py-2
              rounded-xl
              bg-white/10
              hover:bg-white/20
              transition-colors
              backdrop-blur-xl
            "
          >
            Войти
          </p>
        </Link>
      </div>
    </motion.header>
  );
}
