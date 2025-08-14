"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchFromTMDB } from "@/lib/tmdb";
import MovieDetailsCard from "@/components/MovieDetailsCard";
import SkeletonMovieDetails from "@/components/SkeletonMovieDetails";

export default function MoviePage() {
  const params = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFromTMDB(`/movie/${params.id}`).then((data) => {
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
      <MovieDetailsCard movie={movie} />
    </main>
  );
}
