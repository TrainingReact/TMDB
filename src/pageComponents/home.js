import { topRatedMovieUrl, topRatedTVShowsUrl, genreUrl } from "../movies/constants/constants";
import React, { useEffect, useState } from "react";
import getData from "../movies/api/utils";
import ActionsButtons from "../genericComponents/Carousel";

export default function Home() {
  const [respTopRatedMovie, setRespTopRatedMovie] = useState([]);
  const [respTopRatedTVShows, setRespTopRatedTVShows] = useState([]);
  //top rated movie
  SetDataToState({ f: setRespTopRatedMovie, movie: topRatedMovieUrl, genre: genreUrl });
  //top rated tv series
  SetDataToState({ f: setRespTopRatedTVShows, movie: topRatedTVShowsUrl, genre: genreUrl });

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

export function SetDataToState(props) {
  const url = props.movie;
  const genres = props.genre;
  const setState = props.f;
  useEffect(() => {
    const result = getData(url, genres);
    result
      .then((elem) => {
        setState(elem);
      })
      .catch((error) => {
        console.log("Something went wrong:   ", error);
      });
  }, [url, genres, setState]);
}
