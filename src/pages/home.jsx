import React, { useState, useEffect, useCallback } from "react";
import Header from "../componentes/header";
import '../css/home.css'


function AnuncioForm({ titulo, onChangeTitulo, endereco, onChangeEndereco, valor, onChangeValor, onSubmit }) {
    return (
      <div className="anuncio-form-container">
        <h2>Criar Anúncio de Imóvel</h2>
        <form className="anuncio-form" onSubmit={onSubmit}>
          <input
            type="text"
            id="titulo"
            name="titulo"
            className="form-control"
            value={titulo}
            onChange={onChangeTitulo}
            placeholder="Título"
            required
          />
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={endereco}
            onChange={onChangeEndereco}
            placeholder="Endereço"
            required
          />
          <input
            type="text"
            id="valor"
            name="valor"
            value={valor}
            onChange={onChangeValor}
            placeholder="Valor"
            required
          />
          <button type="submit">Criar Anúncio</button>
        </form>
      </div>
    );
  }


const Home = () => {
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [valor, setValor] = useState('');



  useEffect(() => {
    // Simulando a recuperação do tipo de usuário do local storage ou de um contexto/global state
    const userToken = localStorage.getItem('sessionToken');
    // Simulação de decodificação do token para obter o tipo de usuário
    // Na prática, você pode querer decodificar um JWT ou realizar uma consulta ao IndexedDB
    const userType = userToken ? 'imobiliaria' : 'cliente'; // Simulação, substituir pela lógica adequada
    setTipoUsuario(userType);
  }, []);

 
  const handleTituloChange = useCallback((e) => {
    setTitulo(e.target.value);
  }, []);

  const handleEnderecoChange = useCallback((e) => {
    setEndereco(e.target.value);
  }, []);

  const handleValorChange = useCallback((e) => {
    setValor(e.target.value);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Abra uma conexão com o IndexedDB
    const request = window.indexedDB.open('ImoveisDatabase', 1);

    request.onerror = (event) => {
      console.error("Database error: " + event.target.errorCode);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('anuncios')) {
        db.createObjectStore('anuncios', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['anuncios'], 'readwrite');
      const objectStore = transaction.objectStore('anuncios');
      const userEmail = localStorage.getItem('userEmail');
      const anuncioData = {
        titulo,
        endereco,
        valor,
        userEmail 
      };
      const addAnuncioRequest = objectStore.add(anuncioData);

      addAnuncioRequest.onsuccess = () => {
        console.log('Anúncio adicionado com sucesso!');
        // Limpar campos ou realizar outras ações necessárias após o cadastro
      };

      transaction.onerror = (transactionEvent) => {
        console.error("Transaction error: " + transactionEvent.target.errorCode);
      };
    };
  };


  return (
    <div>
      <Header />
      
      {tipoUsuario === 'imobiliaria' && (
        <AnuncioForm
          titulo={titulo}
          onChangeTitulo={handleTituloChange}
          endereco={endereco}
          onChangeEndereco={handleEnderecoChange}
          valor={valor}
          onChangeValor={handleValorChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Home;
