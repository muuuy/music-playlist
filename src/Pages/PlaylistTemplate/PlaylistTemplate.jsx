import React,  { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import styles from './PlaylistTemplate.module.css';

const PlaylistTemplate = () => {

    const testList = ['aaaaaa', 'aaa', 'abbbb', 'accccccccc', 'addddddddd', 'aeeeeeeeeeeeeeee', 'affffffffff', 'agggggggggggg', 'ahhhhhhhhh'];

    const [title, setTitle] = useState('test');

    const generateCards = testList.map((song) => {
        return (
            <tr key={uuid()}>
                <td>{song}</td>
            </tr>
        );
    })

    const handleEdit = () => {
        console.log('test');
    }

    return (
        <div className={styles.template_container}>
            <div className={styles.template_header}>
                <h1>{title}</h1>
                <NavLink to={{
                    pathname: '/create_playlist',
                    state: { edit: true }
                }}>
                        <p>Edit Playlist</p>
                </NavLink>
                <button id={styles.edit_button} onClick={handleEdit}>Edit Playlist</button>
            </div>
            <table className={styles.song_list}>
                {generateCards}
            </table>
        </div>
    )
}

export default PlaylistTemplate;