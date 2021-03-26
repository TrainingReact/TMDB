import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from '../pageComponents/Home';
import Film from '../pageComponents/Film';
import Serietv from '../pageComponents/Tvseries';
import logo from '../images/lg.png';
import TopRatedContext from "./context"


//page structure component
export default function PageStructure(props) {
    const name = useContext(TopRatedContext);
    console.log(name)
    return (
        <div>
            <UpperHeader />
            <Menu />
        </div>


    )
}

//header bar elements component (now it is empty but you could use it to add social icons)
export function UpperHeader() {
    return (
        <div className='logo'>
        </div>
    )
}



//menu management component and routing management
export function Menu(props) {
    return (

        <Router>
            <div className='menuBar'>
                <nav>
                    <ul className='headerContainer menuContainer'>
                        <li className='liMenu'><Link to="/" name='home'> <img className='immagineLogo' src={logo} alt='logo di ReactJS' title='logo di ReactJS' aria-labelledby='logo ReactJS' /></Link></li>
                        <li className='liMenu'><Link className='menuItem' to="/" name='home'> Home</Link></li>
                        <li className='liMenu'><Link className='menuItem' to="/film" name='film'>Film</Link></li>
                        <li className='liMenu'><Link className='menuItem' to="/serieTV" name='serieTV'>Serie TV</Link></li>
                        <li className='liMenu'></li>
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

