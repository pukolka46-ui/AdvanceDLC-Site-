"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import GridBackground from "@/components/GridBackground";

import {
  Eye,
  SlidersHorizontal,
  Gauge,
  ArrowsClockwise,
} from "@phosphor-icons/react";

export default function Home() {
  const [ready, setReady] = useState(false);

  const handleLoaderFinish = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <>
      <Loader onFinished={handleLoaderFinish} />

      {ready && (
        <>
          <Header />

          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-white bg-black relative z-10"
          >
            <section className="min-h-screen px-48 flex items-center relative">
              <GridBackground className="absolute inset-0" />
              <div className="relative z-[2] w-full flex items-center gap-20">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="w-1/2 pr-8"
                >
                  <h1 className="text-7xl font-extrabold leading-tight mb-6">
                    About Us
                  </h1>

                  <p className="text-xl text-white/60 max-w-md mb-12">
                    We create a next-generation game client focused on speed,
                    stability and a premium user experience. More FPS. Modern
                    modules. Zero distractions.
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-14">
                    <div>
                      <p className="text-4xl font-bold">10K+</p>
                      <p className="text-white/50">Active users</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold">60K+</p>
                      <p className="text-white/50">Total downloads</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold">30%+</p>
                      <p className="text-white/50">More FPS</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold">24/7</p>
                      <p className="text-white/50">Support</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="w-1/2 flex justify-end"
                >
                  <Image
                    src="/icon.png"
                    alt="Hero"
                    width={650}
                    height={650}
                    className="drop-shadow-[0_0_70px_rgba(150,80,255,0.45)] select-none"
                  />
                </motion.div>
              </div>
            </section>

            <section className="min-h-screen flex items-center px-48 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: -40 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="w-1/2 flex justify-start relative"
              >
                <div className="-ml-24 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20">
                  <Image
                    src="/chat.jpg"
                    width={840}
                    height={840}
                    alt="Chat Screenshot"
                    className="rounded-2xl"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="w-1/2 pl-20"
              >
                <h1 className="text-6xl font-extrabold mb-10">
                  Our Advantages
                </h1>

                <div className="grid grid-cols-2 gap-8">
                  <Card
                    icon={<Eye size={26} />}
                    title="Beautiful Visuals"
                    description="Clean effects, polished UI, and modern styling."
                  />
                  <Card
                    icon={<SlidersHorizontal size={26} />}
                    title="Fully Customizable"
                    description="Tune modules, visuals, UI and effects exactly the way you want."
                  />
                  <Card
                    icon={<Gauge size={26} />}
                    title="High Performance"
                    description="Smooth gameplay, optimized FPS, stable performance."
                  />
                  <Card
                    icon={<ArrowsClockwise size={26} />}
                    title="Frequent Updates"
                    description="New features, improvements and bug fixes all the time."
                  />
                </div>
              </motion.div>
            </section>

            <section className="min-h-screen flex items-center justify-center px-48 relative">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="w-full flex flex-col items-center justify-center"
              >
                <h1 className="text-6xl font-extrabold mb-12 text-center">
                  Gameplay Showcase
                </h1>

                <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                  <iframe
                    className="rounded-2xl w-full h-[450px]"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Gameplay Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            </section>

            <Footer />
          </motion.main>
        </>
      )}
    </>
  );
}
