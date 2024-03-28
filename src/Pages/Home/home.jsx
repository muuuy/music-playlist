import React, { Component } from "react";
import './home.css';
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from '../../Components/Navbar/Navbar';

class Home extends Component {
    render () {
        return (
            <div>
                <HelmetProvider>
                    <Helmet>
                        <title>Home | MusicPlaylists</title>
                    </Helmet>   
                </HelmetProvider>

                <div></div>
            </div>
        )
    }
};

export default Home;
