import React, { useState } from "react";
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './home.css';
import HomeImage from "../../images/concert-orangelight.jpg";


function Home() {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("song");

  const handleSearch = (e) => {
    e.preventDefault();

    console.log('Form submitted')
  
    // Update the state only when the form is submitted
    setSearchInput(e.target.elements.search_box.value);
    setSearchType(e.target.elements.search_type.value);
  
    // Connect to Flask
    axios.post('http://localhost:5000/user_search', {
      search_box: searchInput,
      search_type: searchType
    })
    .then(response => {
      console.log(response.data);
      // Navigate to specific results page depending on search type
      if (searchType === 'song') {
        navigate("/results_by_song", { state: { songResults: response.data }});
      }
      else if (searchType === 'artist') {
        navigate("/results_by_artist", { state: { artistResults: response.data }});
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleLogin = () => {
    navigate('/login');
  }
  const handleSignup = () => {
    navigate('/signup');
  }

  return (
    <div className="home" style={{ backgroundImage: `url(${HomeImage})`}}>
      <Helmet>
        <title>Home | MusicPlaylists</title>
      </Helmet>
      <nav>
        <div className="logo"><a href="/">MusicPlaylists</a> </div>
        <ul className="menu">
          <li><a href="/">Home</a></li>
          <li><a href="#">Link</a></li>
          <li><a href="#">Link</a></li>
        </ul>
        <div className="search">
          <form onSubmit={handleSearch}>
            <input
              type="text" 
              placeholder="Search for title, artist, album, and playlist!" 
              name="search_box" 
              value={searchInput} 
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <select name="search_type" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
              <option value="song">Song</option>
              <option value="artist">Artist</option>
            </select>
            <button type="submit">Go</button>
          </form>
        </div>
        <ul className="sign">
          <button onClick={handleLogin}><a href="/login">Log In</a></button>
          <button onClick={handleSignup}><a href="/signup">Sign Up</a></button>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
