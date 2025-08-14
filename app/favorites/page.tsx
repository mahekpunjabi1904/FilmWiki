"use client";

import { useEffect, useState } from "react";
import { getFavorites } from "@/lib/favorites";
import Image from "next/image";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-6">My Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No favorites added yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="w-full h-auto rounded mb-2"
                />
                <h2 className="text-lg text-white font-semibold">{movie.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
