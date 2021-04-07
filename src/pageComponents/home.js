import { topRatedMovieUrl, topRatedTVShowsUrl, genreUrl } from "../movies/constants/constants";
import React, { useState } from "react";
import getData, { SetDataToState } from "../movies/api/utils";
import ActionsButtons from "../genericComponents/Carousel";

export default function Home() {
  const [respTopRatedMovie, setRespTopRatedMovie] = useState([]);
  const [respTopRatedTVShows, setRespTopRatedTVShows] = useState([]);

  return (
    <main>
      <h1>Top Rated Movie</h1>
      <hr></hr>
      <SetDataToState f= {setRespTopRatedMovie} movie= {topRatedMovieUrl} genre =  {genreUrl} />
      <ActionsButtons data={respTopRatedMovie} />

      <h1>Top Rated TV Series</h1>
      <hr></hr>
      <SetDataToState f= {setRespTopRatedTVShows} movie= {topRatedTVShowsUrl} genre =  {genreUrl} />
      <ActionsButtons data={respTopRatedTVShows} />
    </main>
  );
}
