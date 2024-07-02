const key = process.env.TMDB_KEY;


export async function fetchSeasonData(series_id:number|string,season_number:number|string) { 
  const data = await fetch(`https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}?api_key=${key}`);
  if (!data.ok) {
    throw new Error("Failed To Fetch Season Data");
  }
  return data.json();
}

export async function fetchTmdbInfo(type: string, id: number | string) {
  const data = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${key}`);
  if (!data.ok) {
    throw new Error(`Failed To Fetch ${type.toUpperCase()} Data from TheMovieDatabase`);
  }
  return data.json();
}

export async function fetchHeroData() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${key}`
  );
  if (!data.ok) {
    throw new Error(`Failed to Fetch Movie Slider Data from TheMovieDatabase`);
  }
  return data.json();
}


export async function fetchTmdbMultiSearch(
  searchTerm: string,
  page: number 
) {
  const data = await fetch(`https://api.themoviedb.org/3/search/multi?query=${searchTerm}&page=${page}&api_key=${key}`);
  if (!data.ok) {
    throw new Error(`Failed To Search '${searchTerm}' `);
  }
  return data.json();
}


export async function aniwatchHomeApi() {
  const data = await fetch("https://animax-topaz.vercel.app/anime/home");
  if (!data.ok) {
    throw new Error("Home data Fetch Failed");
  }

  return data.json();
}

export async function fetchAniwatchId(id: string) {
  const data = await fetch(
    `https://animax-topaz.vercel.app/anime/info?id=${id}`
  );
  if (!data.ok) {
    throw new Error("Anime data Failed To Fetch");
  }

  return data.json();
}

export async function fetchAniwatchEpisode(seasonId: string) {
  const data = await fetch(
    `https://animax-topaz.vercel.app/anime/episodes/${seasonId}`
  );
  if (!data.ok) {
    throw new Error("Anime Episode Fetch Failed");
  }

  return data.json();
}

export async function fetchAniwatchEpisodeServer(
  episodeId: string,
  episode: string
) {
  const data = await fetch(
    `https://animax-topaz.vercel.app/anime/servers?episodeId=${episodeId}?ep=${episode}`
  );
  if (!data.ok) {
    throw new Error("Server Fetch Failed");
  }

  return data.json();
}

export async function fetchAniwatchEpisodeSrc(
  episodeId: string,
  episode: string
) {
  const data = await fetch(
    `https://animax-topaz.vercel.app/anime/episode-srcs?id=${episodeId}?ep=${episode}&server=vidstreaming`
  );
  if (!data.ok) {
    throw new Error("Episode Source Fetch Failed");
  }

  return data.json();
}

export async function fetchAniwatchEpisodeSrcDub(
  episodeId: string | number,
  episode?: string
) {

  let data
  
  if(!episode){
    data = await fetch(
      `https://animax-topaz.vercel.app/anime/episode-srcs?id=${episodeId}&server=vidstreaming&category=dub`
    );

    if (!data.ok) {
      throw new Error("Episode Source Fetch Failed");
    }
  
    return data.json();
  }

  data = await fetch(
    `https://animax-topaz.vercel.app/anime/episode-srcs?id=${episodeId}?ep=${episode}&server=vidstreaming&category=dub`
  );
  if (!data.ok) {
    throw new Error("Source Fetch Failed");
  }

  return data.json();
}

export async function fetchAniwatchSearch(
  searchTerm: string,
  page?: number | string
) {
  const data = await fetch(
    `https://animax-topaz.vercel.app/anime/search?q=${searchTerm}&page=${page}`
  );
  if (!data.ok) {
    throw new Error(`Anime Failed To Search '${searchTerm}' `);
  }

  return data.json();
}
