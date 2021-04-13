import { useState, useEffect } from "react";
import getData, { getSingleData, sizeObj } from "../movies/api/utils";
/**
 * useModal is a personalized hook for popup details, it allows the showing popup
 * @returns
 */
export default function useModal() {
  const [isShowing, setIsShowing] = useState(false);
  function toggle() {
    setIsShowing(!isShowing);
  }
  return {
    isShowing,
    toggle,
  };
}

/**
 * useConstructArrayForDynamicUrls personalized hook. It takes in input urls and it returns an url array
 * @param {object} urlList
 * @returns {array}
 */
export function useConstructArrayForDynamicUrls(urlList) {
  const genreUrl = urlList.genre;
  const searchFilmUrl = urlList.searchFilm;
  const [data, setData] = useState([]);
  let urlArray = [];
  useEffect(() => {
    const getGenre = getSingleData(genreUrl);
    getGenre.then((resp) => {
      for (let i = 0; i < sizeObj(resp.genres); i++) {
        urlArray.push({ url: searchFilmUrl + resp.genres[i].id, name: resp.genres[i].name });
      }
      setData(urlArray);
    });
  }, [genreUrl, searchFilmUrl, setData]);
  return data;
}

/**
 * useDataToState personalized hook. It takes in input urls and it returns data
 * @param {object} urlList
 * @returns {array}
 */
export function useDataToState(urlList) {
  const movie = urlList.movie;
  const genre = urlList.genre;
  const [data, setData] = useState([]);
  useEffect(() => {
    const result = getData(movie, genre);
    result
      .then((elem) => {
        setData(elem);
      })
      .catch((error) => {
        console.log("Something went wrong:   ", error);
      });
  }, [genre, movie]);
  return data;
}
