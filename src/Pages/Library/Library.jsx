import React, { Component, useState, useEffect } from 'react';
import styles from './Library.module.css';
import { Helmet } from "react-helmet";
import { NavLink } from 'react-router-dom';
import CreatePlaylist from '../CreatePlaylist/CreatePlaylist';
import axios from 'axios';


//TODO: Change the "DELETE LATER" when created the component

const Library = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(localStorage.getItem('username'));
    const [create, setCreate] = useState(false);
    const [visible, setVisible] = useState(false);
    const [playlist, setPlaylist] = useState([{}]);

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
        const fetchPlaylistsByUser = async () => {
            try {
                //userId = localStorage.getItem('username')
                const response = await axios.get(`http://127.0.0.1:5001/get_playlists_by_user/${userId}`);
                setPlaylist(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };
      
        //   // Call the function to fetch playlists when the component mounts
        fetchPlaylistsByUser();
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
      <HelmetProvider>
        <Helmet>
          <title>Library | MusicPlaylists</title>
        </Helmet>
      </HelmetProvider>

      <div className={styles.library_header}>
        <h1>Library</h1>
        {isLoggedIn ? (
          <button className={styles.create_playlist} onClick={handleEdit}>
            Create Playlist
          </button>
        ) : (
          <p className={styles.login_message}>
            Please log in to access your library. Don&apos;t have an account?{" "}
            <NavLink
              to="/signup"
              style={{ color: "var(--light-red)", cursor: "pointer", fontWeight: '700' }}
            >
              Sign up
            </NavLink>
          </p>
        )}
        {create === true && (
          <CreatePlaylist
            edit={true}
            inputTitle={"DELETE LATER"}
            inputDesc=""
            inputVisible={create ? "absolute" : "none"}
            onClose={handleEdit}
          />
        )}
      </div>

      {/*TODO: DELETE FOR LOGIC LATER */}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
      {populateLibrary()}
    </div>
  );
};

export default Library;
