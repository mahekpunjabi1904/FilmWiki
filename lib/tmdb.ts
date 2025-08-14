const BASE_URL = "https://api.themoviedb.org/3"; // v4 still uses /3 endpoints for most data

export async function fetchFromTMDB(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}?language=en-US`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_V4_KEY}`,
      accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.statusText}`);
  }

  return res.json();
}
export async function searchMovies(query: string) {
  const res = await fetch(
    `${BASE_URL}/search/movie?language=en-US&query=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_V4_KEY}`,
        accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`TMDB Search API error: ${res.statusText}`);
  }

  return res.json();
}
