import { useState, useEffect } from 'react';
import { FaRegTimesCircle } from "react-icons/fa";
import axios from "axios";
import styles from './CreatePlaylist.module.css'

const CreatePlaylist = ({edit = false, inputTitle = '', inputDesc = '', inputVisible = 'none', onClose}) => {

    const [title, setTitle] = useState(inputTitle);
    const [description, setDescription] = useState(inputDesc);
    const [userId, setUserId] = useState(sessionStorage.getItem('userID'));
    const [buttonTxt, setButtonTxt] = useState('Create Playlist');
    const [playlistID, setPlaylistID] = useState();

    useEffect(() => {
        if(edit) { setButtonTxt('Edit'); } 
        else { setButtonTxt('Create Playlist'); }
    }, [])

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }
    const getUserId = async () => {
        try {
            console.log("getUserId ran")
            let temp = sessionStorage.getItem('username')
            const response = await axios.post('/getUserId', {temp});
            console.log("response below")
            console.log(response.data.msg)
            return response.data.msg;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // getUserId()
        // .then(user => {
        //     // Handle the userId returned from the backend
        //     console.log('User ID:', user);
        //     setUserId(user)
        // })
        // .catch(error => {
        //     // Handle any errors
        //     console.error('Error:', error);
        // });
        try {
            // const user = await getUserId(); // Wait for getUserId to complete
            // console.log('User ID:', userId);
            
            // // Handle the userId returned from the backend
            // setUserId(user);
            const response = await axios.post("http://127.0.0.1:5001/create_playlist", {userId, title, description});
            const playlistId = response.data;
            console.log("!!!!!!!!!!!", playlistId)
            setPlaylistID(playlistId);
            
        } catch (err) {
            console.log(err);
        }
        console.log(userId)
        console.log("TITLE:", title)
        console.log("DESC:", description)
        
        //navigate('/');
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


export default CreatePlaylist;