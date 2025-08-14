"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchFromTMDB } from "@/lib/tmdb";
import MovieDetailsCard from "@/components/MovieDetailsCard";
import SkeletonMovieDetails from "@/components/SkeletonMovieDetails";


interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
  overview?: string;
  genres?: { id: number; name: string }[];
  runtime?: number;
  backdrop_path?: string | null;
}

export default function MoviePage() {
  const params = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFromTMDB(`/movie/${params.id}`).then((data: Movie) => {
      setMovie(data);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) {
    return (
      <main className="p-4">
        <SkeletonMovieDetails />
      </main>
    );
  }

  return (
    <main className="p-4">
      {movie && <MovieDetailsCard movie={movie} />}
    </main>
  );
}
