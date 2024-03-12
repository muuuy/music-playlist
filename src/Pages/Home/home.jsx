import React, { Component } from "react";
import './home.css';
import { Helmet } from "react-helmet";
import Navbar from '../../Components/Navbar/Navbar';

class Home extends Component {
    render () {
        return (
            <div>
                <Helmet>
                    <title>Home | MusicPlaylists</title>
                </Helmet>   

                <Navbar />

                <div></div>
            </div>
        )
    }
};

export default Home;
