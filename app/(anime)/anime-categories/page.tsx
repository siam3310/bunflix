import AniwatchCategoryList from "@/components/aniwatch/aniwatch-category-list";
import Link from "next/link";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { type: aniwatchCategoriesName };
}) {
  const term = searchParams.type
    .replace(/-/, " ")
    .split(" ")
    .map(
      (word) =>
        word &&
        typeof word === "string" &&
        word.charAt(0).toUpperCase() + word.slice(1) + " "
    )
    .join("");

  return {
    title: `${term} - Anime Category`,
  };
}

export default async function Categories({
  searchParams,
}: {
  searchParams: { type: aniwatchCategoriesName };
}) {
  const data: aniwatchCategories = await fetchAniwatchCategories(
    searchParams.type
  );

  const categories = [
    "most-favorite",
    "most-popular",
    "subbed-anime",
    "dubbed-anime",
    "recently-updated",
    "recently-added",
    "top-upcoming",
    "top-airing",
    "movie",
    "special",
    "ova",
    "ona",
    "tv",
    "completed",
  ];

  return (
    <div className="min-h-screen bg-black/80 p-4">
      <h1 className="text-3xl my-2 font-semibold">{data.category}</h1>
      <div>
        <AniwatchCategoryList anime={data.animes} />
      </div>
      <div>
        <h2 className="text-2xl py-2 font-semibold mt-4">More Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Link
              key={category + index}
              className="capitalize px-2 py-1 bg-white/10 rounded-md hover:bg-red-700"
              href={`/anime-categories?type=${category.toLowerCase()}`}
            >
              {category.replace(/-/, " ")}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl py-2 font-semibold mt-4">Genres</h2>
        <div className="flex flex-wrap gap-2">
          {data.genres.map((genre, index) => (
            <Link
              key={genre + index}
              className=" px-2 py-1 bg-white/10 rounded-md hover:bg-red-700"
              href={`/genre/${genre.toLowerCase()}`}
            >
              {genre}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

async function fetchAniwatchCategories(
  category: aniwatchCategoriesName,
  page?: number | string
) {
  try {
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/${category}?page=${page || 1}`
    );
    const data = await response.json() as aniwatchCategories

    return data;
  } catch (error) {
    throw new Error(`Search failed in Categories`);
  }
}
