export default function SkeletonMovieDetails() {
  return (
    <div className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-5xl mx-auto animate-pulse">
      <div className="flex flex-col md:flex-row">
        {/* Poster */}
        <div className="md:w-1/3 bg-gray-300 dark:bg-gray-700 h-[450px]"></div>

        {/* Movie info */}
        <div className="md:w-2/3 p-6 flex flex-col justify-center space-y-4">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 w-3/4 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
