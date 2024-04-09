import React, { useState, useEffect } from 'react';
import styles from './Library.module.css';
import { Helmet } from "react-helmet";
import { NavLink } from 'react-router-dom';

//TODO: Change the "DELETE LATER" when created the component

const Library = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if JWT token exists in local storage
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            // If token exists, set isLoggedIn to true
            setIsLoggedIn(true);
        } else {
            // If token doesn't exist, set isLoggedIn to false
            setIsLoggedIn(false);
        }
    }, []);

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
                    {isLoggedIn ? (
                        <button className={styles.create_playlist} onClick={handleEdit}>Create Playlist</button>
                    ) : (
                        <p>Please log in to access your library. Don't have an account? <NavLink to='/signup'>Sign up</NavLink></p>
                    )}
                    {create && <CreatePlaylist edit={true} inputTitle={'DELETE LATER'} inputDesc='' inputVisible={create ? 'absolute' : 'none'} onClose = {handleEdit} />}
                </div>
            </div>
    )
};

export default Library;
