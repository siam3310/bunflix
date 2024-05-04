type aniwatchApi = {
  spotlightAnimes: spotlightAnimes[];
  trendingAnimes: trendingAnimes[];
  latestEpisodeAnimes: latestEpisodeAnimes[];
  topUpcomingAnimes: topUpcomingAnimes[];
  top10Animes: top10Animes[];
  topAiringAnimes: topAiringAnimes[];
  genres: string[];
};

type topAiringAnimes = {
  id: string;
  name: string;
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
        episodes: { sub: string|number; dub: string|number };
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
      genres: [string];
      studios: string;
      producers: [string];
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

type aniwatchEpisodeData = {
  totalEpisodes: number;
  episodes: {
    title: string;
    episodeId: string|number
    number: number|string
    isFiller: boolean;
  }[];
};

type aniwatchSearch = {
  animes: {
    id: string;
    name: string;
    poster: string;
    duration: string;
    type: string;
    rating: string;
    episodes: { sub: number; dub: number };
  }[];
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

type aniwatchEpisodeSrc = {
  tracks: { file: string; kind: string,label:string,default:boolean }[];
  intro: { start: number; end: number };
  outro: { start: number; end: number };
  sources: { url: string; type: string }[];
  anilistID: [];
  malID: [];
};
