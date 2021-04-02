import React, { useState, useRef } from "react";
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
  const [isSelected, setIsSelected] = useState({ home: true });
  const refItem1 = useRef("menuItem");
  const refItem2 = useRef("menuItem");
  const refItem3 = useRef("menuItem");
  //the function change class to underline the menu item selected
  const visited = (ref) => {
    refItem1.current.className = "menuItem";
    refItem2.current.className = "menuItem";
    refItem3.current.className = "menuItem";
    let classe = ref.current;
    if (classe == "menuItem") {
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
