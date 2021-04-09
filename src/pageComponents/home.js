import { topRatedMovieUrl, topRatedTVShowsUrl, genreUrl, getLatestMovieUrl } from "../movies/constants/constants";
import React, { useState, useEffect } from "react";
import { useDataToState, getSingleData } from "../movies/api/utils";
import ActionsButtons, { useModal, Modal } from "../genericComponents/Carousel";

export default function Home() {
  const respTopRatedMovie = useDataToState({ movie: topRatedMovieUrl, genre: genreUrl });
  const respTopRatedTVShows = useDataToState({ movie: topRatedTVShowsUrl, genre: genreUrl });
  return (
    <main>
      <RandomMovie />
      <div className="titleCategory">
        <h3>Top Rated Movie</h3>
      </div>
      <hr></hr>
      <ActionsButtons data={respTopRatedMovie} />

      <h3>Top Rated TV Series</h3>
      <hr></hr>
      <ActionsButtons data={respTopRatedTVShows} />
    </main>
  );
}

export function RandomMovie() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const { isShowing, toggle } = useModal();
  const respRandomMovie = useDataToState({ movie: topRatedMovieUrl, genre: genreUrl });
  useEffect(() => {
    const randomElement = respRandomMovie[Math.floor(Math.random() * respRandomMovie.length)];
    if (randomElement !== undefined) {
      setUrl("https://image.tmdb.org/t/p/w500/" + randomElement.backdrop_path);
      setData(randomElement);
    } else {
      setUrl("https://www.sarras-shop.com/out/pictures/master/product/1/no-image-available-icon.jpg");
      setData("NOT AVAILABLE");
    }
  }, [respRandomMovie]);
  console.log(data);

  return (
    <div className="randomHighlightedContainer" onClick={toggle}>
      {/* <Modal isShowing={isShowing} hide={toggle} data={data} /> */}

      <div className="resizeHighlightedImg">
        <img src={url} className="imgHighlighted" />
      </div>
      <div className="titleHighlightedContainer">
        <span className="titleHighlighted">
          {data.title}
          <hr className="hrHighlighted" />
          Last Movie
        </span>
      </div>
    </div>
  );
}
