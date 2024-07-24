import cache from "@/lib/cache";
import MovieItem from "@/components/movie-item";

export default async function TmdbShowRow({
  title,
  type,
  endpoint,
}: {
  title: string;
  type: string;
  endpoint: string;
}) {
  const results = await fetchData(endpoint);

  return (
    <div className=" mb-4">
      <div>
        <h1 className="font-bold text-3xl lg:text-5xl p-4 capitalize">
          {decodeURIComponent(title)}
        </h1>
      </div>
      <div className=" w-full overflow-x-scroll scrollbar-hide ">
        <div
          className= "flex w-fit px-2 ">
          {results?.results.map((movie) => (
            <MovieItem type={type} key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function fetchData(
  endpoint: string
): Promise<TmdbMovie | null> {
  const cacheKey = `${endpoint}`;

  try {
    const cachedData: TmdbMovie | undefined = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    const response = await fetch(endpoint);
    const data = await response.json();
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(error); 
    return null
  }
}
