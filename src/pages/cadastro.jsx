import React, { useState } from 'react';
import '../css/cadastro.css';
import { Link } from 'react-router-dom';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [genero, setGenero] = useState('');
  const [celular, setCelular] = useState('');
  const [senha, setSenha] = useState('');

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGeneroChange = (e) => {
    setGenero(e.target.value);
  };

  const handleCelularChange = (e) => {
    setCelular(e.target.value);
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do formulário para o servidor
    const userData = {
      nome,
      email,
      genero,
      celular,
      senha,
    };
    console.log(userData); // Exemplo de exibição dos dados no console
  };

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
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={handleSenhaChange}
            required
          />
        </div>
        <p className='plogin'>Já tem conta?  <Link to={'/login'}>Faça Login</Link>
        </p>
        <button type="submit" className="submit-button">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Cadastro;
