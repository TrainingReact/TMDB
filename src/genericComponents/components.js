import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from '../pageComponents/home';
import Film from '../pageComponents/film';
import Serietv from '../pageComponents/tvseries';
import logo from '../images/lg.png';


//componente che contiene gli elementi da tenere in header
export default function Header() {
    return (
        <div>
            <UpperHeader />
            <Menu />
        </div>


    )
}

//componente relativo alla barra in alto (al momento la barra è vuota)
export function UpperHeader() {
    return (
        <div className='logo'>
        </div>
    )
}



//componete che si occupa della gestione del menù e del cambio pagina
export function Menu() {
    return (

        <Router>
            <nav className='xsmall-cell'>
                <ul className='headerContainer menuContainer'>
                    <li className='liMenu'><Link to="/" name='home'> <img className='immagineLogo' src={logo} alt='logo di ReactJS' title='logo di ReactJS' aria-labelledby='logo ReactJS' /></Link></li>
                    <li className='liMenu'><Link className='menuItem' to="/" name='home'> Home</Link></li>
                    <li className='liMenu'><Link className='menuItem' to="/film" name='film'>Film</Link></li>
                    <li className='liMenu'><Link className='menuItem' to="/serieTV" name='serieTV'>Serie TV</Link></li>
                    <li className='liMenu'></li>
                </ul>
            </nav>
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

