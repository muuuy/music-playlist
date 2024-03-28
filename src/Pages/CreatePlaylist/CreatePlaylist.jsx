import React, { useState, Component } from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from '../../Components/Navbar/Navbar';
import styles from './CreatePlaylist.module.css'

const CreatePlaylist = ({inputTitle='', inputDescription=''}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitle = (e) => {
        setTitle(e.target.value);
        console.log(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
        console.log(e.target.value);
    }

    return (
        <div className={styles.form_container}>
            <div className={styles.input_container}>
                <h1>Create Playlist</h1>
                <form className={styles.input_form}>
                    <label for={styles.title_input}>Title
                        <input id={styles.title_input} name='title' type='text' onChange={handleTitle} value={title} required />
                    </label>
                    <label for={styles.description}>Description
                        <textarea name="description" id={styles.description} onChange={handleDescription} value={description} cols="100" rows="5"></textarea>
                    </label>
                    <button id={styles.create_button} type='submit'>Create Playlist</button>
                </form>
            </div>
            
        </div>
        
    )
}

export default CreatePlaylist;