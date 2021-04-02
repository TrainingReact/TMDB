import { topRatedMovieUrl, topRatedTVShowsUrl, genreUrl } from "../movies/constants/Constants";
import React, { useEffect, useState } from "react";
import TopRatedMovie from "../movies/api/GetTopRated";
import ActionsButtons from "../genericComponents/Carousel";

export default function Home() {
  const [respTopRatedMovie, setRespTopRatedMovie] = useState([]);
  const [respTopRatedTVShows, setResprespTopRatedTVShows] = useState([]);

  //top rated movie
  useEffect(() => {
    const resultTopRatedMovie = TopRatedMovie(topRatedMovieUrl);
    const resultMovieGenre = TopRatedMovie(genreUrl);
    DataSettingForCarouselFilmDetail(
      {
        resultTopRated: resultTopRatedMovie,
        resultMovieGenre: resultMovieGenre,
      },
      setRespTopRatedMovie
    );
  }, []);

  //top rated tv series
  useEffect(() => {
    const resultTopRatedTVS = TopRatedMovie(topRatedTVShowsUrl);
    const resultMovieGenre = TopRatedMovie(genreUrl);
    DataSettingForCarouselFilmDetail({ resultTopRated: resultTopRatedTVS, resultMovieGenre: resultMovieGenre }, setResprespTopRatedTVShows);
  }, []);

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

//this function prepares data for the film detail after the film selection on carousel
export function DataSettingForCarouselFilmDetail(data, setState) {
  data.resultTopRated
    .then((TRTVSresponse) => {
      data.resultMovieGenre.then((genResponse) => {
        const newDataWithGenreAdd = JoinGenreinData({
          genre: genResponse,
          topRated: TRTVSresponse,
        });
        const dataReadyTVSForGenres = DataSettingForCarousel(newDataWithGenreAdd);
        setState(dataReadyTVSForGenres);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

//add index for carousel (see ActionsButtons in GenericComponent for more details)
export function DataSettingForCarousel(props) {
  let arrayModifiedForCarousel = props.map((elem) => {
    return {
      ...elem,
      index: props.indexOf(elem),
    };
  });
  return arrayModifiedForCarousel;
}

//this function allows to join name genre with id genre data film
export function JoinGenreinData(data) {
  let genreResponse = Object.values(data.genre);
  let genreArrayTrasform = [];
  genreResponse.forEach(function (el) {
    genreArrayTrasform = Object.values(el);
  });

  //copy top rated data parameter to manipulate it with array functions
  let respTopRatedTVShowsCopy = data.topRated.results;

  //for each film we want to associate the movie's genre_ids with the genre's name.
  //NB. Each film could have more genres to show. This code manage this situation.
  respTopRatedTVShowsCopy.forEach(function (itemtvs) {
    let result = [];
    for (let w = 0; w < SizeObj(itemtvs.genre_ids); w++) {
      result[w] = genreArrayTrasform.filter(function (genElem) {
        return genElem.id === itemtvs.genre_ids[w];
      });
    }

    //now genres is added
    let createCompositionOfGenres = [];
    for (let w = 0; w < SizeObj(itemtvs.genre_ids); w++) {
      createCompositionOfGenres.push(result[w].length !== 0 && result[w][0] !== undefined ? result[w][0].name + "  " : " ");
    }
    itemtvs.genres = createCompositionOfGenres;
  });
  return respTopRatedTVShowsCopy;
}

//this function is necessary to know the number of objects in movie's genres_id array dimension
export function SizeObj(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}
