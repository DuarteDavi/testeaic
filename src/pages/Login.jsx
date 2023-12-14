import React, { useState } from 'react';
import '../css/login.css';
import { Link, Navigate } from 'react-router-dom';



const checkUserCredentials = async (email, password) => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('UserDatabase', 2);

    request.onerror = function(event) {
      reject("Database error: " + event.target.errorCode);
    };

    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(['users'], 'readonly');
      const objectStore = transaction.objectStore('users');
      const userRequest = objectStore.get(email);

      userRequest.onsuccess = function(event) {
        const user = event.target.result;
        if (user && user.senha === password) {
          resolve(user);
        } else {
          resolve(null);
        }
      };

      userRequest.onerror = function(event) {
        reject("Couldn't retrieve user data: " + event.target.errorCode);
      };
    };
  });
};


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await checkUserCredentials(email, password);
      if (user) {
        // Se o usuário for encontrado e a senha estiver correta:
        // 1. Gera um token simulado.
        const mockToken = `token_${new Date().getTime()}`;
        // 2. Armazena o token no localStorage.
        localStorage.setItem('sessionToken', mockToken);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userType', user.tipoUsuario);
        setIsLoggedIn(true);
      } else {
        // Se o usuário não for encontrado ou a senha estiver incorreta:
        // Informa ao usuário que o login falhou.
        alert('E-mail não cadastrado ou senha incorreta');
      }
    } catch (error) {
      // Trata qualquer erro que possa ter ocorrido durante o processo de login.
      console.error(error);
      alert('Ocorreu um erro durante o login.');
    }
  };
  if (isLoggedIn) {
    // Se o estado 'isLoggedIn' for verdadeiro, redirecione para a página inicial.
    return <Navigate to="/" />;
  }
 
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Entrar
        </button>
      </form>
      <p>
        Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </div>
  );
}

export default Login;
