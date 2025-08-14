"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { isFavorite, toggleFavorite } from "@/lib/favorites";
import { useSession } from "next-auth/react";

type Props = {
  movie: any;
  onToggle?: () => void; // optional callback
};

export default function FavoriteButton({ movie,  onToggle }: Props) {
  const { data: session } = useSession();

  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (!session) return; // only check if logged in
    (async () => {
      const favStatus = await isFavorite(movie.id);
      setFavorite(favStatus);
    })();
  }, [session, movie.id]);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!session) {
      alert("Please log in to save favorites");
      return;
    }
    await toggleFavorite(movie);
    setFavorite((prev) => !prev);

    // Trigger parent refresh

    if (onToggle) onToggle();
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
      <Heart className={`w-4 h-4 ${favorite ? "fill-current" : ""}`} />
      {favorite ? "Remove Favorite" : "Add Favorite"}
    </button>
  );
}
