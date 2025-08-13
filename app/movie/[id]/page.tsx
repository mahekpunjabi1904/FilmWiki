import { fetchFromTMDB } from "@/lib/tmdb";
import Image from "next/image";

export default async function MoviePage({ params }: { params: { id: string } }) {
  // Fetch single movie details from TMDB
  const movie = await fetchFromTMDB(`/movie/${params.id}`);

  return (
    <main className="p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={750}
          className="rounded shadow"
          priority
        />

        {/* Details section */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {movie.overview}
          </p>

          <p>
            <span className="font-semibold">Release Date:</span>{" "}
            {movie.release_date}
          </p>
          <p>
            <span className="font-semibold">Rating:</span> ⭐{" "}
            {movie.vote_average.toFixed(1)}
          </p>
          <p>
            <span className="font-semibold">Runtime:</span> {movie.runtime} min
          </p>
          <p>
            <span className="font-semibold">Genres:</span>{" "}
            {movie.genres.map((g: any) => g.name).join(", ")}
          </p>
        </div>
      </div>
    </main>
  );
}
