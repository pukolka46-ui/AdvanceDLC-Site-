"use client";

import { useEffect } from "react";
import Image from "next/image";

interface LoaderProps {
  onFinished: () => void;
}

export default function Loader({ onFinished }: LoaderProps) {
  useEffect(() => {
    const timer = setTimeout(onFinished, 1000); // эмуляция загрузки
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black text-white">
      <Image src="/advance-dlc-icon.png" alt="AdvanceDLC" width={120} height={120} />
      <p className="mt-4 text-xl">Загрузка...</p>
    </div>
  );
}
