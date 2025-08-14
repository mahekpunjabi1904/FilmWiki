"use client";

import { useState, useEffect } from "react";
import { fetchFromTMDB, searchMovies } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import SkeletonCard from "@/components/SkeletonCard";
import FavoriteButton from "@/components/FavoriteButton";

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (searchQuery) {
          data = await searchMovies(searchQuery, page);
        } else {
          data = await fetchFromTMDB("/movie/popular", page);
        }
        setMovies(data?.results || []);
        setTotalPages(data?.total_pages || 1);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies. Please try again later.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, page]);

  return (
    <main className="p-4 overflow-x-hidden">
      <SearchBar
        onSearch={(query) => {
          setSearchQuery(query);
          setPage(1);
        }}
      />

      <h1 className="text-3xl font-bold mb-6 text-white">
        {searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies"}
      </h1>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 items-stretch">
            {movies.map((movie) => (
              <Link href={`/movie/${movie.id}`} key={movie.id}>
<div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer flex flex-col h-full">
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      width={500}
                      height={750}
                      className="w-full h-auto rounded mb-2"
                    />
                  ) : (
                    <div className="w-full h-[750px] bg-gray-600 rounded mb-2 flex items-center justify-center text-white">
                      No Image
                    </div>
                  )}
                  <h2 className="text-lg text-white font-semibold">
                    {movie.title}
                  </h2>
                  <div className="text-sm text-white mt-1">
                    <p>
                      <span className="text-pink-300">Ratings:</span> ⭐{" "}
                      {movie.vote_average?.toFixed(1) || "N/A"}
                    </p>
                    <p>
                      <span className="text-pink-300">Release Date:</span>{" "}
                      {movie.release_date || "N/A"}
                    </p>
                    <div className="">
            <FavoriteButton movie={movie} />
          </div>
                  </div>
                  {/* Favorite Button (top right) */}
          

                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-pink-600 text-white rounded disabled:opacity-50"
            >
              &lt; Prev
            </button>
            <span className="text-white">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-pink-600 text-white rounded disabled:opacity-50"
            >
              Next &gt;
            </button>
          </div>
        </>
      )}
    </main>
  );
}
