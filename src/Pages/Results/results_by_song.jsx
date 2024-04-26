import { useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./results.module.css";

import SongCard from "../../Components/SongCard/SongCard";

const ResultsBySong = () => {
  const { state } = useLocation();
  const { songResults } = state;

  const populateSong = () => {
    const resultsArray = songResults.results;
    const arrayLength = resultsArray.length;
    console.log("!", resultsArray);

    if (arrayLength === 0) {
        return <div>No Results Found</div>;
    }

    const songCards = [];
    for (let i = 0; i < arrayLength; i++) {
        let name = `${resultsArray[i]["name"]}`;
        let artistName = `${resultsArray[i]["artists"][0]["name"]}`;
        let albumName = `${resultsArray[i]["album"]["name"]}`;
        let releaseDate = `${resultsArray[i]["album"]["release_date"]}`;

        songCards.push(
          <SongCard
            songName={name}
            artistName={artistName}
            albumName={albumName}
            releaseDate={releaseDate}
            buttonSymbol="⭕️"
          />
        );
      }
    

    return songCards;
  };

  function generateTable() {
    const resultsArray = songResults.results;
    const arrayLength = resultsArray.length;
    console.log("!", resultsArray);

    // If array length is 0, display "No Results Found" message
    if (arrayLength === 0) {
      return <div>No Results Found</div>;
    }

    // Create all cells in table
    const cells = [];
    for (let i = 0; i < arrayLength; i++) {
      for (let j = 0; j < 5; j++) {
        if (j === 0) {
          const cellText = `*`;
          cells.push(<td key={`${i}-${j}`}>{cellText}</td>);
        }
        if (j === 1) {
          const cellText = `${resultsArray[i]["name"]}`;
          cells.push(<td key={`${i}-${j}`}>{cellText}</td>);
        }
        if (j === 2) {
          const cellText = `${resultsArray[i]["artists"][0]["name"]}`;
          cells.push(<td key={`${i}-${j}`}>{cellText}</td>);
        }
        if (j === 3) {
          const cellText = `${resultsArray[i]["album"]["name"]}`;
          cells.push(<td key={`${i}-${j}`}>{cellText}</td>);
        }
        if (j === 4) {
          const cellText = `${resultsArray[i]["album"]["release_date"]}`;
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
        <thead>{generateHeaderRow()}</thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Result by Song | MusicPlaylists</title>
        </Helmet>
      </HelmetProvider>

      <div className={styles.table_container}>
        <div style={{border: '2px solid var(--dark-red)'}}>
          {populateSong()}
        </div>
      </div>
    </>
  );
};

export default ResultsBySong;
