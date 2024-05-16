import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { stringify, v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";
import axios from "axios";

import styles from "./PlaylistTemplate.module.css";
import EditPlaylist from "../EditPlaylist/EditPlaylist";
import SongCard from "../../Components/SongCard/SongCard";

const PlaylistTemplate = ({}) => {
  const { playlistId, title } = useParams();
  // const { playlistIdDesc, decription } = useParams();
  const [songs, setSongs] = useState([]);
  const [description, setDescription] = useState("test");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5001/get_music_from_playlist/${playlistId}`);
        setSongs(response.data);
        console.log(response.data)
        console.log(songs)
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };  
    fetchSongs();
  }, [playlistId]);

  useEffect(() => {
    const fetchDesc = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5001/get_playlist_desc/${playlistId}`);
        setDescription(response.data.description);
      } catch (error) {
        console.error("Error fetching description:", error);
      }
    };  
    fetchDesc();
  }, [edit]);

  const handleEdit = () => {
    setEdit((edit) => !edit);
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
          <p className={styles.playlist_description}>Description Placerholder</p>
          <button id={styles.edit_button} onClick={handleEdit}>
            Edit Playlist
          </button>
          {edit && (
            <EditPlaylist
              playlistId={playlistId}
              edit={true}
              inputTitle={title}
              inputDesc={description}
              inputVisible={edit ? "absolute" : "none"}
              onClose={handleEdit}
            />
          )}
        </div>
        {songs.map((song) => (
          <SongCard
            key={song.trackId}
            songName={song.title}
            artistName={song.artist}
            albumName={song.album}
            releaseDate={song.releaseDate}
            buttonSymbol="❌"
            playlisttemplateplaylistid = {playlistId}
          />
        ))}
      </div>
    </>
  );
};

export default PlaylistTemplate;
