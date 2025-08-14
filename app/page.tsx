"use client";

import { useEffect, useState } from "react";
import { fetchFromTMDB } from "@/lib/tmdb";
import MoviesPage from "@/components/MoviesPage";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

export default function Home() {
  const [initialMovies, setInitialMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchFromTMDB("/movie/popular", 1);
        setInitialMovies(data?.results || []);
        setTotalPages(data?.total_pages || 1);
      } catch (err) {
        console.error("Failed to load movies:", err);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  if (loading) {
    return <p className="text-white p-4">Loading...</p>;
  }

  return (
    <MoviesPage initialMovies={initialMovies} totalPages={totalPages} />
  );
}
