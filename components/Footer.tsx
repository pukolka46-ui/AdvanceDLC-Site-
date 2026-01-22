"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="
        w-full
        relative
        bg-black
        overflow-hidden
      "
    >
      <div className="absolute left-0 top-0 h-full opacity-30 pointer-events-none">
        <Image
          src="/fluid3.png"
          alt="Fluid"
          width={400}
          height={800}
          className="h-full w-auto object-cover"
        />
      </div>

      <div
        className="
          relative
          z-10
          px-48
          py-20
          flex
          justify-between
          items-start
          text-white/70
        "
      >
        <div className="flex flex-col gap-3 max-w-xs">
          <h3 className="text-xl font-semibold text-white">Async</h3>
          <p className="text-sm text-white/50 leading-relaxed">
            © {new Date().getFullYear()} Async Client.
            <br />
            All rights reserved.
          </p>
          <p className="text-white/50 text-sm">
            Made by{" "}
            <a
              href="https://finikov.one"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-200 to-blue-400 text-transparent bg-clip-text transition"
            >
              finikov
            </a>
          </p>
        </div>

        <div className="flex gap-20">
          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold text-white">Platform</h4>
            <a className="hover:text-white transition" href="#">
              Home
            </a>
            <a className="hover:text-white transition" href="#">
              Purchase
            </a>
            <a className="hover:text-white transition" href="#">
              FAQ
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold text-white">Account</h4>
            <a className="hover:text-white transition" href="#">
              Login
            </a>
            <a className="hover:text-white transition" href="#">
              Register
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold text-white">Contacts</h4>
            <a className="hover:text-white transition" href="#">
              Telegram
            </a>
            <a className="hover:text-white transition" href="#">
              Discord
            </a>
            <a className="hover:text-white transition" href="#">
              VK
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            <a className="hover:text-white transition" href="#">
              License Agreement
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
