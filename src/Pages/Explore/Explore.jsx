import styles from "./Explore.module.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import React, { useState, useEffect } from "react";


const Explore = () => {
    const [results, setResults] = useState();
    const [selectedOption, setSelectedOption] = useState("topTracks")

    useEffect(() => {
        let url = "";
        if (selectedOption === "topTracks") {
            url = "http://localhost:5000/top_tracks"
        }
        else if (selectedOption === "topArtists") {
            url = "http://localhost:5000/top_artists"
        }

        axios.post(url)
            .then(response => {
                const data = response.data;
                setResults(data)
            });
    }, [selectedOption]);

    function generateSongHeader() {
        return (
            <tr>
                <th className={styles.header}>Song</th>
                <th className={styles.header}>Artist</th>
            </tr>
        )
    }

    function generateArtistHeader() {
        return (
            <tr>
                <th className={styles.header}>Artist</th>
            </tr>
        )
    }

    function generateTable() {
        if (!results) {
            return <div>Loading...</div>;
        }

        if (selectedOption === "topTracks") {
            return generateTracksTable();
        }
        else if (selectedOption === "topArtists") {
            return generateArtistsTable();
        }
    }
    
    function generateTracksTable() {
        if (typeof results[0]['artist_names'] === 'undefined') {
            return <div>Loading...</div>;
        }
        // Create cells in table
        const cells = [];
        for (let i= 0; i < 20; i++) {
            for (let j = 0; j < 2; j++) {
                if (j == 0) {
                    const cellText = `${results[i]['name']}`;
                    cells.push(<td key={`${i}-${j}`} className={styles.column}>{cellText}</td>);
                }
                if (j == 1) {
                    const cellText = `${results[i]['artist_names'].join(', ')}`;
                    cells.push(<td key={`${i}-${j}`} className={styles.column}>{cellText} </td>);
                }
            }
        }
        // Create rows
        const rows = [];
        for (let i = 0; i < 20; i++) {
            rows.push(<tr key={i}>{cells.slice(i * 2, (i + 1) * 2)}</tr>);
        }
        // Return the table
        return (
            <table>{<thead>{generateSongHeader()}</thead>}
              <tbody>{rows}</tbody>
            </table>
        );
    }

    function generateArtistsTable() {
        // Create cells in table
        const cells = [];
        for (let i= 0; i < 20; i++) {
            for (let j = 0; j < 1; j++) {
                if (j == 0) {
                    const cellText = `${results[i]['name']}`;
                    cells.push(<td key={`${i}-${j}`}>{cellText}</td>);
                }
            }
        }
        // Create rows
        const rows = [];
        for (let i = 0; i < 20; i++) {
            rows.push(<tr key={i}>{cells.slice(i * 1, (i + 1) * 1)}</tr>);
        }
        // Return the table
        return (
            <table>{<thead>{generateArtistHeader()}</thead>}
              <tbody>{rows}</tbody>
            </table>
        );
    }
        

    return (
        <div className={styles.explore_container}>
          <HelmetProvider>
            <Helmet>
              <title>Explore | MusicPlaylists</title>
            </Helmet>
          </HelmetProvider>
          <div className={styles.explore_dropdown}>
            <select onChange={(e) => setSelectedOption(e.target.value)} value = {selectedOption}>
                <option className={styles.dropdown_content} value="topTracks">Top Tracks</option>
                <option className={styles.dropdown_content}  value="topArtists">Top Artists</option>
            </select>
           </div>
        <div className={styles.table_container}>{generateTable()}</div>
        </div>
    );
}

export default Explore;