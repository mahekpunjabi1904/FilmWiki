"use client";

import { useState, useEffect } from "react";
import { fetchFromTMDB, searchMovies } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Fetch popular movies initially
  useEffect(() => {
    if (!searchQuery) {
      setLoading(true);
      fetchFromTMDB("/movie/popular").then((data) => {
        setMovies(data.results);
        setLoading(false);
      });
    }
  }, [searchQuery]);

  // Search when query changes
  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      setLoading(true);
      searchMovies(searchQuery).then((data) => {
        setMovies(data.results || []);
        setLoading(false);
        setIsSearching(false);
      });
    }
  }, [searchQuery]);

  return (
    <main className="p-4">
      {/* Search Bar */}
      <SearchBar onSearch={(query) => setSearchQuery(query)} />

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">
        {searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies"}
      </h1>

      {/* Loading State */}
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      ) : movies.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No movies found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movies.map((movie: any) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
                {/* Poster */}
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="w-full h-auto rounded mb-2"
                  priority
                />

                {/* Movie title */}
                <h2 className="text-lg text-white font-semibold">
                  {movie.title}
                </h2>

                {/* Rating & release date */}
                <div className="text-sm text-white mt-1">
                  <p>
                    <span className="text-pink-300 dark:text-pink-300">
                      Ratings:
                    </span>{" "}
                    ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
                  </p>
                  <p>
                    <span className="text-pink-300 dark:text-pink-300">
                      Movie Release Date:
                    </span>{" "}
                    {movie.release_date || "N/A"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
