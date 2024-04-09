import React, { Component, useState } from 'react';
import styles from './Library.module.css';
import { Helmet } from "react-helmet";
import { NavLink } from 'react-router-dom';

import CreatePlaylist from '../CreatePlaylist/CreatePlaylist';

const Library = () => {

    // render () {

        const [visible, setVisible] = useState(false);
        const [playlist, setPlaylist] = useState([{}]);
        const handleDeleteStudent = async () => {
            //e.preventDefault();
            console.log("test")
          };
        
        useEffect(() => {
            fetch("/get_all_playlists").then(
              res=>res.json()
            ).then(
              data=> {
                setPlaylist(data)
              }
            )
          }, [])

        const handleClick = () => {
            setVisible(true);
        }

        return (
            <div className={styles.library_container}>
                <Helmet>
                    <title>Library | MusicPlaylists</title>
                </Helmet>   

                <div className={styles.library_header}>
                    <h1>Library</h1>
                    <button className={styles.create_playlist} onClick={handleClick}>Create Playlist</button>
                    {visible && <CreatePlaylist />}
                </div>
                {playlist.map((val, key) => {
                    return (
                    <tr key={key}>
                        <td>{val.title}</td>
                        <td>{val.description}</td>
                        <button onClick={()=>handleDeleteStudent()}>
                            Delete
                        </button>
                    </tr>
                    
                    )
                })}
            </div>
        )
    // }
};

export default Library;