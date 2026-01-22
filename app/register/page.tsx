"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";

export default function RegisterPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen w-full text-white relative overflow-hidden bg-black flex items-center justify-center px-6 pt-32">
        <GridBackground className="absolute inset-0 z-0 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/60 to-black/80 pointer-events-none" />

        <div className="relative z-20 w-full max-w-lg bg-black/30 backdrop-blur-xl rounded-3xl border border-white/10 p-10 shadow-2xl">
          <h1 className="text-4xl font-bold text-center mb-3">Register</h1>
          <p className="text-center text-white/60 mb-10">
            Create your new account
          </p>

          <div className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Email"
              className="bg-black/40 px-5 py-4 rounded-xl border border-white/10 focus:border-purple-500 outline-none"
            />

            <input
              type="text"
              placeholder="Username"
              className="bg-black/40 px-5 py-4 rounded-xl border border-white/10 focus:border-purple-500 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              className="bg-black/40 px-5 py-4 rounded-xl border border-white/10 focus:border-purple-500 outline-none"
            />

            <button
              className={`mt-4 py-4 rounded-xl font-semibold transition bg-purple-600 hover:bg-purple-700`}
            >
              Create Account
            </button>

            <p className="text-center mt-3 text-white/50">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-400 hover:text-purple-300"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
