import styles from "./SongCard.module.css";
import React, {useState, useEffect} from "react";
import axios from "axios";

import { BsThreeDotsVertical } from "react-icons/bs";



const SongCard = ({
  songName = "None",
  artistName = "None",
  albumName = "None",
  buttonSymbol = "❌",
  releaseDate = null,
  trackId = null,
  playlistId = null
}) => {

  const [playlists, setPlaylist] = useState([]);
  const [userId, setUserId] = useState(sessionStorage.getItem('userID'));
  useEffect(() => {

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
          // Check if JWT token exists in local storage
          const jwtToken = sessionStorage.getItem('jwtToken');
          if (jwtToken) {
              // If token exists, set isLoggedIn to true
              fetchPlaylistsByUser();  
          }
          //   // Call the function to fetch playlists when the component mounts
      }, []);


  const handleSong = () => {
    //remove a song from a playlist
    if(buttonSymbol === '❌') { 
      console.log('if user wants to remove a song')
      console.log('trackId ' + trackId)
      console.log('playlistId ' + playlistId)
      const data = {
        playlistId: playlistId,
        trackId: trackId
      };

      axios.post('http://127.0.0.1:5001/delete_from_playlist', data)
        .then(response => {
          window.location.reload();
          alert(`Data sent. Response: ${response.data}`);
        })
        .catch(error => {
          console.error('Error sending data to backend')
        })
    } 
    // add a song to a playlist
    else {
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
          alert(`Data sent. Response: ${response.data}`);
        })
        .catch(error => {
          console.error('Error sending data to backend')
        })
    }
  };

  const handlePlaylistClicked = (playlistId) => {
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
          alert(`Data sent. Response: ${response.data}`);
        })
        .catch(error => {
          console.error('Error sending data to backend')
        })
  };


  return (
    <>
      <div className={styles.songcard_container}>
        <span className={styles.song_title}>{songName}</span>
        <p className={styles.song_artist}>{artistName}</p>
        <p className={styles.song_album}>{albumName}</p>
        <p className={styles.release_date}>{releaseDate}</p>
        {buttonSymbol !== "⭕️" && <div className={styles.remove_container}>
          <p className={styles.remove_song} onClick={handleSong}>
            {buttonSymbol}
          </p>
        </div>}
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
            {playlists.map((playlist) => (
                <p
                  key={playlist.playlistId} // Use a unique key for each element
                  className={styles.dropdown_item}
                  onClick={() => handlePlaylistClicked(playlist.playlistId)}
                >
                  {playlist.title}
                </p>
            ))}
          </div>
        </div>}
      </div>
    </>
  );
};

export default SongCard;