import React from 'react';
import { FaEnvelope, FaBell, FaCog } from 'react-icons/fa'; // Importe os ícones que você precisa
import '../css/header.css'

function Header() {
  return (
    <header className="header">
      {/* Logo à esquerda */}
      <div className="logo">
        <img src="/caminho/para/sua/logo.png" alt="Logo" />
      </div>

      {/* Ícone de mensagem */}
      <div className="icon">
        <FaEnvelope />
      </div>

      {/* Notificação */}
      <div className="notification">
        <FaBell />
      </div>

      {/* Engrenagem */}
      <div className="settings">
        <FaCog />
      </div>
    </header>
  );
}

export default Header;
