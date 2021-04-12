import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../pageComponents/Home";
import Film from "../pageComponents/Film";
import TVShows from "../pageComponents/TVShows";
import logo from "../images/lg.png";

/**
 * Menu management component and routing management
 * @returns
 */
export default function Menu() {
  const [isSelected, setIsSelected] = useState({ home: true });
  const visited = (key) => setIsSelected({ [key]: true });
  const styleClass = useCallback((key) => (!!isSelected[key] ? "menuItemVisited" : "menuItem"), [isSelected]);
  const home = "home";
  const film = "film";
  const tvshows = "tvshows";
  return (
    <Router>
      <div className="menuBar">
        <nav>
          <ul className="headerContainer menuContainer">
            <li className="liMenu">
              <Link to="/" name={home}>
                <img className="immagineLogo" src={logo} alt="logo di ReactJS" title="logo di ReactJS" aria-labelledby="logo ReactJS" />
              </Link>
            </li>
            <li className="liMenu">
              <Link className={styleClass(home)} onClick={() => visited(home)} to="/" name={home}>
                Home
              </Link>
            </li>
            <li className="liMenu">
              <Link className={styleClass(film)} onClick={() => visited(film)} to="/Film" name={film}>
                Film
              </Link>
            </li>
            <li className="liMenu">
              <Link className={styleClass(tvshows)} onClick={() => visited(tvshows)} to="/TVShows" name={tvshows}>
                TV Show
              </Link>
            </li>
            <li className="liMenu"></li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Film">
          <Film />
        </Route>
        <Route exact path="/TVShows">
          <TVShows />
        </Route>
      </Switch>
    </Router>
  );
}

/**
 * This function prepares data for the film detail after the film selection on carousel
 * @param {Promise} data.resultTopRated
 * @param {Promise} data.resultMovieGenre
 * @param {function} setState
 */
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
      console.log("Something went wrong:   ", error);
    });
}

/**
 * add index for carousel (see ActionsButtons in GenericComponent for more details)
 * @param {array} props
 * @returns
 */
export function DataSettingForCarousel(props) {
  let arrayModifiedForCarousel = props.map((elem) => {
    return {
      ...elem,
      index: props.indexOf(elem),
    };
  });
  return arrayModifiedForCarousel;
}

//
/**
 * This function allows to join name genre with id genre data film
 * @param {object} data
 * @returns
 */
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

/**
 * This function is necessary to know the number of objects in movie's genres_id array dimension
 * @param {object} obj
 * @returns
 */
export function SizeObj(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}
