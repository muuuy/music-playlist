import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from '../../Components/Navbar/Navbar';
import styles from './CreatePlaylist.module.css'

const CreatePlaylist = () => {
    return (
        <>
        <div className={styles.container}>
            <Navbar />
            <div className={styles.formContainer}>
                <p>TEST</p>
            </div>
        </div>
        </>
    )
}

export default CreatePlaylist;