export function getFavorites(): any[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("favorites");
  return stored ? JSON.parse(stored) : [];
}

export function saveFavorites(favorites: any[]) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function isFavorite(movieId: number): boolean {
  return getFavorites().some((m) => m.id === movieId);
}

export function toggleFavorite(movie: any) {
  const favorites = getFavorites();
  const exists = favorites.some((m) => m.id === movie.id);

  let updatedFavorites;
  if (exists) {
    updatedFavorites = favorites.filter((m) => m.id !== movie.id);
  } else {
    updatedFavorites = [...favorites, movie];
  }
  saveFavorites(updatedFavorites);
}
