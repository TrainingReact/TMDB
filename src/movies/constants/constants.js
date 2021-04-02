export const api_key = "api_key=f1789e999f6985421e42f9a8de9c434c";

//HOME PAGE//

//Top Rated Url Movie
export const topRatedMovieUrl = "https://api.themoviedb.org/3/movie/top_rated?" + api_key + "&language=en-US&page=1";
//Top Rated Url TV Shows
export const topRatedTVShowsUrl = "https://api.themoviedb.org/3/tv/top_rated?" + api_key + "&language=en-US&page=1";
//Genres
export const genreUrl = "https://api.themoviedb.org/3/genre/movie/list?" + api_key + "&language=en-US";

//FILM PAGE//

export const popularUrl = "https://api.themoviedb.org/3/movie/popular?" + api_key + "&language=en-US&page=1";
export const allFilmUrl = "https://api.themoviedb.org/3/discover/movie?" + api_key + "&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1";

export const searcFilmUrl =
  "https://api.themoviedb.org/3/discover/movie?api_key=f1789e999f6985421e42f9a8de9c434c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&vote_average.gte=6&with_genres=";
