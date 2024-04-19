import React from 'react';
import Logo from './GradLink.svg';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="top-navbar">
            <img src={Logo} alt="Logo" className="logo" />
            <input className="search-bar" type="text" placeholder="🔍 Search For Posts" />
        </nav>
    );
}

export default Navbar;
