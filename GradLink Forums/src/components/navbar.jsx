import React, { useState } from 'react';
import Logo from './GradLink.svg';
import './Navbar.css';

const Navbar = ({ posts, setFilteredPosts }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (posts) {
            const filteredPosts = posts.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.body.toLowerCase().includes(query) ||
                post.user.toLowerCase().includes(query)
            );
            setFilteredPosts(filteredPosts);
        }
    };

    return (
        <nav className="top-navbar">
            <a href="/"><img src={Logo} alt="Logo" className="logo" /></a>
            <input
                className="search-bar"
                type="text"
                placeholder="🔍 Search For Posts"
                value={searchQuery}
                onChange={handleSearch}
            />
        </nav>
    );
}

export default Navbar;
