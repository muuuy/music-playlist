import React from "react";
import { useLocation } from "react-router-dom"
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from '../../Components/Navbar/Navbar';
import './results.css';


const ResultsBySong = () => {
    const { state } = useLocation();
    const { songResults } = state;

    function generateHeaderRow() {
        return (
            <tr>
                <th>Add</th>
                <th>Song Name</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Release Year</th>
            </tr>
        )
    }

    function generateTable() {
        const resultsArray = songResults.results;
        const arrayLength = resultsArray.length;
        console.log("!", resultsArray);
        // Create all cells in table
        const cells = [];
        for (let i = 0; i < arrayLength; i++) {
            for (let j = 0; j < 5; j++) {
                if (j === 0) {
                    const cellText = `*`;
                    cells.push(<td key={`${i}-${j}`}>{cellText}</td>);
                }
                if (j === 1) {
                    const cellText = `${resultsArray[i]['name']}`;
                    cells.push(<td key={`${i}-${j}`}>{cellText}</td>);
                }
                if (j === 2) {
                    const cellText = `${resultsArray[i]['artist_names'][0]}`;
                    cells.push(<td key={`${i}-${j}`}>{cellText}</td>);
                }
                if (j === 3) {
                    const cellText = `${resultsArray[i]['album'][0]['name']}`;
                    cells.push(<td key={`${i}-${j}`}>{cellText}</td>);
                }
                if (j === 4) {
                    const cellText = `${resultsArray[i]['album'][0]['release_date']}`;
                    cells.push(<td key={`${i}-${j}`}>{cellText}</td>);
                }
            }
        }
        // Create all rows in table
        const rows = [];
        for (let i = 0; i < arrayLength; i++) {
            rows.push(<tr key={i}>{cells.slice(i * 5, (i + 1) * 5)}</tr>);
        }
        // Return the table
        return (
            <table>
                <thead>
                    {generateHeaderRow()}
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }

    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>Home | MusicPlaylists</title>
                </Helmet>
            </HelmetProvider>

            <div className="navbar">
                <Navbar />
            </div>

            <div className="table-container">
                {generateTable()}
            </div>
        </div>
    );
};

export default ResultsBySong;