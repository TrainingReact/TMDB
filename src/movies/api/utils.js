import { useEffect, useState } from "react";
import Carousel from "../../genericComponents/Carousel";

/**
 * getData function take data and add genre
 * @async
 * @param {string} data
 * @param {string} genres
 * @returns {array}
 */
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

/**
 * getSingleData function take data from a given url
 * @async
 * @param {string} data
 * @returns {object}
 */
export async function getSingleData(data) {
  try {
    let movieData = await fetch(data);
    movieData = await movieData.json();
    return movieData;
  } catch (error) {
    console.log("Something went wrong:   ", error);
  }
}

/**
 * dataSettingForCarousel function adds index for carousel (see ActionsButtons in GenericComponent for more details)
 * @param {array} data
 * @returns {object}
 */
export function dataSettingForCarousel(data) {
  let arrayModifiedForCarousel = data.map((elem) => {
    return {
      ...elem,
      index: data.indexOf(elem),
    };
  });
  return arrayModifiedForCarousel;
}

/**
 * joinGenreinData function allows to join name genre with id genre data film
 * @param {object} data
 * @returns {object}
 */
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

/**
 * sizeObj function is necessary to know the number of objects in movie's genres_id array dimension
 * @param {object} obj
 * @returns integer
 */
export function sizeObj(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}

/**
 * DataCategoryForCarousel component allows to manage the carousel view in case of different urls
 * @param {url(string), genres(string), key(integer), title(string)} props
 * @param {string} props.movie - movie url
 * @param {string} props.genre - genre url
 * @param {string} props.title - movie title
 * @returns
 */
export function DataCategoryForCarousel(props) {
  const { movie: url, genre: genres, title: title } = props;
  const [dataState, setDataState] = useState([]);
  useEffect(() => {
    const result = getData(url, genres);
    result
      .then((elem) => {
        setDataState(elem);
      })
      .catch((error) => {
        console.log("Something went wrong:   ", error);
      });
  }, [url, genres]);
  return !!dataState.length ? (
    <span>
      <div className="titleCategory">
        <h3>{title}</h3>
      </div>
      <hr></hr>
      <Carousel data={dataState} />
    </span>
  ) : null;
}

/**
 * ManageDynamicUrlForCarousel component manages an urls array to allow to show data in carousel
 * @param {array} props.arrayUrl - a collection of urls in which every url returns movie of a certain genre
 * @param {string} props.genreUrl - genre url
 * @returns
 */
export function ManageDynamicUrlForCarousel(props) {
  const { arrayUrl: arrayUrls, genreUrl: genreUrl } = props;
  const items = Object.entries(arrayUrls).map(([key, value]) => {
    return (
      <span key={key}>
        <DataCategoryForCarousel ident={key} movie={value.url} genre={genreUrl} title={value.name} />
      </span>
    );
  });
  return <span>{items}</span>;
}

/**
 * findMyLocation function helps to understand in which path you are when you refresh your page.
 * It is usefull to avoid to change className from a generic page to home in case of refresh.
 * @returns {string}
 */
export function findMyLocation() {
  let actualValue;
  switch (window.location.pathname) {
    case "/film":
      actualValue = "film";
      break;
    case "/tvshows":
      actualValue = "tvshows";
      break;
    case "/TVShows":
      actualValue = "tvshows";
      break;
    default:
      actualValue = "home";
      break;
  }
  return actualValue;
}
