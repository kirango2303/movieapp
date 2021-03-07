import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

function Header() {
    const {currentUser} = useAuth()

    return (
        <div className="header">
            <img 
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png" alt="Netflix Logo"/>
     </div>

    )
}

export default Header;


    
