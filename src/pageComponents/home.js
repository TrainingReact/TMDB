import { topRatedMovieUrl, topRatedTVShowsUrl, genreUrl } from "../movies/constants/constants";
import React, { useState } from "react";
import { useDataToState } from "../movies/api/utils";
import ActionsButtons from "../genericComponents/Carousel";

export default function Home() {
  const respTopRatedMovie = useDataToState({ movie: topRatedMovieUrl, genre: genreUrl });
  const respTopRatedTVShows = useDataToState({ movie: topRatedTVShowsUrl, genre: genreUrl });
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
