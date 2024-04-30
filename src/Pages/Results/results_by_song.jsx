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
