import React from "react";
import { Link } from "react-router-dom"
import {Helmet } from "react-helmet"

function ButtonLink({ to, children }) {
      return <Link to={to}><button>{children}</button></Link>
}
class Home extends React.Component{
	render(){
		return(
			<div>
        <Helmet>
          <title>Search Results | MusicPlaylists</title>
        </Helmet>
				<nav>
          <div className="logo"><a href="/">MusicPlaylists</a> </div>
          <ul className="menu">
            <li><a href="/">Home</a></li>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
          </ul>
          <div className="search">
            <form>
              <input type="text" placeholder="Search for title, artist, album, and playlist!"/>
              <select name="search_type">
                <option value="song">Song</option>
                <option value="artist">Artist</option>
              </select>
              <ButtonLink to="/results_by_song">Go</ButtonLink>
            </form>
          </div>
          <ul className="sign">
            <button><a href="#">Sign In</a></button>
	          <button><a href="#">Sign Up</a></button>
          </ul>
        </nav>
			</div>
		);
	}
}

export default Home;