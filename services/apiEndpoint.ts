const key = process.env.TMDB_KEY

export const baseUrl = "https://api.themoviedb.org/3"
const endpoint = {
    find:`${baseUrl}/find?api=${key}`,
    // movie endpoints
    popularMovies:`${baseUrl}/movie/popular?api_key=${key}`,
    trendingMovies:`${baseUrl}/trending/movie/week?api_key=${key}&region=IN&with_original_language=hi`,
    upcomingMovies:`${baseUrl}/movie/upcoming?api_key=${key}`,
    topRatedMovies:`${baseUrl}/movie/top_rated?api_key=${key}`,
    nowPlayingMovies:`${baseUrl}/movie/now_playing?api_key=${key}`,

    //anime keyword
    animeMovies:`${baseUrl}/discover/movie?api_key=${key}&with_keywords=210024|222243`,
    
    // tv endpoints

    netflix:`${baseUrl}/discover/tv?api_key=${key}&with_networks=213`,
    amazon:`${baseUrl}/discover/tv?api_key=${key}&with_networks=1024`,
    disneyPlus:`${baseUrl}/discover/tv?api_key=${key}&with_networks=2739`,
    hulu:`${baseUrl}/discover/tv?api_key=${key}&with_networks=453`,
    appleTv:`${baseUrl}/discover/tv?api_key=${key}&with_networks=2552`,
    hbo:`${baseUrl}/discover/tv?api_key=${key}&with_networks=49`,
    paramountPlus:`${baseUrl}/discover/tv?api_key=${key}&with_networks=4330`,
    peacock:`${baseUrl}/discover/tv?api_key=${key}&with_networks=3353`,
    topRatedTvShows:`${baseUrl}/tv/top_rated?api_key=${key}&region=US`,
    //anime keyword
    anime:`${baseUrl}/discover/tv?api_key=${key}&with_keywords=210024|222243`,
}



export default endpoint