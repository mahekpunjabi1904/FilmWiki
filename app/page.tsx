import MoviesPage from "@/components/MoviesPage";
import { fetchFromTMDB } from "@/lib/tmdb";

export default async function HomePage() {
  const data = await fetchFromTMDB("/movie/popular", 1);

  return <MoviesPage initialMovies={data.results} totalPages={data.total_pages} />;
}
