"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="
        border border-white/10
        rounded-2xl
        p-6
        w-full
        max-w-md
      "
    >
      <div className="flex items-center gap-3 mb-3 text-white">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>

      <p className="text-white/70 leading-relaxed text-sm">{description}</p>
    </motion.div>
  );
}
