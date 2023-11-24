import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li><Link to="/meus-anuncios">Meus Anúncios</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
          {/* Adicione outros links conforme necessário */}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;