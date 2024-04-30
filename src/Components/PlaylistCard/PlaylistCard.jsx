import styles from './PlaylistCard.module.css'

const PlaylistCard = (userId = null, id = null) => {
    return (
        <>
        <div className={styles.playlistcard_container}>
            <p className={styles.close}>DELETE</p>
            <img className={styles.playlistcard_img}></img>
            <h1 className={styles.playlist_name}>Test</h1>
        </div>
        </>
    )
}

export default PlaylistCard;