import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";

const Sidebar = () => {
    

    return(
        <nav id='sidebar-container'>
            <ul>
                <li id='sidebar-logo'>LOGO PLACEHOLDER</li>
                <li id='sidebar-item'><span id='sidebar-icon'><FaHome /></span>    Home</li>
                <li id='sidebar-item'><span id='sidebar-icon'><FaMusic /></span>    Music</li>
                <li id='sidebar-item'><span id='sidebar-icon'><FaCompass /></span>    Explore</li>
                <li><hr /></li>
            </ul>
        </nav>
        
    );
}

export default Sidebar;