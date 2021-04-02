import { topRatedMovieUrl, topRatedTVShowsUrl, genreUrl } from "../movies/constants/Constants";
import React, { useEffect, useState } from "react";
import FetchMovie from "../movies/api/GetTopRated";
import ActionsButtons from "../genericComponents/Carousel";
import { DataSettingForCarouselFilmDetail } from "../genericComponents/Components";

export default function Home() {
  const [respTopRatedMovie, setRespTopRatedMovie] = useState([]);
  const [respTopRatedTVShows, setResprespTopRatedTVShows] = useState([]);

  //top rated movie
  useEffect(() => {
    const resultTopRatedMovie = FetchMovie(topRatedMovieUrl);
    const resultMovieGenre = FetchMovie(genreUrl);
    DataSettingForCarouselFilmDetail(
      {
        resultTopRated: resultTopRatedMovie,
        resultMovieGenre: resultMovieGenre,
      },
      setRespTopRatedMovie
    );
  }, []);

  //top rated tv series
  useEffect(() => {
    const resultTopRatedTVS = FetchMovie(topRatedTVShowsUrl);
    const resultMovieGenre = FetchMovie(genreUrl);
    DataSettingForCarouselFilmDetail({ resultTopRated: resultTopRatedTVS, resultMovieGenre: resultMovieGenre }, setResprespTopRatedTVShows);
  }, []);

  return (
    <main>
      <h1>Top Rated Movie</h1>
      <hr></hr>
      <ActionsButtons data={respTopRatedMovie} />

      <h1>Top Rated TV Series</h1>
      <hr></hr>
      <ActionsButtons data={respTopRatedTVShows} />
    </main>
  );
}
