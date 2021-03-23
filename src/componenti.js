import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


export default function Menu() {
    return (
        <Router>
            <div>
                <ul className='menuContainer'>
                    <li className='menuItem'><Link to="/">Home</Link></li>
                    <li className='menuItem'>Film</li>
                    <li className='menuItem'>Serie TV</li>
                </ul>
                <Switch>
                   
                </Switch>
            </div>
        </Router>
    );
}