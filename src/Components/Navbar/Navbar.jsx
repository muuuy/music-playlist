import React, { useState } from "react";
import styles from './Navbar.module.css';
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import axios from "axios";
import { navList } from './NavbarData';

// function ButtonLink({ to, children }) {
//       return <Link to={to}><button>{children}</button></Link>
// }



const Navbar = () => {
    const navigate = useNavigate();
    const currLoc = useLocation();

    const [searchInput, setSearchInput] = useState("");
    const [searchType, setSearchType] = useState("song");

    const generateNav = () => {
      navList.map((e) => {
        let currName = e.name.toLowerCase();

        return (
            <NavLink to={`/${currName}`}>
              <li className={currLoc === `/${currName}` ? `${styles.nav_item} ${styles.active}` : styles.nav_item}>
                <FaMusic /> Library
              </li>
            </NavLink>
          );
      })
    }

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
        <div id={styles.main_container}>
            <nav id={styles.nav_container}>
                <a className={styles.logo} href="/">MusicPlaylists</a>
                <ul className={styles.nav_menu}>
                  <NavLink to="/" className={styles.library}><li className={styles.nav_item}><FaHome /> Home</li></NavLink>
                  <NavLink to="/library"><li className={styles.nav_item}><FaMusic /> Library</li></NavLink>
                  <NavLink to="/"><li className={styles.nav_item}><FaCompass /> Explore</li></NavLink>
                </ul>
                <div className={styles.search}>
                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder="&#x1F50D; Search" name="search_box" id={styles.search_bar} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                        <select name="search_type" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                            <option value="song">Song</option>
                            <option value="artist">Artist</option>
                        </select>
                        <button type="submit">Go</button>
                        {/* <ButtonLink to="/results_by_song">Go</ButtonLink> */}
                    </form>
                </div>
                <ul className={styles.sign}>
                  <NavLink to="/login">
                    <button>Sign In</button>
                  </NavLink>
                  <NavLink to="/signup">
                    <button>Sign Up</button>
                  </NavLink>
                </ul>
                <div className={styles.toggle_button} onClick={toggleDropdown}><FaBars /></div>
            </nav>

            <nav className={`${styles.dropdown_menu} ${isDropdownActive ? styles.active : ''}`}>
                <ul>
                    <li id={styles.nav_item}><NavLink to="/"><FaHome /> Home</NavLink></li>
                    <li id={styles.nav_item}><NavLink to="/library"><FaMusic /> Library</NavLink></li>
                    <li id={styles.nav_item}><NavLink to="#"><FaCompass /> Explore</NavLink></li>
                    <NavLink to="/login">
                      <button id={styles.sign_in__button}>Sign In</button>
                    </NavLink>
                    <NavLink to="/signup">
                      <button id={styles.sign_in__button}>Sign Up</button>
                    </NavLink>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;