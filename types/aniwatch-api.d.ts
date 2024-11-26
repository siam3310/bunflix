type aniwatchApi = {
  success: boolean;
  data: {
    spotlightAnimes: spotlightAnimes[];
    trendingAnimes: trendingAnimes[];
    latestEpisodeAnimes: latestEpisodeAnimes[];
    topUpcomingAnimes: topUpcomingAnimes[];
    top10Animes: top10Animes;
    topAiringAnimes: topAiringAnimes[];
    genres: string[];
  };
};

type topAiringAnimes = {
  id: string;
  name: string;
  jname?: string;
  type?: string;
  description: string;
  poster: string;
  otherInfo: string[];
};

type top10Animes = {
  today: top10AnimesResult[];
  week: top10AnimesResult[];
  month: top10AnimesResult[];
};

type top10AnimesResult = {
  id: string;
  name: string;
  description: string;
  poster: string;
  episodes: { sub: number; dub: number };
};

type topUpcomingAnimes = {
  id: string;
  name: string;
  duration: string;
  poster: string;
  type: string;
  rating: string | null;
  episodes: { sub: number; dub: number };
};

type latestEpisodeAnimes = {
  id: string;
  name: string;
  description: string;
  poster: string;
  type: string;
  rating: string | null;
  episodes: { sub: number; dub: number };
};

type trendingAnimes = {
  rank: number;
  id: string;
  name: string;
  poster: string;
};

type spotlightAnimes = {
  rank: number;
  id: string;
  name: string;
  description: string;
  poster: string;
  jname: string;
  episodes: { sub: number; dub: number };
  otherInfo: [string, string, string, string];
};

type aniwatchInfo = {
  data: {
    anime: {
      info: {
        id: string;
        anilistId: number;
        malId: number;
        name: string;
        poster: string;
        description: string;
        stats: {
          rating: string;
          quality: string;
          episodes: { sub: string | number; dub: string | number };
          type: string;
          duration: string;
        };
      };
      moreInfo: {
        japanese: string;
        synonyms: string;
        aired: string;
        premiered: string;
        duration: string;
        status: string;
        malscore: string;
        genres: string[];
        studios: string;
        producers: string[];
      };
    };
    seasons: {
      id: string;
      name: string;
      title: string;
      poster: string;
      isCurrent: boolean;
    }[];
    mostPopularAnimes: {
      id: string;
      name: string;
      poster: string;
      jname: string;
      episodes: {
        sub: number;
        dub: number;
      };
      type: string;
    }[];
    relatedAnimes: {
      id: string;
      name: string;
      poster: string;
      jname: string;
      episodes: {
        sub: number;
        dub: number;
      };
      type: Special;
    }[];
    recommendedAnimes: {
      id: string;
      name: string;
      jname?: string;
      poster: string;
      duration: string;
      type: string;
      rating: string;
      episodes: {
        sub: number;
        dub: number;
      };
    }[];
  };
};

type aniwatchEpisodeData = {
  success: boolean;
  data: {
    totalEpisodes: number;
    episodes: {
      title: string;
      episodeId: string;
      number: string;
      isFiller: boolean;
    }[];
  };
};

type aniwatchSearch = {
  data: {
    animes: Anime[];
    mostPopularAnimes: {
      id: string;
      name: string;
      poster: string;
      jname: string;
      episodes: { sub: number; dub: number };
      type: string;
    }[];
    currentPage: number;
    hasNextPage: boolean;
    totalPages: number;
    searchQuery: string;
    searchFilters: {};
  };
};

type Anime = {
  id: string;
  name: string;
  poster: string;
  duration: string;
  type: string;
  jname?: string;
  rating: string;
  episodes: { sub: number; dub: number };
};

type aniwatchEpisodeSrc = {
  data: {
    tracks: { file: string; kind: string; label: string; default: boolean }[];
    intro: { start: number; end: number };
    outro: { start: number; end: number };
    sources: { url: string; type: string }[];
    anilistID: [];
    malID: [];
  };
};

type aniwatchGenre = {
  data: {
    genreName: string;
    animes: Anime[];
    genres: string[];
    topAiringAnimes: topAiringAnimes[];
    totalPages: number;
    hasNextPage: boolean;
    currentPage: number;
  };
};

type aniwatchStudio = {
  producerName: string;
  animes: Anime[];
  genres: string[];
  topAiringAnimes: topAiringAnimes[];
  totalPages: number;
  hasNextPage: boolean;
  currentPage: number;
};

type aniwatchCategories = {
  success: boolean;
  data: {
    genres: string[];
    animes: Anime[];
    top10Animes: top10Animes;
    category: string;
    totalPages: number;
    hasNextPage: boolean;
    currentPage: number;
  };
};

type aniwatchCategoriesName =
  | "most-favorite"
  | "most-popular"
  | "subbed-anime"
  | "dubbed-anime"
  | "recently-updated"
  | "recently-added"
  | "top-upcoming"
  | "top-airing"
  | "movie"
  | "special"
  | "ova"
  | "ona"
  | "tv"
  | "completed";
