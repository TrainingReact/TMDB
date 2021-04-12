import React, { useState, useCallback, useRef } from "react";
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
