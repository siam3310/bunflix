import AniwatchCategoryList from "@/components/aniwatch/aniwatch-category-list";

type Params = Promise<{ type: aniwatchCategoriesName }>

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Params
}) {
    const {type} = await searchParams

  const term = type
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
  searchParams: Params
}) {
    const {type} = await searchParams

  const producerName = type
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
        <AniwatchCategoryList type={type} />
      </div>
    </div>
  );
}
