import React, { useState } from 'react';
import '../css/cadastro.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [genero, setGenero] = useState('');
  const [celular, setCelular] = useState('');
  const [senha, setSenha] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [imagemPerfil, setImagemPerfil] = useState(null);

  const handleTipoUsuarioChange = (e) => setTipoUsuario(e.target.value);
  const handleNomeChange = (e) => setNome(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleGeneroChange = (e) => setGenero(e.target.value);
  const handleCelularChange = (e) => setCelular(e.target.value);
  const handleSenhaChange = (e) => setSenha(e.target.value);
  const handleImagemChange = (e) => setImagemPerfil(e.target.files[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Crie um novo FileReader para ler o arquivo de imagem
    const reader = new FileReader();

    reader.onload = (readEvent) => {
      // Abra uma conexão com o IndexedDB
      const request = window.indexedDB.open('UserDatabase', 2);

      request.onerror = (event) => {
        console.error("Database error: " + event.target.errorCode);
      };

      request.onupgradeneeded = (event) => {
        // Crie um novo object store para os dados do usuário, se necessário
        const db = event.target.result;
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'email' });
        }
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['users'], 'readwrite');
        const objectStore = transaction.objectStore('users');
        const userData = {
          nome,
          email,
          genero,
          celular,
          senha,
          tipoUsuario,
          imagem: readEvent.target.result // Armazena a imagem como uma string base64
        };
        const addUserRequest = objectStore.add(userData);

        addUserRequest.onsuccess = () => {
          const mockToken = `token_${new Date().getTime()}`;
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userType', tipoUsuario);
          localStorage.setItem('sessionToken', mockToken);
          setIsLoggedIn(true); // Atualiza o estado para refletir que o usuário está logado
          navigate('/');
        };

        transaction.onerror = (transactionEvent) => {
          console.error("Transaction error: " + transactionEvent.target.errorCode);
        };
      };
    };

    // Se uma imagem foi carregada, leia como base64, caso contrário, adicione o usuário sem a imagem
    if (imagemPerfil) {
      reader.readAsDataURL(imagemPerfil);
    } else {
      // Se não houver imagem, inicie o processo de adição sem ela
      reader.onloadend();
    }
  };

  if (redirectToHome) {
    return <Navigate to="/" />;
  }





  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit} className="cadastro-form">
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={handleNomeChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genero">Gênero:</label>
          <input
            type="text"
            id="genero"
            value={genero}
            onChange={handleGeneroChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="celular">Celular:</label>
          <input
            type="text"
            id="celular"
            value={celular}
            onChange={handleCelularChange}
            required
          />
        </div>
        <div className="form-group">
        <label htmlFor="imagemPerfil">Imagem de Perfil:</label>
        <input
          type="file"
          id="imagemPerfil"
          onChange={handleImagemChange}
          required
        />
      </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={handleSenhaChange}
            required
          />
        </div>
        <div className="form-group">
  <label htmlFor="tipoUsuario">Tipo de Usuário:</label>
  <select
    id="tipoUsuario"
    value={tipoUsuario}
    onChange={handleTipoUsuarioChange}
    required
  >
    <option value="">Selecione</option>
    <option value="cliente">Cliente</option>
    <option value="imobiliaria">Imobiliária</option>
  </select>
</div>
        <p className='plogin'>Já tem conta?  <Link to={'/login'}>Faça Login</Link>
        </p>
        <button type="submit" className="submit-button">
          Cadastrar
        </button>
      </form>
      {redirectToHome && <Navigate to="/" replace />}
    </div>
  );
}

export default Cadastro;
