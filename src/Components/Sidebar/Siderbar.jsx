import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Drawer, Button } from '@mui/material';

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (status) => () => {
        setOpen(status);
    };

    const DrawerList = (
        <div id='sidebar-container'>
            <a href="/">
                <FaHome /> Home
            </a>
            <a href="/music">
                <FaMusic /> Music
            </a>
            <a href="/explore">
                <FaCompass /> Explore
            </a>
        </div>
    );

    return(
        <>
            <Button onClick={toggleDrawer(true)}><GiHamburgerMenu /></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
        
    );
}

export default Sidebar;