import AniwatchCategoryList from "@/components/aniwatch/aniwatch-category-list";

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
  return (
    <div className="min-h-screen bg-black/80 p-4">
      <h1 className="text-3xl my-2 font-semibold">{term}</h1>
        <AniwatchCategoryList type={searchParams.type} />
    </div>
  );
}


