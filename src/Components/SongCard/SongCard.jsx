import styles from "./SongCard.module.css";
import React, { useState } from "react";
import axios from "axios";

import { BsThreeDotsVertical } from "react-icons/bs";

const [userId, setUserId] = useState(sessionStorage.getItem('userID'));
  useEffect(() => {
            // Check if JWT token exists in local storage
            const jwtToken = sessionStorage.getItem('jwtToken');
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
                    console.log("!", response.data);
                } catch (error) {
                    console.error('Error fetching playlists:', error);
                }
            };
          
            //   // Call the function to fetch playlists when the component mounts
            fetchPlaylistsByUser();
        }, []);

const SongCard = ({
  songName = "None",
  artistName = "None",
  albumName = "None",
  buttonSymbol = "❌",
  releaseDate = null,
}) => {
  const handleSong = () => {
    //TODO: Add code to connect to backend
    if (buttonSymbol === "❌") {
      console.log("if user wants to remove a song");
    } else {
      const playlistId = 1  // Hardecoded for testing
      console.log('if user wants to add a song')
      // Data sent to backend
      const data = {
        playlistId: playlistId,
        songName: songName,
        artistName: artistName,
        albumName: albumName,
        releaseDate: releaseDate
      };
      console.log("SENDING:", data)
      // Backend request
      axios.post('http://127.0.0.1:5001/add_to_playlist', data)
        .then(response => {
          console.log('Data sent. Response:', response.data)
        })
        .catch(error => {
          console.error('Error sending data to backend')
        })
    }
  };

  return (
    <>
      <div className={styles.songcard_container}>
        <span className={styles.song_title}>{songName}</span>
        <p className={styles.song_artist}>{artistName}</p>
        <p className={styles.song_album}>{albumName}</p>
        <p className={styles.release_date}>{releaseDate}</p>
        <div className={styles.remove_container}>
          <p className={styles.remove_song} onClick={handleSong}>
            {buttonSymbol}
          </p>
        </div>
        {buttonSymbol !== "❌" && <div className={styles.dropdown_container}>
          <BsThreeDotsVertical className={styles.burger} />
          <div className={styles.dropdown}>
            <p
              style={{
                textAlign: "center",
                borderBottom: "2px solid var(--dark-red)",
                fontWeight: "800",
              }}
            >
              Add to:
            </p>
            <p className={styles.dropdown_item}>test</p>
            <p className={styles.dropdown_item}>test</p>
            <p className={styles.dropdown_item}>test</p>
            <p className={styles.dropdown_item}>test</p>
            <p className={styles.dropdown_item}>test</p>
          </div>
        </div>}
      </div>
    </>
  );
};

export default SongCard;
