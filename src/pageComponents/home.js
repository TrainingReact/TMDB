import { topRatedMovieUrl, topRatedTVShowsUrl, genreUrl } from "../movies/constants/constants";
import React from "react";
import { useDataToState } from "../genericComponents/PersonalizedHooks";
import Carousel from "../genericComponents/Carousel";
import RandomMovie from "../genericComponents/RandomMovie";
/**
 * Home page component
 * @returns
 */
export default function Home() {
  const respTopRatedMovie = useDataToState({ movie: topRatedMovieUrl, genre: genreUrl });
  const respTopRatedTVShows = useDataToState({ movie: topRatedTVShowsUrl, genre: genreUrl });
  return (
    <main>
      <RandomMovie />
      <div className="categoryContainer">
        <div className="titleCategory">
          <h3>Top Rated Movie</h3>
        </div>
        <hr></hr>
        <Carousel data={respTopRatedMovie} />
        <div className="titleCategory">
          <h3>Top Rated TV Shows</h3>
        </div>
        <hr></hr>
        <Carousel data={respTopRatedTVShows} />
      </div>
    </main>
  );
}
