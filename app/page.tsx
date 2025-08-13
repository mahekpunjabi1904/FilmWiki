import { fetchFromTMDB } from "@/lib/tmdb";
import Image from "next/image";

export default async function Home() {
  // Fetch popular movies from TMDB
  const data = await fetchFromTMDB("/movie/popular");
  const movies = data.results;

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>

      {/* Grid layout for movie cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie: any) => (
          <div
            key={movie.id}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
              className="w-full h-auto rounded mb-2"
              priority
            />

            {/* Movie title from API */}
            <h2 className="text-lg text-white font-semibold">{movie.title}</h2>

            {/* Rating & release date */}
            <div className=" text-sm text-white mt-1">
              <p>
                <span className="text-pink-300 dark:text-pink-300 ">
                  Ratings:
                </span>{" "}
                ⭐ {movie.vote_average.toFixed(1)}
              </p>
              <p>
                <span className="text-pink-300 dark:text-pink-300">
                  Movie Release Date:
                </span>{" "}
                {movie.release_date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
