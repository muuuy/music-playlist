import React,  { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import styles from './PlaylistTemplate.module.css';
import CreatePlaylist from '../CreatePlaylist/CreatePlaylist';
import { Create } from '@mui/icons-material';

const PlaylistTemplate = () => {

    const testList = ['aaaaaa', 'aaa', 'abbbb', 'accccccccc', 'addddddddd', 'aeeeeeeeeeeeeeee', 'affffffffff', 'agggggggggggg', 'ahhhhhhhhh'];

    const [title, setTitle] = useState('test');
    const [create, setCreate] = useState(false);

    const generateCards = testList.map((song) => {
        return (
            <tr key={uuid()}>
                <td>{song}</td>
            </tr>
        );
    })

    const handleEdit = () => {
        setCreate(!create);
    }

    return (
        <div className={styles.template_container}>
            <div className={styles.template_header}>
                <h1>{title}</h1>
                <button id={styles.edit_button} onClick={handleEdit}>Edit Playlist</button>
                {create && <CreatePlaylist edit={true} inputTitle={title} inputDesc='' inputVisible={create ? 'absolute' : 'none'} onClose = {handleEdit} />}
            </div>
            <table className={styles.song_list}>
                {generateCards}
            </table>
        </div>
    )
}

export default PlaylistTemplate;