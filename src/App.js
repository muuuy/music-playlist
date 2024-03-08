import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import SongResults from './pages/results_by_song';
import ArtistResults from './pages/results_by_artist';
import './App.css';


// i was testing connecting to flask - this prints twice to the console
function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000'
    ).then(
      res => res.json()
    ).then(
      res => console.log(res)
    ).catch(
      error => console.log(error)
    )
  }, [])


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/results_by_song" element={<SongResults />} />
          <Route path="/results_by_artist" element={<ArtistResults />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
