import React, { useEffect } from "react";

//Take movie and add genre
export default async function getData(data, genres) {
  try {
    let movieData = await fetch(data);
    movieData = await movieData.json();
    let genre = await fetch(genres);
    genre = await genre.json();
    const newDataWithGenreAdd = joinGenreinData({
      genre: genre,
      data: movieData,
    });
    const dataReadyTVSForGenres = dataSettingForCarousel(newDataWithGenreAdd);
    return dataReadyTVSForGenres;
  } catch (error) {
    console.log("Something went wrong:   ", error);
  }
}

//add index for carousel (see ActionsButtons in GenericComponent for more details)
export function dataSettingForCarousel(data) {
  let arrayModifiedForCarousel = data.map((elem) => {
    return {
      ...elem,
      index: data.indexOf(elem),
    };
  });
  return arrayModifiedForCarousel;
}

//this function allows to join name genre with id genre data film
export function joinGenreinData(data) {
  let genreResponse = Object.values(data.genre);
  let genreArrayTrasform = [];
  genreResponse.forEach(function (el) {
    genreArrayTrasform = Object.values(el);
  });

  //copy top rated data parameter to manipulate it with array functions
  let takeResults = data.data.results;

  //for each film we want to associate the movie's genre_ids with the genre's name.
  //NB. Each film could have more genres to show. This code manage this situation.
  takeResults.forEach(function (item) {
    let result = [];
    for (let w = 0; w < sizeObj(item.genre_ids); w++) {
      result[w] = genreArrayTrasform.filter(function (genElem) {
        return genElem.id === item.genre_ids[w];
      });
    }

    //now genres is added
    let createCompositionOfGenres = [];
    for (let w = 0; w < sizeObj(item.genre_ids); w++) {
      createCompositionOfGenres.push(result[w].length !== 0 && result[w][0] !== undefined ? result[w][0].name + "  " : " ");
    }
    item.genres = createCompositionOfGenres;
  });
  return takeResults;
}

//this function is necessary to know the number of objects in movie's genres_id array dimension
export function sizeObj(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
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
  return "";
}
