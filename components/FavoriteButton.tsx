"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { isFavorite, toggleFavorite } from "@/lib/favorites";

export default function FavoriteButton({ movie }: { movie: any }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(movie.id));
  }, [movie.id]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click event
    e.preventDefault();  //Prevent Link navigation
    toggleFavorite(movie);
    setFavorite((prev) => !prev);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer transition ${
        favorite
      ? "bg-pink-600 text-white hover:bg-pink-700"
      : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-pink-500 hover:text-white"
      }`}
    >
      <Heart
        className={`w-4 h-4 ${favorite ? "fill-current" : ""}`}
      />
      {favorite ? "Remove Favorite" : "Add Favorite"}
    </button>
  );
}
