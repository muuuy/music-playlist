import styles from './PlaylistCard.module.css'

const PlaylistCard = (id = null) => {
    return (
        <>
        <div className={styles.playlistcard_container}>
            <img className={styles.playlistcard_img}></img>
            <h1 className={styles.playlist_name}>Test</h1>
        </div>
        </>
    )
}

export default PlaylistCard;