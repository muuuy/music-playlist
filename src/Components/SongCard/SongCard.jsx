import styles from "./SongCard.module.css";

const SongCard = ({songName='None', artistName='None', albumName='None', buttonSymbol='❌', releaseDate=null}) => {
  const removeSong = () => {
    //TODO: Add code to connect to backend
  };

  return (
    <>
      <div className={styles.songcard_container}>
        <span className={styles.song_title}>{songName}</span>
        <p className={styles.song_artist}>{artistName}</p>
        <p className={styles.song_album}>{albumName}</p>
        <p className={styles.song_time}>9.99</p>
        <div className={styles.remove_container}>
          <p className={styles.remove_song} onClick={removeSong}>
            {buttonSymbol}
          </p>
        </div>
      </div>
    </>
  );
};

export default SongCard;
