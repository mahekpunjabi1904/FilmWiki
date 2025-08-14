"use client";

import { useState, useEffect } from "react";
import { fetchFromTMDB, searchMovies } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import SkeletonCard from "@/components/SkeletonCard";

export default function MoviesPage({ initialMovies, totalPages: initialTotal }) {
  const [movies, setMovies] = useState(initialMovies);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotal);

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
    } catch {
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [searchQuery, page]);


  return (
    <main className="p-4 overflow-x-hidden">
      <SearchBar onSearch={(query) => { setSearchQuery(query); setPage(1); }} />

      <h1 className="text-3xl font-bold mb-6 text-white">
        {searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies"}
      </h1>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 items-stretch">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
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
                      className="w-full h-[300px] object-cover rounded mb-2"
                    />
                  ) : (
                    <div className="w-full h-[300px] bg-gray-600 rounded mb-2 flex items-center justify-center text-white">
                      No Image
                    </div>
                  )}
                  <h2 className="text-lg text-white font-semibold">{movie.title}</h2>
                  <div className="text-sm text-white mt-1">
                    <p><span className="text-pink-300">Ratings:</span> ⭐ {movie.vote_average?.toFixed(1) || "N/A"}</p>
                    <p><span className="text-pink-300">Release Date:</span> {movie.release_date || "N/A"}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-pink-600 text-white rounded disabled:opacity-50"
            >
              &lt; Prev
            </button>
            <span className="text-white">Page {page} of {totalPages}</span>
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
