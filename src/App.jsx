import './App.css';
import Navbar from './Components/Navbar/Navbar';
import LoginForm from './Components/LoginForm/LoginForm';
import SignupForm from './Components/SignupForm/SignupForm';
import ForgotForm from './Components/ForgotForm/ForgotForm';
import Home from './Pages/Home/home';
import Library from './Pages/Library/Library';
import SongResults from './Pages/Results/results_by_song'
import ArtistResults from './Pages/Results/results_by_artist'
import Password from './Pages/Password/Password'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import CreatePlaylist from './Pages/CreatePlaylist/CreatePlaylist';
import PlaylistTemplate from './Pages/PlaylistTemplate/PlaylistTemplate'
import PlaylistCard from './Components/PlaylistCard/PlaylistCard'

function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch('https://localhost:5173/')
  //   .then (res => res.json()) 
  //   .then (res => console.log(res))
  //   .catch (error => console.log(error))
  // }, [])
  
  return (
    <div id="app-container">
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/forgot' element={<ForgotForm />} />
          <Route path='/library' element={<Library />} />
          {/* <Route path='/explore' element={<Explore />} /> */}
          <Route path='/results_by_song' element={<SongResults />} />
          <Route path='/results_by_artist' element={<ArtistResults />} />
          <Route path='/password' element={<Password />} />
          <Route path='/create_playlist' element={<CreatePlaylist />} />
          <Route path='/playlist_template' element={<PlaylistTemplate />} />
          <Route path='/playlist_card' element={<PlaylistCard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;