import React, { useState, useEffect, useCallback } from "react";
import Header from "../componentes/header";
import '../css/home.css'
import { Link } from 'react-router-dom';
import Sidebar from "../componentes/sidebar";
function AnuncioForm({ titulo, onChangeTitulo, endereco, onChangeEndereco, valor, onChangeValor, onSubmit, onChangeFotoCapa, onChangeFotosAdicionais,descricao, onChangeDescricao,
  contato, onChangeContato,  }) {
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
          <textarea
        id="descricao"
        name="descricao"
        value={descricao}
        onChange={onChangeDescricao}
        placeholder="Descrição do imóvel"
        required
      />
      <input
        type="text"
        id="contato"
        name="contato"
        value={contato}
        onChange={onChangeContato}
        placeholder="Informações de contato"
        required
      />
          <p className="select_image">Selecionar imagem</p>
      <input
  type="file"
  id="fotoCapa"
  name="fotoCapa"
  accept="image/*"
  onChange={onChangeFotoCapa}
/>
<p className="select_images">Mais fotos</p>
<input
  type="file"
  id="fotosAdicionais"
  name="fotosAdicionais"
  accept="image/*"
  multiple
  onChange={onChangeFotosAdicionais}
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
  const [anuncios, setAnuncios] = useState([]);
  const [imagens, setImagens] = useState([]);
  const [fotoCapa, setFotoCapa] = useState(null);
  const [fotosAdicionais, setFotosAdicionais] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [contato, setContato] = useState('');

  const handleImagensChange = useCallback((e) => {
    // Armazene as imagens no estado como um array de arquivos
    setImagens([...e.target.files]);
  }, []);
  const handleFotoCapaChange = useCallback((e) => {
    setFotoCapa(e.target.files[0]); // Só uma foto de capa
  }, []);
  
  const handleFotosAdicionaisChange = useCallback((e) => {
    setFotosAdicionais([...e.target.files]); // Várias fotos adicionais
  }, []);

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
  const handleDescricaoChange = useCallback((e) => {
    setDescricao(e.target.value);
  }, []);

  const handleContatoChange = useCallback((e) => {
    setContato(e.target.value);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Abra uma conexão com o IndexedDB
    const request = window.indexedDB.open('ImoveisDatabase', 4);

    request.onerror = (event) => {
      console.error("Database error: " + event.target.errorCode);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      let objectStore;
      if (!db.objectStoreNames.contains('anuncios')) {
        objectStore = db.createObjectStore('anuncios', { keyPath: 'id', autoIncrement: true });
      } else {
        // Se o object store já existe, obter referência a ele.
        objectStore = request.transaction.objectStore('anuncios');
      }
      
      // Criar o índice userEmail se ele não existir
      if (!objectStore.indexNames.contains('userEmail')) {
        objectStore.createIndex('userEmail', 'userEmail', { unique: false });
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
        userEmail,
        fotoCapa, // A imagem de capa é um único arquivo
        fotosAdicionais,
        descricao,
        contato,
      };
      const addAnuncioRequest = objectStore.add(anuncioData);

      addAnuncioRequest.onsuccess = () => {
        console.log('Anúncio adicionado com sucesso!');
        // Limpar campos ou realizar outras ações necessárias após o cadastro
      
        setTitulo('');
        setEndereco('');
        setValor('');
        setFotoCapa(null);
        setFotosAdicionais([]);
      };

      transaction.onerror = (transactionEvent) => {
        console.error("Transaction error: " + transactionEvent.target.errorCode);
      };
    };
  };
  const handleRecuperarAnuncios = () => {
    // Abra uma conexão com o IndexedDB
    const request = window.indexedDB.open('ImoveisDatabase', 4);

    request.onerror = (event) => {
      console.error("Database error: " + event.target.errorCode);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['anuncios'], 'readonly');
      const objectStore = transaction.objectStore('anuncios');
      const userEmail = localStorage.getItem('userEmail');

      const myIndex = objectStore.index('userEmail'); // Supondo que você tem um índice 'userEmail' nos seus anúncios
      const getAllRequest = myIndex.getAll(userEmail); // Recupera todos os anúncios com o e-mail do usuário

      getAllRequest.onsuccess = () => {
        setAnuncios(getAllRequest.result); // Atualiza o estado com os anúncios recuperados

        const anunciosRecuperados = getAllRequest.result.map(anuncio => {
          // Crie URLs de objeto para as imagens se elas existirem
          return {
            ...anuncio,
            fotoCapaUrl: anuncio.fotoCapa ? URL.createObjectURL(anuncio.fotoCapa) : null,
            fotosAdicionaisUrls: anuncio.fotosAdicionais ? anuncio.fotosAdicionais.map(foto => URL.createObjectURL(foto)) : []
          };
        });
        setAnuncios(anunciosRecuperados); // Atualiza o estado com os anúncios recuperados
      
      };
      
    };
    
  };


  return (
    <div>
      <Header />
      <div className="content_home_side">
      <Sidebar/>
      {tipoUsuario === 'imobiliaria' && (

        
        <AnuncioForm
          titulo={titulo}
          onChangeTitulo={handleTituloChange}
          endereco={endereco}
          onChangeEndereco={handleEnderecoChange}
          valor={valor}
          onChangeValor={handleValorChange}
          onSubmit={handleSubmit}
          onChangeImagens={handleImagensChange}
          onChangeFotoCapa={handleFotoCapaChange}
          onChangeFotosAdicionais={handleFotosAdicionaisChange}
          descricao={descricao}
          onChangeDescricao={handleDescricaoChange}
          contato={contato}
          onChangeContato={handleContatoChange}
        />
      )}
      </div>
<div className="anuncio-container">

  {anuncios.map(anuncio => (
    <div className="anuncio-card" key={anuncio.id}>
      {/* Substitua 'path-to-image' pelo caminho para a imagem do anúncio */}
      <img src="path-to-image" alt="Imagem do Imóvel" />
      <div className="anuncio-card-body">
        <h3 className="anuncio-title">{anuncio.titulo}</h3>
        <p className="anuncio-endereco">Endereço:  {anuncio.endereco}</p>
        <p className="anuncio-valor">Valor:  {anuncio.valor}</p>
        <img src={anuncio.fotoCapaUrl || 'placeholder-image-url'} alt="Capa do Anúncio" />

        
        <div className="anuncio-actions">
          <button>Mais detalhes</button>
          <button>Editar</button>
          <button>Deletar</button>
        </div>
      </div>
    </div>
  ))}
</div>


<button onClick={handleRecuperarAnuncios}>Ver Meus Anúncios</button>
    </div>
    
  );
};

export default Home;
