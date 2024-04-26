import { useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./results.module.css";

import SongCard from "../../Components/SongCard/SongCard";

const ResultsByArtist = () => {
  const { state } = useLocation();
  const { artistResults } = state;

  // function generateHeaderRow() {
  //     return (
  //         <tr>
  //             <th>Add</th>
  //             <th>Song Name</th>
  //             <th>Artist</th>
  //             <th>Album</th>
  //             <th>Release Year</th>
  //         </tr>
  //     )
  // }

  const populateSong = () => {
    const resultsArray = artistResults.results;
    const arrayLength = resultsArray.length;
    console.log("!", resultsArray);

    if (arrayLength === 0) {
      return <div>No Results Found</div>;
    }
    
    const songCards = [];
    for (let i = 0; i < arrayLength; i++) {
      let name = `${resultsArray[i]["name"]}`;
      let artistName = `${resultsArray[i]["artist_names"][0]}`;
      let albumName = `${resultsArray[i]["album_names"][0]}`;
      let releaseDate = `${resultsArray[i]["release_dates"][0].substring(
        0,
        10
      )}`;

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

  // function generateTable() {
  //   const resultsArray = artistResults.results;
  //   const arrayLength = resultsArray.length;
  //   console.log("!", resultsArray);

  //   if (arrayLength == 0) {
  //     return <div>No Results Found</div>;
  //   }

  //   // Create all cells in table
  //   const cells = [];
  //   for (let i = 0; i < arrayLength; i++) {
  //     for (let j = 0; j < 5; j++) {
  //       if (j === 0) {
  //         const cellText = `+`;
  //         cells.push(
  //           <td className={styles.add_cell} key={`${i}-${j}`}>
  //             {cellText}
  //           </td>
  //         );
  //       }
  //       if (j === 1) {
  //         const cellText = `${resultsArray[i]["name"]}`;
  //         cells.push(<td key={`${i}-${j}`}>{cellText}</td>);
  //       }
  //       if (j === 2) {
  //         const cellText = `${resultsArray[i]["artist_names"][0]}`;
  //         cells.push(<td key={`${i}-${j}`}>{cellText}</td>);
  //       }
  //       if (j === 3) {
  //         const cellText = `${resultsArray[i]["album_names"][0]}`;
  //         cells.push(<td key={`${i}-${j}`}>{cellText}</td>);
  //       }
  //       if (j === 4) {
  //         const cellText = `${resultsArray[i]["release_dates"][0].substring(
  //           0,
  //           10
  //         )}`;
  //         cells.push(<td key={`${i}-${j}`}>{cellText}</td>);
  //       }
  //     }
  //   }
  //   // Create all rows in table
  //   const rows = [];
  //   for (let i = 0; i < arrayLength; i++) {
  //     rows.push(<tr key={i}>{cells.slice(i * 5, (i + 1) * 5)}</tr>);
  //   }
  //   // Return the table
  //   return (
  //     <table>
  //       {/* <thead>
  //                   {generateHeaderRow()}
  //               </thead> */}
  //       <tbody>{rows}</tbody>
  //     </table>
  //   );
  // }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Result by Artist | MusicPlaylists</title>
        </Helmet>
      </HelmetProvider>

      <div className={styles.table_container}>
        <div style={{ border: "2px solid var(--dark-red)" }}>
          {populateSong()}
        </div>
      </div>
    </>
  );
};

export default ResultsByArtist;
