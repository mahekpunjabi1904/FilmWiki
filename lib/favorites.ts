import { getSession } from "next-auth/react";

export interface Movie {
  id: number;
  title: string;
  poster_path?: string | null;
  // add any other fields you actually use
}

function getStorageKey(userEmail?: string) {
  return userEmail ? `favorites_${userEmail}` : "favorites";
}

export async function getFavorites(): Promise<Movie[]> {
  const session = await getSession();
  const key = getStorageKey(session?.user?.email || "");
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}

export async function saveFavorites(favorites: Movie[]) {
  const session = await getSession();
  const key = getStorageKey(session?.user?.email || "");
  localStorage.setItem(key, JSON.stringify(favorites));
}

export async function isFavorite(movieId: number): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.some((m) => m.id === movieId);
}

export async function toggleFavorite(movie: Movie) {
  const favorites = await getFavorites();
  const exists = favorites.some((m) => m.id === movie.id);

  let updatedFavorites;
  if (exists) {
    updatedFavorites = favorites.filter((m) => m.id !== movie.id);
  } else {
    updatedFavorites = [...favorites, movie];
  }
  await saveFavorites(updatedFavorites);
}
