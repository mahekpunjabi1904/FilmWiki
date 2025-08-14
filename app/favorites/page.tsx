/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFavorites } from "@/lib/favorites";
import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton";
import SkeletonCard from "@/components/SkeletonCard";

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loadingFavs, setLoadingFavs] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
    setLoadingFavs(false);
  };

  useEffect(() => {
    if (status === "authenticated") {
      loadFavorites();
    }
  }, [status]);

  if (status === "loading" || loadingFavs) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function removeFavorite(id: any): void {
    throw new Error("Function not implemented.");
  }

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
            <div
              key={movie.id}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow"
            >
              {/* Wrap image and title in Link so card is clickable */}
              <Link href={`/movie/${movie.id}`}>
                <div className="cursor-pointer hover:scale-105 transition-transform duration-200">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={500}
                    height={750}
                    className="w-full h-auto rounded mb-2"
                  />
                  <h2 className="text-lg text-white font-semibold">
                    {movie.title}
                  </h2>

                  {/* Rating & release date like home page */}
                  <div className="text-sm text-white mt-1">
                    <p>
                      <span className="text-pink-300">Ratings:</span> ⭐{" "}
                      {movie.vote_average?.toFixed(1) || "N/A"}
                    </p>
                    <p>
                      <span className="text-pink-300">Release Date:</span>{" "}
                      {movie.release_date || "Unknown"}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Remove Favorite button */}
              <button
                onClick={() => removeFavorite(movie.id)}
                className="mt-2 bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 rounded"
              >
                Remove Favorite
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
