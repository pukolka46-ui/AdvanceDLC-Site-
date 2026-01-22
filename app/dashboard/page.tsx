"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

export default function Dashboard() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Loader onFinished={() => setReady(true)} />
      {ready && (
        <>
          <Header />

          <main className="min-h-screen text-white bg-black px-48 pt-40">
            <h1 className="text-5xl font-bold mb-6">Dashboard</h1>
            <p className="text-xl text-white/70">
              Welcome, <span className="text-purple-400">finikov</span>
            </p>
          </main>

          <Footer />
        </>
      )}
    </>
  );
}
