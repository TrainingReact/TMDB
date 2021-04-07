import { popularUrl, genreUrl, searchFilmUrl } from "../movies/constants/constants";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import getData, { dataSettingForCarousel, getSingleData, SetDataToState, sizeObj } from "../movies/api/utils";
import ActionsButtons from "../genericComponents/Carousel";

export default function Film() {
  const [respPopularMovie, setRespPopularMovie] = useState([]);
  const [urlConstructor, setUrlConstractor] = useState([]);
  const [urlState, setUrlState] = useState([]);
  /* UrlConstructorToSearchFilmFromGenres(setUrlConstractor);
  urlConstructor.forEach((el) => {
    const result = getSingleData(el);
    result
      .then((elem) => {
        Prova(elem.results);
      })
      .catch((error) => {
        console.log("Something went wrong:   ", error);
      });
  }); */

  return (
    <main>
      <h1>Get Popular</h1>
      <hr></hr>
      <SetDataToState f= {setRespPopularMovie} movie= {popularUrl} genre =  {genreUrl} />
      <ActionsButtons data={respPopularMovie} />
      {/* <ActionsButtons data={elem.results} />; */}
    </main>
  );
}
export function Prova(props) {
  console.log(props.res);
  return 0;
}
export function UrlConstructorToSearchFilmFromGenres(props) {
  let urlArray = [];
  useEffect(() => {
    const getGenre = getSingleData(genreUrl);
    getGenre.then((resp) => {
      for (let i = 0; i < sizeObj(resp.genres); i++) {
        urlArray.push(searchFilmUrl + resp.genres[i].id);
      }
      props(urlArray);
    });
  }, [props]);
}
