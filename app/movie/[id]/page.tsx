import { fetchFromTMDB } from "@/lib/tmdb";
import MovieDetailsCard from "@/components/MovieDetailsCard";


export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await fetchFromTMDB(`/movie/${params.id}`);

  return (
    <main className="p-4 flex justify-center">
      <MovieDetailsCard movie={movie} />
    </main>
  );
}
