// app/search/SearchPageContent.tsx
'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { searchMovies } from '@/lib/tmdb';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

export default function SearchPageComponent() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    searchMovies(query)
      .then((data: { results: Movie[] }) => setMovies(data.results || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [query]);

  if (!query.trim()) {
    return (
      <main className="p-4">
        <h1 className="text-3xl font-bold mb-6">Search</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Please enter a search term in the box above.
        </p>
      </main>
    );
  }

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for: <span className="text-pink-500">{query}</span>
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : movies.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No movies found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={500}
                    height={750}
                    className="w-full h-auto rounded mb-2"
                  />
                ) : (
                  <div className="w-full h-[375px] bg-gray-300 dark:bg-gray-700 rounded mb-2 flex items-center justify-center text-gray-600 dark:text-gray-300">
                    No Image
                  </div>
                )}
                <h2 className="text-lg font-semibold text-white">{movie.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
