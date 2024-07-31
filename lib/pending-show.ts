import Dexie, { EntityTable } from "dexie";

interface Show {
    id: string;
    lang: string;
    episode: number;
    time: number;
    name:string;
    image:string;
  }

export const pendingShows = new Dexie("pendingShows") as Dexie & {
    shows: EntityTable<Show, "id">;
  };

  pendingShows.version(1).stores({
    shows: "++id",
  });