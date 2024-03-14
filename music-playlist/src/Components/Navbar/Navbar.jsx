import React, { useState } from "react";
import './Navbar.css';
import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

// function ButtonLink({ to, children }) {
//       return <Link to={to}><button>{children}</button></Link>
// }

const Navbar = () => {
    
    const [isDropdownActive, setDropdownActive] = useState(false);

    const toggleDropdown = () => {
        setDropdownActive(!isDropdownActive);
    };

    return (
        <div>            
            <nav id='nav-container'>
                <Link className="logo" to="/">MusicPlaylists</Link>
                <ul className="nav-menu">
                    {/* <li className="toggle-button"><FaBars /></li> */}
                    <li id ="nav-item"><Link to="/home"><FaHome /> Home</Link></li>
                    <li id="nav-item"><Link to="#"><FaMusic /> Library</Link></li>
                    <li id='nav-item'><Link to="#"><FaCompass /> Explore</Link></li>
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
                    <button id='sign-in__button'><Link to="/signin">Sign In</Link></button>
                    <button><Link to="/signup">Sign Up</Link></button>
                </ul>
                <div className="toggle-button" onClick={toggleDropdown}><FaBars /></div>
            </nav>

            <nav className={`dropdown-menu ${isDropdownActive ? 'active' : ''}`}>
                <ul>
                    <li id="nav-item"><Link to="/home"><FaHome /> Home</Link></li>
                    <li id="nav-item"><Link to="#"><FaMusic /> Library</Link></li>
                    <li id='nav-item'><Link to="#"><FaCompass /> Explore</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;