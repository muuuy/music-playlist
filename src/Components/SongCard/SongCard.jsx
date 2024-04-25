import styles from "./SongCard.module.css";

const SongCard = (song) => {
  const removeSong = () => {
    //TODO: Add code to connect to backend
  };

  return (
    <>
      <div className={styles.songcard_container}>
        <span className={styles.song_title}>test</span>
        <p className={styles.song_artist}>Artist</p>
        <p className={styles.song_album}>Album</p>
        <p className={styles.song_time}>9.99</p>
        <div className={styles.remove_container}>
          <p className={styles.remove_song} onClick={removeSong}>
            ❌
          </p>
        </div>
      </div>
    </>
  );
};

export default SongCard;
