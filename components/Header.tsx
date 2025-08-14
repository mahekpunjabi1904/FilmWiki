/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import { Sun, Moon, Menu, X, User, Search } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const linkClasses = (path: string) =>
    `hover:text-yellow-300 transition-colors cursor-pointer font-medium ${
      pathname === path
        ? "text-yellow-400 font-bold"
        : "text-gray-800 dark:text-white"
    }`;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-2 bg-pink-800 dark:bg-pink-800">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/filmwiki-logo.png"
            alt="FilmWiki Logo"
            width={50}
            height={20}
            priority
          />
          <h1 className="text-lg font-bold text-white">FilmWiki</h1>
        </Link>
      </div>
      

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/" className={linkClasses("/")}>
          Home
        </Link>
        <Link href="/favorites" className={linkClasses("/favorites")}>
          Favorites
        </Link>
      </nav>

      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        {/* Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-black dark:hover:bg-white"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800" />
          )}
        </button>

        {/* User Icon */}
        <button
          onClick={() => router.push("/login")}
          className="p-2 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-pink-500 hover:shadow-lg hover:shadow-pink-300/50 transition-all duration-200 group"
        >
          <User className="w-5 h-5 text-gray-800 dark:text-white group-hover:text-white" />
        </button>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden p-2 rounded bg-gray-300 dark:bg-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-pink-900 dark:bg-pink-900 shadow-lg md:hidden">
          <nav className="flex flex-col divide-y divide-pink-700">
            <Link
              href="/"
              className={`${linkClasses(
                "/"
              )} block px-6 py-3 text-white hover:bg-pink-700`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/favorites"
              className={`${linkClasses(
                "/favorites"
              )} block px-6 py-3 text-white hover:bg-pink-700`}
              onClick={() => setMenuOpen(false)}
            >
              Favorites
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
