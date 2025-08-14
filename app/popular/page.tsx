import { fetchFromTMDB } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";

export default async function PopularPage() {
  const data = await fetchFromTMDB("/movie/popular");
  const movies = data.results;

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie: any) => (
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="w-full h-auto rounded mb-2"
              />
              <h2 className="text-lg text-white font-semibold">{movie.title}</h2>
              <div className="text-sm text-white mt-1">
                <p>
                  <span className="text-pink-300">Ratings:</span> ⭐{" "}
                  {movie.vote_average.toFixed(1)}
                </p>
                <p>
                  <span className="text-pink-300">Release Date:</span>{" "}
                  {movie.release_date}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
