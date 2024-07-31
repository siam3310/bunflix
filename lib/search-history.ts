import Dexie, { EntityTable } from "dexie";

interface SearchHistory {
  id: number;
  type: string;
  term: string;
}

export const searchHistory = new Dexie("SearchHistory") as Dexie & {
  searches: EntityTable<SearchHistory, "id">;
};
searchHistory.version(1).stores({
  searches: "++id",
});
