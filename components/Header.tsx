"use client";
import { Sun, Moon } from "lucide-react";

import Image from "next/image";

import { useState, useEffect } from "react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    // Simple header container with padding and background
    <header className="flex items-center justify-between p-1 bg-pink-800 dark:bg-pink-800">
      {/* Logo image */}
      <div className="flex items-center gap-1">
        <Image
          src="/filmwiki-logo.png"
          alt="FilmWiki Logo"
          width={70}
          height={20}
          priority
        />
        <h1 className="text-xl font-bold">FilmWiki</h1>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full mr-2 transition-colors 
             bg-gray-300 dark:bg-gray-600 
             hover:bg-black dark:hover:bg-white"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-400" /> // sun icon for dark mode
        ) : (
          <Moon className="w-5 h-5 text-gray-800" /> // moon icon for light mode
        )}
      </button>
    </header>
  );
}
