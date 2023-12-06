import React from 'react';
import { Link } from 'react-router-dom';
import '../css/sidebar.css'
function Sidebar() {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li><Link to="/meus-anuncios">Meus Anúncios</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;