import { popularUrl, genreUrl, searcFilmUrl } from "../movies/constants/Constants";
import React, { useEffect, useState } from "react";
import FetchMovie from "../movies/api/GetTopRated";
import { DataSettingForCarouselFilmDetail, DataSettingForCarousel } from "../genericComponents/Components";
import ActionsButtons from "../genericComponents/Carousel";

export default function Film() {
  const [respPopularMovie, setRespPopularMovie] = useState([]);
  const [allMovie, setAllMovie] = useState([]);

  useEffect(() => {
    const resultPopularMovie = FetchMovie(popularUrl);
    const resultMovieGenre = FetchMovie(genreUrl);
    DataSettingForCarouselFilmDetail(
      {
        resultTopRated: resultPopularMovie,
        resultMovieGenre: resultMovieGenre,
      },
      setRespPopularMovie
    );
  }, []);

  useEffect(() => {
    let resultAllMovie = [];
    const resultMovieGenre = FetchMovie(genreUrl);
    resultMovieGenre.then((res) => {
      res.genres.forEach(function (el) {
        const urlConstructor = searcFilmUrl + el.id;
        FetchMovie(urlConstructor).then((res2) => {
          resultAllMovie.push(CategorizedGenre(res2.results, el.name));
        });
      });
    });
    console.log(resultAllMovie);
    setAllMovie(resultAllMovie);
    console.log(allMovie);
  }, []);

  return (
    <main>
      <h1>Get Popular</h1>
      <hr></hr>
      <ActionsButtons key="100" data={respPopularMovie} />
      <EachFilmForCategory item={allMovie} />
    </main>
  );
}

//this function is commented out because could be edit on tuesday
//      <EachFilmForCategory item={allMovie} />
export function EachFilmForCategory(props) {
  return (
    <div>
      {props.item.map(function (el, index) {
        <ActionsButtons key={index} data={el.item} />;
      })}
    </div>
  );
}

//the function return film categorized by genre
export function CategorizedGenre(data, nameGenre) {
  let settingData = DataSettingForCarousel(data);
  const arrayFilm = settingData.map((elem) => {
    return {
      ...elem,
      name_genre: nameGenre,
    };
  });
  return arrayFilm;
}
