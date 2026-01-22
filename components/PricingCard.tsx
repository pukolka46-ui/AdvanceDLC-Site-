"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type PricingCardProps = {
  title: string;
  price: string;
  image: string;
  onClick?: () => void;
};

export default function PricingCard({
  title,
  price,
  image,
  onClick,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        bg-[#1a1a1a]/60
        backdrop-blur-xl
        rounded-3xl
        p-6
        w-[300px]
        flex flex-col
        shadow-xl shadow-black/40
        border border-white/10
        hover:border-white/20
        transition-all
      "
    >
      <div className="rounded-2xl overflow-hidden mb-5">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="rounded-2xl"
        />
      </div>

      <h2 className="text-xl font-semibold text-white mb-1">{title}</h2>
      <p className="text-sm text-white/60 mb-6">Price: {price}</p>

      <button
        onClick={onClick}
        className="
          w-full
          py-3
          rounded-xl
          bg-white/10
          text-white
          font-medium
          hover:bg-white/20
          transition-colors
        "
      >
        Purchase
      </button>
    </motion.div>
  );
}
