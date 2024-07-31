"use server";
import cache from "@/lib/cache";

const key = process.env.TMDB_KEY;

export async function fetchHeroData() {
  const cacheKey = "tmdbHero";

  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${key}`
    );
    const data = await response.json();
    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    throw new Error("Failed to fetch Slider data");
  }
}

export async function fetchSeasonData(
  series_id: number | string,
  season_number: number | string
) {
  const cacheKey = `tmdbSeasonData${series_id}${season_number}`;

  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}?api_key=${key}`
    );

    const data = await response.json();
    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data for ${series_id}`);
  }
}

export async function fetchTmdbInfo(type: string, id: number | string) {
  const cacheKey = `tmdbInfo${type}-${id}`;

  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${key}`
    );

    const data = await response.json();
    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data for ${id}`);
  }
}

export async function fetchTmdbMultiSearch(searchTerm: string, page: number) {
  const cacheKey = `tmdbMultiSeacrh${searchTerm}${page}`;

  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&page=${page}&api_key=${key}`
    );
    const data = await response.json();
    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    throw new Error(`Search failed for ${searchTerm}`);
  }
}

export async function aniwatchHomeApi() {
  const cacheKey = `animeHome`;
  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    const response = await fetch(`${process.env.ANIWATCH_API}/anime/home`);
    const data = await response.json();
    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    throw new Error(`Fetch failed at Anime Slider`);
  }
}

export async function fetchAniwatchId(id: string) {
  const cacheKey = `aniwatchId${id}`;

  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/info?id=${id}`
    );

    const data = await response.json();
    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    throw new Error(`Fetch failed for AnimeID ${id}`);
  }
}

export async function fetchAniwatchEpisode(seasonId: string) {
  const cacheKey = `aniwatchEpisode${seasonId}`;

  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/episodes/${seasonId}`
    );
    const data = await response.json();
    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    throw new Error(`Fetch failed for SeasonID ${seasonId}`);
  }
}

export async function fetchAniwatchEpisodeServer(
  episodeId: string,
  episode: string
) {
  const cacheKey = `aniwatchEpisodeServer${episodeId}${episode}`;

  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/servers?episodeId=${episodeId}?ep=${episode}`
    );

    const data = await response.json();
    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    throw new Error(`Fetch failed Episode Server for ${episodeId + episode}`);
  }
}

export async function fetchAniwatchEpisodeSrc(
  episodeId: string,
  episode: string
) {
  const cacheKey = `aniwatchEpisodeSourceJp${episodeId}${episode}`;

  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/episode-srcs?id=${episodeId}?ep=${episode}&server=vidstreaming`
    );
    const data = await response.json();
    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    throw new Error(
      `Fetch failed Episode Sources japanesse for ${episodeId + episode}`
    );
  }
}

export async function fetchAniwatchEpisodeSrcDub(
  episodeId: string | number,
  episode: string
) {
  const cacheKey = `aniwatchEpisodeSourceEn${episodeId}${episode}`;

  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/episode-srcs?id=${episodeId}?ep=${episode}&server=vidstreaming&category=dub`
    );
    const data = await response.json();
    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    throw new Error(
      `Fetch failed Episode Sources english for ${episodeId + episode}`
    );
  }
}

export async function fetchAniwatchSearch(searchTerm: string) {
  const cacheKey = `aniwatchSearch${searchTerm}`;

  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/search?q=${searchTerm}&page=1`
    );
    const data = await response.json();
    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    throw new Error(`Search failed in Anime for ${searchTerm}`);
  }
}

export async function fetchAniwatchCategories(
  category:aniwatchCategoriesName,
  page?: number | string
) {
  try {
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/${category}?page=${page || 1}`
    );
    const data = await response.json();

    return data
  } catch (error) {}
}
