import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { v4 as uuid } from "uuid";

import styles from "./PlaylistTemplate.module.css";
import CreatePlaylist from "../CreatePlaylist/CreatePlaylist";

const PlaylistTemplate = () => {
  const testList = [
    "aaaaaa",
    "aaa",
    "abbbb",
    "accccccccc",
    "addddddddd",
    "aeeeeeeeeeeeeeee",
    "affffffffff",
    "agggggggggggg",
    "ahhhhhhhhh",
  ];

  const [title, setTitle] = useState("test");
  const [create, setCreate] = useState(false);

  const removeSong = () => {
    //TODO: Add code to connect to backend 
  }

  const generateCards = testList.map((song) => {
    let id = uuid();
    
    return (
      <tr key={id}>
        <td className={styles.song_card}>
          <span className={styles.song_title}>{song}</span>
          <p className={styles.song_artist}>artist</p>
          <p className={styles.song_album}>album</p>
          <p className={styles.song_time}>9:99</p>
          <div className={styles.remove_container}>
            <p className={styles.remove_song} onClick={removeSong}>❌</p>
          </div>
        </td>
      </tr>
    );
  });

  const handleEdit = () => {
    setCreate((create) => !create);
  };

  useEffect(() => {
    console.log(create);
  }, [create]);

  return (
    <>
      <Helmet>
        <title>Playlist | {title}</title>
      </Helmet>

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
              inputDesc=""
              inputVisible={create ? "absolute" : "none"}
              onClose={handleEdit}
            />
          )}
        </div>
        <table className={styles.song_list}>
          <tbody>{generateCards}</tbody>
        </table>
      </div>
    </>
  );
};

export default PlaylistTemplate;
