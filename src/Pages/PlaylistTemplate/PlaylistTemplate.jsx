import React,  { useState, useEffect } from 'react';

import styles from './PlaylistTemplate.module.css';

const PlaylistTemplate = () => {

    const testList = ['aaaaaa', 'aaa', 'abbbb', 'accccccccc', 'addddddddd', 'aeeeeeeeeeeeeeee', 'affffffffff', 'agggggggggggg', 'ahhhhhhhhh'];

    const [title, setTitle] = useState('test');

    const generateCards = testList.map((song) => {
        return (
            <tr>
                <td>{song}</td>
            </tr>
        );
    })

    return (
        <div className={styles.template_container}>
            <div className={styles.template_header}>
                <h1>{title}</h1>
                <button id={styles.edit_button}>Edit Playlist</button>
            </div>
            <table>
                {generateCards}
            </table>
        </div>
    )
}

export default PlaylistTemplate;