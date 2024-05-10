import { useState, useEffect } from 'react';
import { FaRegTimesCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from './EditPlaylist.module.css'

const EditPlaylist = ({
    playlistId = null, 
    edit = false, 
    inputTitle = '', 
    inputDesc = '', 
    inputVisible = 'none', 
    onClose
}) => {

    const [title, setTitle] = useState(inputTitle);
    const [description, setDescription] = useState(inputDesc);
    const [buttonTxt, setButtonTxt] = useState('Edit Playlist');
    const [playlistID, setPlaylistID] = useState(playlistId);
    const navigate = useNavigate();

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log(playlistID);

        axios.post("http://127.0.0.1:5001/edit_playlist", {title, description, playlistID})
            .then(response => {
                console.log('Seccessfully updated playlist')
                navigate(`/playlist_template/${playlistId}/${encodeURIComponent(title)}`)
                window.location.reload();
            })
            .catch(error => {
                console.log('Error sending data to backend while updating playlist')
            })
    };

    return (
        <div className={styles.form_container} style={{ display: inputVisible }}>
            <div className={styles.input_container}>
                <div className={styles.create_header}>
                    <h1>{buttonTxt}</h1>
                    <FaRegTimesCircle 
                     style={{ position: 'absolute', 
                              right: '16px', 
                              top: '16px', 
                              cursor: 'pointer' }}
                              onClick={onClose}
                    />
                </div>
                <form className={styles.input_form} onSubmit={handleSubmit}>
                    <label htmlFor={styles.title_input}>Title
                        <input id={styles.title_input} name='title' type='text' onChange={handleTitle} value={title} required />
                    </label>
                    <label htmlFor={styles.description}>Description
                        <textarea name="description" id={styles.description} onChange={handleDescription} value={description} cols="100" rows="5"></textarea>
                    </label>
                    <button id={styles.create_button}  type='submit'>{buttonTxt}</button>
                </form>
            </div>
            
        </div>
    )
}


export default EditPlaylist;