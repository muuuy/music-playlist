import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

  function generateTable() {
    // Create all cells in table
    const cells = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const cellText = `cell in row ${i}, column ${j}`;
        cells.push(<td key={`${i}-${j}`} style={{ padding: "10px", border: "2px solid black", fontSize: "20px" }}>{cellText}</td>);
      }
    }
    // Create all rows in table
    const rows = [];
    for (let i = 0; i < 5; i++) {
      rows.push(<tr key={i}>{cells.slice(i * 5, (i + 1) * 5)}</tr>);
    }
    // Return the table
    return (
      <table border="2" style={{ marginTop: "150px" }}>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  return (
    <div>
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
          <button><a href="#">Sign In</a></button>
          <button><a href="#">Sign Up</a></button>
        </ul>
      </nav>
      <div className="results_table">{generateTable()}</div>
    </div>
  );
}

export default Home;
