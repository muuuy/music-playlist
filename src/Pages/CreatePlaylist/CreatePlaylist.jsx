import React, { useState, useEffect, Component } from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from '../../Components/Navbar/Navbar';
import styles from './CreatePlaylist.module.css'

const CreatePlaylist = ({edit = false}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [buttonTxt, setButtonTxt] = useState('Create Playlist');

    useEffect(() => {
        if(edit) { setButtonTxt('Edit'); } 
        else { setButtonTxt('Create Playlist'); }
    }, [])

    const handleTitle = (e) => {
        setTitle(e.target.value);
        console.log(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
        console.log(e.target.value);
    }

    console.log(edit);

    return (
        <div className={styles.form_container}>
            <div className={styles.input_container}>
                <h1>{buttonTxt}</h1>
                <form className={styles.input_form}>
                    <label htmlFor={styles.title_input}>Title
                        <input id={styles.title_input} name='title' type='text' onChange={handleTitle} value={title} required />
                    </label>
                    <label htmlFor={styles.description}>Description
                        <textarea name="description" id={styles.description} onChange={handleDescription} value={description} cols="100" rows="5"></textarea>
                    </label>
                    <button id={styles.create_button} type='submit'>{buttonTxt}</button>
                </form>
            </div>
            
        </div>
        
    )
}

export default CreatePlaylist;