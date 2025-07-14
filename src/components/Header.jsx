import React from 'react';
import { SiThemoviedatabase} from "react-icons/si";
import {NavLink, Link} from 'react-router-dom'

const Header = () => {
    const activeStyle = {color:'#6b8e23'};
    return (
        <header className='header'>
            <h1 className='logo'><Link to="/"><SiThemoviedatabase /></Link></h1>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" style={({isActive})=>(isActive? activeStyle : undefined)}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/comedy" style={({isActive})=>(isActive? activeStyle : undefined)}>Comedy</NavLink>
                    </li>
                    <li>
                        <NavLink to='/drama' style={({isActive})=>(isActive? activeStyle : undefined)}>Drama</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;