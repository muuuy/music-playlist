import styles from './PlaylistCard.module.css'
import axios from "axios";
import { NavLink } from "react-router-dom";

const PlaylistCard = ({ playlist_ID, title, userID }) => {
    const deletePlaylist = async () => {
        const data = {
            playlistId: playlist_ID
        }
        try {
            await axios.post('http://127.0.0.1:5001/delete_playlist', data)
                .then(response => {
                    window.location.reload();
                })
        } catch (error) {
            console.error("Error deleting playlist:", error);
        }
    }
    return (
        <>
        <div className={styles.playlistcard_container}>
            <p className={styles.close} onClick={deletePlaylist}>DELETE</p>
            <NavLink  to={`/playlist_template/${playlist_ID}/${encodeURIComponent(title)}`} key={playlist_ID}>
                <img className={styles.playlistcard_img}></img>
                <h1 className={styles.playlist_name}>{title}</h1>
            </NavLink>
        </div>
        </>
    )
}

export default PlaylistCard;