import React, { useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../pageComponents/Home";
import Film from "../pageComponents/Film";
import Serietv from "../pageComponents/Tvseries";
import logo from "../images/lg.png";

//page structure component
export default function PageStructure() {
  return (
    <div>
      <UpperHeader />
      <Menu />
    </div>
  );
}

//header bar elements component (now it is empty but you could use it to add social icons)
export function UpperHeader() {
  return <div className="logo"></div>;
}

//menu management component and routing management
export function Menu() {
  const refItem1 = useRef("menuItem");
  const refItem2 = useRef("menuItem");
  const refItem3 = useRef("menuItem");
  //the function change class to underline the menu item selected
  const visited = (ref) => {
    refItem1.current.className = "menuItem";
    refItem2.current.className = "menuItem";
    refItem3.current.className = "menuItem";
    let classe = ref.current;
    if (classe === "menuItem") {
      classe.className = "menuItemVisited";
    } else {
      classe.className = "menuItemVisited";
    }
  };

  return (
    <Router>
      <div className="menuBar">
        <nav>
          <ul className="headerContainer menuContainer">
            <li className="liMenu">
              <Link to="/" name="home">
                <img className="immagineLogo" src={logo} alt="logo di ReactJS" title="logo di ReactJS" aria-labelledby="logo ReactJS" />
              </Link>
            </li>
            <li className="liMenu">
              <Link className="menuItem" ref={refItem1} onClick={() => visited(refItem1)} to="/" name="home">
                Home
              </Link>
            </li>
            <li className="liMenu">
              <Link className="menuItem" ref={refItem2} onClick={() => visited(refItem2)} to="/film" name="film">
                Film
              </Link>
            </li>
            <li className="liMenu">
              <Link className="menuItem" ref={refItem3} onClick={() => visited(refItem3)} to="/serieTV" name="serieTV">
                Serie TV
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
        <Route exact path="/film">
          <Film />
        </Route>
        <Route exact path="/serieTV">
          <Serietv />
        </Route>
      </Switch>
    </Router>
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
