import React, { Component, useState } from 'react';
import styles from './Library.module.css';
import { Helmet } from "react-helmet";
import { NavLink } from 'react-router-dom';

import CreatePlaylist from '../CreatePlaylist/CreatePlaylist';

const Library = () => {

    // render () {

        const [visible, setVisible] = useState(false);

        const handleClick = () => {
            setVisible(true);
        }

        return (
            <div className={styles.library_container}>
                <Helmet>
                    <title>Library | MusicPlaylists</title>
                </Helmet>   

                <div className={styles.library_header}>
                    <h1>Library</h1>
                    <button className={styles.create_playlist} onClick={handleClick}>Create Playlist</button>
                    {visible && <CreatePlaylist />}
                </div>
            </div>
        )
    // }
};

export default Library;