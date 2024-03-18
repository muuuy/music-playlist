import React, { useState } from "react";
import './Navbar.css';
import { NavLink, useNavigate } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import axios from "axios";

// function ButtonLink({ to, children }) {
//       return <Link to={to}><button>{children}</button></Link>
// }



const Navbar = () => {
    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState("");
    const [searchType, setSearchType] = useState("song");

    const handleSearch = (e) => {
        e.preventDefault();
    
        console.log('Form submitted')
      
        // Update the state only when the form is submitted
        setSearchInput(e.target.elements.search_box.value);
        setSearchType(e.target.elements.search_type.value);

        console.log('!!!', searchInput)
      
        // Connect to Flask
        axios.post('http://localhost:5000/user_search', {
          search_box: searchInput,
          search_type: searchType
        })
        .then(response => {
          console.log(response.data);
          // Navigate to specific results page depending on search type
          if (searchType === 'song') {
            navigate("/results_by_song", { state: { songResults : response.data }});
          }
          else if (searchType === 'artist') {
            navigate("/results_by_artist", { state: { artistResults: response.data }});
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      };

    const [isDropdownActive, setDropdownActive] = useState(false);

    const toggleDropdown = () => {
        setDropdownActive(!isDropdownActive);
    };

    return (
        <div>
            <nav id='nav-container'>
                <a className="logo" href="/">MusicPlaylists</a>
                <ul className="nav-menu">
                    <li className="nav-item"><NavLink to="/"><FaHome /> Home</NavLink></li>
                    <li className="nav-item"><NavLink to="/library"><FaMusic /> Library</NavLink></li>
                    <li className='nav-item'><NavLink to="/"><FaCompass /> Explore</NavLink></li>
                </ul>
                <div className="search">
                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder="&#x1F50D; Search" name="search_box" id="search-bar" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                        <select name="search_type" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                            <option value="song">Song</option>
                            <option value="artist">Artist</option>
                        </select>
                        <button type="submit">Go</button>
                        {/* <ButtonLink to="/results_by_song">Go</ButtonLink> */}
                    </form>
                </div>
                <ul className="sign">
                  <NavLink to="/login">
                    <button><a href="/login">Sign In</a></button>
                  </NavLink>
                  <NavLink to="/signup">
                    <button><a href="/signup">Sign Up</a></button>
                  </NavLink>
                </ul>
                <div className="toggle-button" onClick={toggleDropdown}><FaBars /></div>
            </nav>

            <nav className={`dropdown-menu ${isDropdownActive ? 'active' : ''}`}>
                <ul>
                    <li id="nav-item"><NavLink to="/"><FaHome /> Home</NavLink></li>
                    <li id="nav-item"><NavLink to="/library"><FaMusic /> Library</NavLink></li>
                    <li id='nav-item'><NavLink to="#"><FaCompass /> Explore</NavLink></li>
                    <NavLink to="/login">
                      <button id='sign-in__button'><a href="/login">Sign In</a></button>
                    </NavLink>
                    <NavLink to="/signup">
                      <button id="sign-in__button"><a href="/signup">Sign Up</a></button>
                    </NavLink>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;