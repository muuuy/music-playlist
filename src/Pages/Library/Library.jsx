import React, { Component } from 'react';
import styles from './Library.module.css';
import { Helmet } from "react-helmet";
import { NavLink } from 'react-router-dom';

class Library extends Component {
    render () {
        return (
            <div className={styles.library_container}>
                <Helmet>
                    <title>Library | MusicPlaylists</title>
                </Helmet>   

                <div className={styles.library_header}>
                    <h1>Library</h1>
                    <button className={styles.create_playlist}><NavLink to='/create_playlist'>Create Playlist</NavLink></button>
                </div>
            </div>
        )
    }
};

export default Library;