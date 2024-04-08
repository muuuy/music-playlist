import React, { Component, useState } from 'react';
import styles from './Library.module.css';
import { Helmet } from "react-helmet";
import { NavLink } from 'react-router-dom';

import CreatePlaylist from '../CreatePlaylist/CreatePlaylist';

//TODO: Change the "DELETE LATER" when created the component


const Library = () => {

    // render () {

        const [create, setCreate] = useState(false);
        const [visible, setVisible] = useState(false);

        const handleClick = () => {
            setVisible(true);
        }

        const handleEdit = () => {
            setCreate(!create);
        }

        return (
            <div className={styles.library_container}>
                <Helmet>
                    <title>Library | MusicPlaylists</title>
                </Helmet>   

                <div className={styles.library_header}>
                    <h1>Library</h1>
                    <button className={styles.create_playlist} onClick={handleEdit}>Create Playlist</button>
                    {create && <CreatePlaylist edit={true} inputTitle={'DELETE LATER'} inputDesc='' inputVisible={create ? 'absolute' : 'none'} onClose = {handleEdit} />}
                </div>
            </div>
        )
    // }
};

export default Library;