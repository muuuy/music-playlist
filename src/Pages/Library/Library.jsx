import React, { Component } from 'react';
import './Library.css';
import { Helmet } from "react-helmet";
import Navbar from '../../Components/Navbar/Navbar';

class Library extends Component {
    render () {
        return (
            <div>
                <Helmet>
                    <title>Library | MusicPlaylists</title>
                </Helmet>   

                <Navbar />

                <div>
                    <div className='playlist__display'>
                        <img src='' alt='Playlist Image'></img>
                        <p className='playlist__title'>Hey</p>
                        <p className='playlist__num-'>Hey</p>
                        <p>why?</p>
                        <p className='playlist__temp'>hello?</p>
                    </div>
                </div>
                
            </div>
        )
    }
};

export default Library;