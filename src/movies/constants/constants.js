/**
 * put here your movieDB API key
 * @example "api_key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
 * @constant
 * @type {string}
 */
export const api_key = "api_key=f1789e999f6985421e42f9a8de9c434c";

//HOME PAGE//

/**
 * Get Latest Url Movie
 * @constant
 * @type {string}
 */
export const getLatestMovieUrl = "https://api.themoviedb.org/3/movie/latest?" + api_key + "&language=en-US";

/**
 * Top Rated Url Movie
 * @constant
 * @type {string}
 */
export const topRatedMovieUrl = "https://api.themoviedb.org/3/movie/top_rated?" + api_key + "&language=en-US&page=1";

/**
 * Top Rated Url TV Shows
 * @constant
 * @type {string}
 */
export const topRatedTVShowsUrl = "https://api.themoviedb.org/3/tv/top_rated?" + api_key + "&language=en-US&page=1";

/**
 * Genres url
 * @constant
 * @type {string}
 */
export const genreUrl = "https://api.themoviedb.org/3/genre/movie/list?" + api_key + "&language=en-US";

//FILM PAGE//

/**
 * Popular Movie url
 * @constant
 * @type {string}
 */
export const popularUrl = "https://api.themoviedb.org/3/movie/popular?" + api_key + "&language=en-US&page=1";

/**
 * Search film url by genre (you have to add the genre id)
 * @constant
 * @type {string}
 */
export const searchFilmUrl =
  "https://api.themoviedb.org/3/discover/movie?" +
  api_key +
  "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&vote_average.gte=6&with_genres=";

//TVSHOWS PAGE //

/**
 * Popular tv shows url
 * @constant
 * @type {string}
 */
export const getPopularTVSUrl = "https://api.themoviedb.org/3/tv/popular?" + api_key + "&language=en-US&page=1";

/**
 * Search tv shows url by genre (you have to add the genre id)
 * @constant
 * @type {string}
 */
export const searchTVSUrl = "http://api.themoviedb.org/3/discover/tv?" + api_key + "&sort_by=popularity.desc&with_genres=";
