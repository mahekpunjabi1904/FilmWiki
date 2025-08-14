"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res?.error) {
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <main
        className="flex justify-center items-center min-h-screen bg-gray-900 overflow-hidden"
        style={{ overflow: "hidden" }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-2xl shadow-xl w-96 flex flex-col"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-white">
            Login
          </h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold shadow-md transition transform hover:scale-105"
          >
            Login
          </button>

          <p className="mt-6 text-center text-gray-300 text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-pink-400 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </main>
  );
}
