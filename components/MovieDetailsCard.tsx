import Image from "next/image";

export default function MovieDetailsCard({ movie }: { movie: any }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row">
        {/* Poster */}
        <div className="md:w-1/3">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Movie info */}
        <div className="md:w-2/3 p-6 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-pink-300 dark:text-pink-300">{movie.title}</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{movie.overview}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 dark:text-gray-200">
            <p>
              <span className="font-semibold text-pink-500">Release Date:</span>{" "}
              {movie.release_date}
            </p>
            <p>
              <span className="font-semibold text-pink-500">Rating:</span> ⭐{" "}
              {movie.vote_average.toFixed(1)}
            </p>
            <p>
              <span className="font-semibold text-pink-500">Runtime:</span>{" "}
              {movie.runtime} min
            </p>
            <p>
              <span className="font-semibold text-pink-500">Genres:</span>{" "}
              {movie.genres.map((g: any) => g.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
