import styles from "./SongCard.module.css";

const SongCard = ({songName='None', artistName='None', albumName='None', buttonSymbol='❌', releaseDate=null}) => {
  const handleSong = () => {
    //TODO: Add code to connect to backend
    if(buttonSymbol === '❌') {
      console.log('if user wants to remove a song')
    } else {
      console.log('if user wants to add a song')
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
          <div className={styles.dropdown}>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p> 
          </div>
        </div>
      </div>
    </>
  );
};

export default SongCard;
