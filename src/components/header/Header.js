import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';
import {db} from "../../services/firebase"
import BrowsePage from '../browse/BrowsePage';

function Header() {
    const { currentUser, logout } = useAuth()
    const history = useHistory
    const [error, setError] = useState("")
    const [value, setValue] = useState("")

    async function handleLogout(e) {
        setError('')

        try {
            await logout()
            history.push('/login')
        }
        catch {
            setError("Failed to log out")
        }
    }

    return (
        <>
        <div className="navBar" style={{position: "fixed", backgroundColor: "rgba(0, 0, 0, 0.75)", top: "0px", width: "100%", height: "50px", zIndex: "1"}}>
            <div className="navContents">
                <img className="logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png" />
      
                <div className="navigation">
                    <div onClick={(e) => handleLogout(e)} className="button-logout" style={{ position: "fixed", right: "15px", zIndex: "999"}} >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" />

                        <div className="logout">LOGOUT</div>

                    </div>
                </div>
            </div>
        </div>
        </>

    )
}

export default Header;



