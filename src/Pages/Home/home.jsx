import React, { Component } from "react";
import styles from './home.module.css';
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from '../../Components/Navbar/Navbar';
import { NavLink } from "react-router-dom";

class Home extends Component {
    render () {
        return (
            <div className={styles.home_container}>
                <HelmetProvider>
                    <Helmet>
                        <title>Home | MusicPlaylists</title>
                    </Helmet>   
                </HelmetProvider>

                <div className={styles.home_content}>
                    <div className={styles.headline}>
                        <h1>Discover, Create, and Share.</h1>
                        <p>Archive your favorite music in your own playlists!</p>
                    </div>

                    <div className={styles.join_us}>
                        <p>Join us today!</p>
                        <NavLink to='/signup' id="join_us_text">Click Here!</NavLink>
                    </div>

                    <div className={styles.features}>
                        <div className={styles.home_column}>
                            <h2>Discover</h2>
                            <p>Search for a song based on a song title or an artist.</p>
                        </div>
                        <div className={styles.home_column}>
                            <h2>Create</h2>
                            <p>Create your own playlists with your favorite music.</p>
                        </div>
                        <div className={styles.home_column}>
                            <h2>Share</h2>
                            <p>Share your playlists with other users or your friends.</p>
                        </div>                        
                    </div>                    
                </div>
            </div>
        )
    }
};

export default Home;
