import React from "react";

class Home extends React.Component{
	render(){
		return(
			<div>
				<nav>
          <div class="logo"><a href="/">MusicPlaylists</a> </div>
          <ul class="menu">
            <li><a href="/">Home</a></li>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
          </ul>
          <div class="search">
            <form>
              <input type="text" placeholder="Search for title, artist, album, and playlist!"/>
              <button type="submit">Go</button>
            </form>
          </div>
          <ul class="sign">
            <button><a href="#">Sign In</a></button>
	          <button><a href="#">Sign Up</a></button>
          </ul>
        </nav>
			</div>
		);
	}
}

export default Home;