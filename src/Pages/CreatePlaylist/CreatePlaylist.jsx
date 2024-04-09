import React, { useState, useEffect, Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FaRegTimesCircle } from "react-icons/fa";

import Navbar from '../../Components/Navbar/Navbar';
import styles from './CreatePlaylist.module.css'

const CreatePlaylist = ({edit = false, inputTitle = '', inputDesc = '', inputVisible = 'none', onClose}) => {

    const [title, setTitle] = useState(inputTitle);
    const [description, setDescription] = useState(inputDesc);
    const [buttonTxt, setButtonTxt] = useState('Create Playlist');
    const [visible, setVisible] = useState(inputVisible);

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

    const handleClose = () => {
        setVisible('none');
        onClose;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await axios.post("http://127.0.0.1:5001/create_playlist", {title, description});
        } catch (err) {
        console.log(err);
        }
        navigate('/');
    };

    return (
        <div className={styles.form_container} style={{ display: visible }}>
            <div className={styles.input_container}>
                <div className={styles.create_header}>
                    <h1>{buttonTxt}</h1>
                    <FaRegTimesCircle 
                     style={{ position: 'absolute', 
                              right: '16px', 
                              top: '16px', 
                              cursor: 'pointer' }}
                              onClick={handleClose}
                    />
                </div>
                <form className={styles.input_form}>
                    <label htmlFor={styles.title_input}>Title
                        <input id={styles.title_input} name='title' type='text' onChange={handleTitle} value={title} required />
                    </label>
                    <label htmlFor={styles.description}>Description
                        <textarea name="description" id={styles.description} onChange={handleDescription} value={description} cols="100" rows="5"></textarea>
                    </label>
                    <button id={styles.create_button} onSubmit={handleSubmit} type='submit'>{buttonTxt}</button>
                </form>
            </div>
            
        </div>
        
    )
}

export default CreatePlaylist;