import { topRatedMovieUrl, topRatedTVShowsUrl, genreUrl } from "../movies/constants/constants";
import React, { useState, useEffect } from "react";
import { useDataToState } from "../movies/api/utils";
import ActionsButtons, { useModal, Modal } from "../genericComponents/Carousel";

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
        <ActionsButtons data={respTopRatedMovie} />
        <div className="titleCategory">
          <h3>Top Rated TV Series</h3>
        </div>
        <hr></hr>
        <ActionsButtons data={respTopRatedTVShows} />
      </div>
    </main>
  );
}

/**
 * The RandomMovie component returns a movie randomly chosen for the Home Page image
 * @returns
 */
export function RandomMovie() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [exists, setExists] = useState(false);
  const { isShowing, toggle } = useModal();
  const respRandomMovie = useDataToState({ movie: topRatedMovieUrl, genre: genreUrl });

  useEffect(() => {
    const randomElement = respRandomMovie[Math.floor(Math.random() * respRandomMovie.length)];
    if (randomElement !== undefined) {
      setUrl("https://image.tmdb.org/t/p/w500/" + randomElement.backdrop_path);
      setData(randomElement);
      setExists(true);
    }
  }, [respRandomMovie]);
  return exists ? (
    <div className="randomHighlightedContainer">
      <Modal isShowing={isShowing} hide={toggle} data={data} />
      <div className="resizeHighlightedImg">
        <img src={url} className="imgHighlighted" onClick={toggle} />
      </div>
      <div className="titleHighlightedContainer">
        <span className="titleHighlighted">
          {data.title}
          <hr className="hrHighlighted" />
          Last Movie
        </span>
      </div>
    </div>
  ) : null;
}
