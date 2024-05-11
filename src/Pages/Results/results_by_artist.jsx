import { useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./results.module.css";

import SongCard from "../../Components/SongCard/SongCard";

const ResultsByArtist = () => {
  const { state } = useLocation();
  const { artistResults } = state;

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
        <SongCard key={i}
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
