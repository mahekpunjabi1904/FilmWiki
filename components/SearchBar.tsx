"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react"; // Search icon

import debounce from "lodash.debounce"; // To limit API calls

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  // Debounce search so we don’t call API on every keystroke
  const debouncedSearch = debounce((searchTerm: string) => {
    onSearch(searchTerm);
  }, 500);

  useEffect(() => {
    debouncedSearch(query);

    // Cleanup debounce when component unmounts
    return () => {
      debouncedSearch.cancel();
    };
  }, [query]);
  const clearSearch = () => {
    setQuery("");
    onSearch(""); // Reset results to popular movies
  };

  return (
    <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full px-4 py-2 mb-6 w-full sm:w-96 mx-auto shadow">
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
          onClick={clearSearch}
          className="p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <X className="w-4 h-4 text-gray-500 dark:text-gray-300" />
        </button>
      )}
    </div>

    
  );
}
