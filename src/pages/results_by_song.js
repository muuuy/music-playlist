import React from "react";

class Home extends React.Component{
	render(){
		return(
			<div>
				<nav>
          <div className="logo"><a href="/">Results</a> </div>
          <ul className="menu">
            <li><a href="/">Home</a></li>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
          </ul>
          <div className="search">
            <form>
              <input type="text" placeholder="Search for title, artist, album, and playlist!"/>
              <button type="submit">Go</button>
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