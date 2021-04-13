import { topRatedMovieUrl, genreUrl } from "../movies/constants/constants";
import Modal from "../genericComponents/Modal";
import useModal, { useDataToState } from "../genericComponents/PersonalizedHooks";
import React, { useState, useEffect } from "react";
/**
 * The RandomMovie component returns a movie randomly chosen for the Home Page image ( because last movie API missing images)
 * @returns
 */
export default function RandomMovie() {
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
        <img
          src={url}
          className="imgHighlighted"
          alt={"Film in evidenza: " + data.title}
          title={"Film in evidenza: " + data.title}
          aria-labelledby={"Film in evidenza: " + data.title}
          onClick={toggle}
        />
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
