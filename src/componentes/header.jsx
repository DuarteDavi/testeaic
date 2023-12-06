import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaBell, FaCog } from 'react-icons/fa';
import '../css/header.css';
import { Link } from 'react-router-dom';
function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      const request = window.indexedDB.open('UserDatabase', 6);
      request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['users'], 'readonly');
        const objectStore = transaction.objectStore('users');
        const getRequest = objectStore.get(userEmail);
        getRequest.onsuccess = function() {
          const userData = getRequest.result;
          if (userData && userData.imagem) {
            setUserImage(userData.imagem);
          }
        };
      };
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');

  };
  return (
    <header className="header">
      <div className="logo">
      <Link to="/">
          {userImage && <img src={userImage} alt="User Profile" className="user-profile-image" />}
        </Link>
      </div>
      <div className="icons">
        <div className="icon envelope">
          <FaEnvelope aria-label="Messages" />
        </div>
        <div className="icon notification">
          <FaBell aria-label="Notifications" />
         
        </div>
        <div className="icon settings" onClick={toggleDropdown}>
        <FaCog aria-label="Settings" />
        {dropdownVisible && (
          <div className="dropdown">
            <ul>
              <li><Link to="/settings">Configurações</Link></li>
              <li><Link to="/privacy">Privacidade</Link></li>
              <li><a href="/" onClick={handleLogout}>Sair</a></li>
            </ul>
          </div>
        )}
        
        </div>
      </div>
    </header>
  );
}

export default Header;
