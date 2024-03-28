import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from '../../Components/Navbar/Navbar';
import styles from './CreatePlaylist.module.css'

const CreatePlaylist = () => {
    return (
        <div className={styles.form_container}>
            <div className={styles.input_container}>
                <h1>Create Playlist</h1>
                <form className={styles.input_form}>
                    <label for="title">Title
                        <input id={styles.title_input} name='title' type='text' required />
                    </label>
                    <label for="description">Description
                        <textarea name="description" id={styles.description} cols="100" rows="5"></textarea>
                    </label>
                    <button id={styles.create_button} type='submit'>Create Playlist</button>
                </form>
            </div>
            
        </div>
        
    )
}

export default CreatePlaylist;