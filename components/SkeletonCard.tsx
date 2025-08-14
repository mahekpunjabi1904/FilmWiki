export default function SkeletonCard() {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded shadow animate-pulse">
      <div className="w-full h-64 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
    </div>
  );
}
