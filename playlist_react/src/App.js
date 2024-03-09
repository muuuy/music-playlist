import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/home';
import SongResults from './Components/Results/results_by_song';
import ArtistResults from './Components/Results/results_by_artist';
import LoginForm from './Components/LoginForm/LoginForm';
import SignupForm from './Components/SignupForm/SignupForm';
import ForgotForm from './Components/ForgotForm/ForgotForm';

// i was testing connecting to flask - this prints twice to the console
function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/'
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
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/forgot' element={<ForgotForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
