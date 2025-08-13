export default function Home() {
  // Temporary placeholder movie list
  const movies = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    title: `Movie ${i + 1}`,
  }));

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>

      {/* Grid layout for movie cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow"
          >
            {/* Placeholder for poster */}
            <div className="bg-gray-300 dark:bg-gray-700 h-48 mb-2 rounded"></div>

            {/* Movie title */}
            <h2 className="text-lg font-semibold">{movie.title}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
