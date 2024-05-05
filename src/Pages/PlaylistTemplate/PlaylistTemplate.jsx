import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";
import axios from "axios";

import styles from "./PlaylistTemplate.module.css";
import CreatePlaylist from "../CreatePlaylist/CreatePlaylist";
import SongCard from "../../Components/SongCard/SongCard";

const PlaylistTemplate = () => {
  const { playlistId, title } = useParams();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5001/get_music_from_playlist/${playlistId}`);
        setSongs(Array.from(response.data));
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
  
    fetchSongs();
  }, [playlistId]);


  //const [title, setTitle] = useState("test");
  const [description, setDescription] = useState("test");
  const [create, setCreate] = useState(false);

  const removeSong = () => {
    //TODO: Add code to connect to backend
  };

  const handleEdit = () => {
    setCreate((create) => !create);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Playlist | {title}</title>
        </Helmet>
      </HelmetProvider>
      

      <div className={styles.template_container}>
        <div className={styles.template_header}>
          <h1>{title}</h1>
          <button id={styles.edit_button} onClick={handleEdit}>
            Edit Playlist
          </button>
          {create && (
            <CreatePlaylist
              edit={true}
              inputTitle={title}
              inputDesc={description}
              inputVisible={create ? "absolute" : "none"}
              onClose={handleEdit}
            />
          )}
        </div>
        {songs.map((song) => (
          <SongCard
            trackId={song.trackId}
            songName={song.title}
            artistName={song.artist}
            albumName={song.album}
            releaseDate={song.releaseDate}
            playlistId={song.playlistId}
            buttonSymbol="❌"
            removeSong={removeSong}
          />
        ))}
      </div>
    </>
  );
};

export default PlaylistTemplate;
