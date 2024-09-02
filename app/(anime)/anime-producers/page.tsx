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
  const data = await fetchAniwatchCategories(
    searchParams.type
  );
  const producerName = searchParams.type
  .replace(/-/, " ")
  .split(" ")
  .map(
    (word) =>
      word &&
      typeof word === "string" &&
      word.charAt(0).toUpperCase() + word.slice(1) + " "
  )
  .join("");

  return (
    <div className="min-h-screen bg-black/80 p-4">
      <h1 className="text-3xl my-2 font-semibold">{producerName}</h1>
      <div>
        <AniwatchCategoryList anime={data.animes} />
      </div>
    </div>
  );
}

async function fetchAniwatchCategories(
  producer: aniwatchCategoriesName,
  page?: number | string
) {
  try {
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/producer/${producer}?page=${page || 1}`
    );
    const data = await response.json() as aniwatchCategories

    return data;
  } catch (error) {
    throw new Error(`Search failed in Categories`);
  }
}
