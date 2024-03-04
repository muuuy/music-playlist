import React from 'react';
import './Sidebar.css';
import { FaHome } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";





const Sidebar = () => {
    return (
        <>
        <div id='sidebar-burger'>
            <GiHamburgerMenu />
        </div>
        <div id='sidebar-container'>
            <ul>
                <li><a href='/'><FaHome />      Home</a></li>
                <li><a href=''><FaMusic />      Library</a></li>
                <li><a href=''><FaCompass />      Explore</a></li>
            </ul>
        </div>
        </>
    );
}

export default Sidebar;