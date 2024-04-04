import React, { useState, useEffect } from 'react';
import styles from './Library.module.css';
import { Helmet } from "react-helmet";
import { NavLink } from 'react-router-dom';
import axios from "axios";

function Library() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5001/loginStatus', { withCredentials: true })
            .then(response => {
                setIsLoggedIn(response.data.is_logged_in);
            })
            .catch(error => console.error('Error fetching login status:', error));
    }, []);

    return (
        <div className={styles.library_container}>
            <Helmet>
                <title>Library | MusicPlaylists</title>
            </Helmet>   

            <div className={styles.library_header}>
                <h1>Library</h1>
                {isLoggedIn ? (
                    <button className={styles.create_playlist}><NavLink to='/create_playlist'>Create Playlist</NavLink></button>
                ) : (
                    <p>Please log in to access your library. Don't have an account? <NavLink to='/signup'>Sign up</NavLink></p>
                )}
            </div>
        </div>
    );
}

export default Library;