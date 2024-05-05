import styles from "./SongCard.module.css";

import { BsThreeDotsVertical } from "react-icons/bs";

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
      console.log("if user wants to add a song");
    }
  };

  return (
    <>
      <div className={styles.songcard_container}>
        <span className={styles.song_title}>{songName}</span>
        <p className={styles.song_artist}>{artistName}</p>
        <p className={styles.song_album}>{albumName}</p>
        <p className={styles.song_time}>9.99</p>

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
