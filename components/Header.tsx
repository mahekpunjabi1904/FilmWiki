"use client";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const linkClasses = (path: string) =>
    `hover:text-yellow-300 transition-colors cursor-pointer font-medium ${
      pathname === path ? "text-yellow-400 font-bold" : "text-gray-800 dark:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-1 bg-pink-800 dark:bg-pink-800">
      {/* Left: Logo */}
      <div className="flex items-center gap-1">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/filmwiki-logo.png"
            alt="FilmWiki Logo"
            width={70}
            height={20}
            priority
          />
          <h1 className="text-xl font-bold text-white">FilmWiki</h1>
        </Link>
      </div>

      {/* Middle: Navigation Links */}
      <nav className="flex items-center gap-6">
        <Link href="/" className={linkClasses("/")}>
          Home
        </Link>
        <Link href="/favorites" className={linkClasses("/favorites")}>
          Favorites
        </Link>
      </nav>

      {/* Right: Dark Mode + Login/Logout */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full mr-2 transition-colors 
             bg-gray-300 dark:bg-gray-600 
             hover:bg-black dark:hover:bg-white"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800" />
          )}
        </button>

        {session ? (
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
