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

function App() {
  
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch('https://localhost:5173/')
  //   .then (res => res.json()) 
  //   .then (res => console.log(res))
  //   .catch (error => console.log(error))
  // }, [])
  
  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/forgot' element={<ForgotForm />} />
          <Route path='/library' element={<Library />} />
          <Route path='/results_by_song' element={<SongResults />} />
          <Route path='/results_by_artist' element={<ArtistResults />} />
          <Route path='/password' element={<Password />} />
        </Routes> 
      </div>      
    </>
    
  );
}

export default App;