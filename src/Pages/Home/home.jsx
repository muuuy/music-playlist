import React, { useState } from "react";
import './home.css';
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { FaHome } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

// function ButtonLink({ to, children }) {
//       return <Link to={to}><button>{children}</button></Link>
// }

const Home = () => {

    const [isDropdownActive, setDropdownActive] = useState(false);

    const toggleDropdown = () => {
        setDropdownActive(!isDropdownActive);
    };

    return (
        <div>
            <Helmet>
                <title>Home | MusicPlaylists</title>
            </Helmet>
            <nav id='nav-container'>
                <a className="logo" href="/">MusicPlaylists</a>
                <ul className="nav-menu">
                    {/* <li className="toggle-button"><FaBars /></li> */}
                    <li id ="nav-item"><a href="#"><FaHome /> Home</a></li>
                    <li id="nav-item"><a href="#"><FaMusic /> Library</a></li>
                    <li id='nav-item'><a href="#"><FaCompass /> Explore</a></li>
                </ul>
                <div className="search">
                    <form>
                        <input type="text" placeholder="&#x1F50D; Search" name="search_box"/>
                        <select name="search_type">
                            <option value="song">Song</option>
                            <option value="artist">Artist</option>
                        </select>
                        {/* <ButtonLink to="/results_by_song">Go</ButtonLink> */}
                    </form>
                </div>
                <ul className="sign">
                    <button id='sign-in__button'><a href="#">Sign In</a></button>
                    <button><a href="#">Sign Up</a></button>
                </ul>
                <div className="toggle-button" onClick={toggleDropdown}><FaBars /></div>
            </nav>

            <nav className={`dropdown-menu ${isDropdownActive ? 'active' : ''}`}>
                <ul>
                    <li id="nav-item"><a href="/"><FaHome /> Home</a></li>
                    <li id="nav-item"><a href="#"><FaMusic /> Library</a></li>
                    <li id='nav-item'><a href="#"><FaCompass /> Explore</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;
