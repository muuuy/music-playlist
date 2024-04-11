import React, { Component, useState, useEffect } from "react";
import styles from "./Library.module.css";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

import CreatePlaylist from "../CreatePlaylist/CreatePlaylist";

//TODO: Change the "DELETE LATER" when created the component

const Library = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let count = 0;

  useEffect(() => {
    // Check if JWT token exists in local storage
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      // If token exists, set isLoggedIn to true
      setIsLoggedIn(true);
    } else {
      // If token doesn't exist, set isLoggedIn to false
      setIsLoggedIn(false);
    }
  }, []);

  const populateLibrary = () => {
    count += 1;

    return (
      <div
        className={styles.playlist_card}
        style={
          count % 2 == 1
            ? { background: "var(--darker-gray" }
            : { background: "var(--dark-gray)" }
        }
      >
        <p className={styles.playlist_title}>Place HolderHolderHolderHolderHolderHolderHolderHolderHolderHolderHolderHolder</p>
        <p className={styles.song_count}>777 Songs</p>
      </div>
    );
  };

  const [create, setCreate] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(true);
  };

  const handleEdit = () => {
    setCreate(!create);
  };

  return (
    <div className={styles.library_container}>
      <Helmet>
        <title>Library | MusicPlaylists</title>
      </Helmet>

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
        {create && (
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
