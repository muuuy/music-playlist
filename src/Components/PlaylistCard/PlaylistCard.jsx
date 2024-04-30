import styles from './PlaylistCard.module.css'

const PlaylistCard = ({ playlist_ID, title, userID }) => {
    return (
        <>
        <div className={styles.playlistcard_container}>
            <p className={styles.close}>DELETE</p>
            <img className={styles.playlistcard_img}></img>
            <h1 className={styles.playlist_name}>{title}</h1>
        </div>
        </>
    )
}

export default PlaylistCard;
