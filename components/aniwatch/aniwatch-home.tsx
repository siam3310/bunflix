import { aniwatchHomeApi } from "@/data/fetch-data";
import AniwatchCategory from "./aniwatch-category";
import AniwatchSlider from "./aniwatch-slider";

export async function AniwatchHome() {
  const data: aniwatchApi = await aniwatchHomeApi();

  return (
    <>
      <AniwatchSlider anime={data} />
      <AniwatchCategory anime={data} />
    </>
  );
}
