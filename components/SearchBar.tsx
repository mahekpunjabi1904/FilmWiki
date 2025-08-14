/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import debounce from "lodash.debounce";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  // Debounce search to avoid excessive API calls
  const debouncedSearch = debounce((searchTerm: string) => {
    onSearch(searchTerm);
  }, 500);

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query]);

  const clearSearch = () => {
    setQuery("");
    onSearch(""); // Reset to default results
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full px-4 py-2 mb-6 w-full sm:w-96 mx-auto shadow"
    >
      <Search className="w-5 h-5 text-gray-500 dark:text-gray-300 mr-2" />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
        className="bg-transparent outline-none flex-1 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
      />

      {query && (
        <button
          type="button" // ✅ prevents form submit
          onClick={clearSearch}
          className="p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <X className="w-4 h-4 text-gray-500 dark:text-gray-300" />
        </button>
      )}

      {/* Go button only on small screens */}
      <button
        type="submit"
        className="ml-2 px-3 py-1 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-sm sm:hidden"
      >
        Go
      </button>
    </form>
  );
}