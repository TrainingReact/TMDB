import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../pageComponents/Home";
import Film from "../pageComponents/Film";
import TVShows from "../pageComponents/TVShows";
import logo from "../images/lg.png";
import { findMyLocation } from "../movies/api/utils";

/**
 * Menu management component and routing management
 * @returns
 */
export default function Menu() {
  const location = findMyLocation();
  const [isSelected, setIsSelected] = useState({ [location]: true });
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
              <Link className={styleClass(film)} onClick={() => visited(film)} to="/film" name={film} onLoad={() => visited(film)}>
                Film
              </Link>
            </li>
            <li className="liMenu">
              <Link className={styleClass(tvshows)} onClick={() => visited(tvshows)} to="/tvshows" name={tvshows}>
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
        <Route exact path="/film">
          <Film />
        </Route>
        <Route exact path="/tvshows">
          <TVShows />
        </Route>
      </Switch>
    </Router>
  );
}
