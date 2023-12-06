import React, { useState, useEffect, useCallback } from "react";
import Header from "../componentes/header";
import '../css/home.css'
import { Link } from 'react-router-dom';
import Modal from "../componentes/modal";



import Sidebar from "../componentes/sidebar";
function AnuncioForm({ titulo, onChangeTitulo, endereco, onChangeEndereco, valor, onChangeValor, onSubmit, onChangeFotoCapa, onChangeFotosAdicionais,descricao, onChangeDescricao,vagas, onChangeVagas,quartos, onChangeQuartos,banheiros, onChangeBanheiros, taxaCondominio, onChangeTaxaCondominio,
  contato, onChangeContato,telefone, onChangeTeefone  }) {
    return (
      <div className="anuncio-form-container">
        <h2>Criar Anúncio de Imóvel</h2>
        <form className="anuncio-form" onSubmit={onSubmit}>
        <div className="form-group">
        <label htmlFor="titulo">Título:</label>
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
          </div>
          <div className="form-group">
          <label htmlFor="endereco">Cidade:</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={endereco}
            onChange={onChangeEndereco}
            placeholder="Cidade"
            required
          />
          </div>
           <div className="form-group">
           <label htmlFor="valor">Valor:</label>
          <input
            type="text"
            id="valor"
            name="valor"
            value={valor}
            onChange={onChangeValor}
            placeholder="Valor"
            required
          /></div>
          <label htmlFor="contato" className="titulo_inputs">Descrição do anuncio:</label>
           <div className="form-groupp">
           
          <textarea className="textarea"
        id="descricao"
        name="descricao"
        value={descricao}
        onChange={onChangeDescricao}
        placeholder="Descrição do imóvel"
        required
      /></div>
       <div className="form-group">
       <label htmlFor="contato">Informações de Contato:</label>
      <input
        type="text"
        id="contato"
        name="contato"
        value={contato}
        onChange={onChangeContato}
        placeholder="Informações de contato"
        required
      />
      </div>
      <div className="form-group">
       <label htmlFor="contato">Contato:</label>
      <input
        type="text"
        id="telefone"
        name="telefone"
        value={telefone}
        onChange={onChangeTeefone}
        placeholder="Telefone"
        required
      />
      </div>
       <div className="form-group">
       <label htmlFor="quartos">Número de Quartos:</label>
      <input
  type="number"
  id="quartos"
  name="quartos"
  value={quartos}
  onChange={onChangeQuartos}
  placeholder="Número de Quartos"
  required
  min="0" 
/>
</div>
<div className="form-group">
<label htmlFor="banheiros">Número de Banheiros:</label>
<input
  type="number"
  id="banheiros"
  name="banheiros"
  value={banheiros}
  onChange={onChangeBanheiros}
  placeholder="Número de Banheiros"
  required
  min="0" 
/>
</div>
<div className="form-group">
<label htmlFor="taxaCondominio">Valor da Taxa de Condomínio:</label>
<input
  type="text"
  id="taxaCondominio"
  name="taxaCondominio"
  value={taxaCondominio}
  onChange={onChangeTaxaCondominio}
  placeholder="Valor da Taxa de Condomínio"
  required
/>
</div>
<div className="form-group">
<label htmlFor="vagas">Vagas de Garagem:</label>
      <input
          type="text"
          id="vagas"
          name="vagas"
          value={vagas}
          onChange={onChangeVagas}
          placeholder="Vagas de garagem"
          required
        />
   
          </div>
          <div className="form-group">
          <label>Selecionar imagem de capa:</label>   
      <input
  type="file"
  id="fotoCapa"
  name="fotoCapa"
  accept="image/*"
  onChange={onChangeFotoCapa}
/>
</div>


<div className="form-group">
<label>Selecionar imagens adicionais:</label>
<input
  type="file"
  id="fotosAdicionais"
  name="fotosAdicionais"
  accept="image/*"
  multiple
  onChange={onChangeFotosAdicionais}
/>
</div>
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
  const [telefone, setTelefone] = useState('');
  const [vagas, setVagas] = useState('');
  const [quartos, setQuartos] = useState('');
  const [banheiros, setBanheiros] = useState('');
  const [taxaCondominio, setTaxaCondominio] = useState('');
  const [valorMaximo, setValorMaximo] = useState('');
  const [cidadePesquisa, setCidadePesquisa] = useState('');

  const [anunciosFiltrados, setAnunciosFiltrados] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [anuncioSelecionado, setAnuncioSelecionado] = useState(null);


  useEffect(() => {
    const carregarAnuncios = () => {
      const request = window.indexedDB.open('ImoveisDatabase', 6);
  
      request.onerror = (event) => {
        console.error("Erro ao abrir o banco de dados:", event.target.errorCode);
      };
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['anuncios'], 'readonly');
        const objectStore = transaction.objectStore('anuncios');
        const getAllRequest = objectStore.getAll();
  
        getAllRequest.onsuccess = () => {
          const anunciosRecuperados = getAllRequest.result.map(anuncio => {
            return {
              ...anuncio,
              fotoCapaUrl: anuncio.fotoCapa ? URL.createObjectURL(anuncio.fotoCapa) : null
            };
          });
          setAnuncios(anunciosRecuperados);
        };
      };
    };
  
    carregarAnuncios();
  }, []);




  const abrirModal = (anuncio) => {
    setAnuncioSelecionado(anuncio);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };



  
  const handleImagensChange = useCallback((e) => {
  
    setImagens([...e.target.files]);
  }, []);
  const handleFotoCapaChange = useCallback((e) => {
    setFotoCapa(e.target.files[0]); 
  }, []);
  
  const handleFotosAdicionaisChange = useCallback((e) => {
    setFotosAdicionais([...e.target.files]); 
  }, []);

  useEffect(() => {

    
    const userType = localStorage.getItem('userType'); 

    setTipoUsuario(userType);
  }, []);

 
  const handleTituloChange = useCallback((e) => {
    setTitulo(e.target.value);
  }, []);
  const handleQuartosChange = useCallback((e) => {
    const value = e.target.value;
    
    if (/^\d*$/.test(value)) {
      setQuartos(value);
    }
  }, []);
  
  const handleBanheirosChange = useCallback((e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setBanheiros(value);
    }
  }, []);

  const realizarPesquisa = () => {
    const valorMaximoNumero = parseFloat(valorMaximo);
  
    const resultadosFiltrados = anuncios.filter(anuncio => {
      const valorAnuncio = parseFloat(anuncio.valor);
      const valorDentroDoLimite = isNaN(valorMaximoNumero) || valorAnuncio <= valorMaximoNumero;
      const cidadeAnuncio = anuncio.endereco.toLowerCase();
      const cidadePesquisaLowerCase = cidadePesquisa.toLowerCase();
      const mesmaCidade = cidadePesquisaLowerCase.length === 0 || cidadeAnuncio.includes(cidadePesquisaLowerCase);
  
      return valorDentroDoLimite && mesmaCidade;
    });
  
    setAnunciosFiltrados(resultadosFiltrados);
  
    // Exibir os resultados no console
    console.log("Anúncios encontrados:", resultadosFiltrados);
  };
  



  const handleValorMaximoChange = (e) => setValorMaximo(e.target.value);
const handleCidadePesquisaChange = (e) => setCidadePesquisa(e.target.value);

const handlePesquisaSubmit = (e) => {
  e.preventDefault();
  console.log("Pesquisa submetida!");
  realizarPesquisa();
};

  const handleTaxaCondominioChange = useCallback((e) => {
    setTaxaCondominio(e.target.value);
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
  const handleTelefoneChange = useCallback((e) => {
    setTelefone(e.target.value);
  }, []);
  const handleVagasChange = useCallback((e) => {
    const valor = e.target.value;
    if (!isNaN(valor) && valor >= 0) {
      setVagas(valor);
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const request = window.indexedDB.open('ImoveisDatabase', 6);

    request.onerror = (event) => {
      console.error("Database error: " + event.target.errorCode);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      let objectStore;
      if (!db.objectStoreNames.contains('anuncios')) {
        objectStore = db.createObjectStore('anuncios', { keyPath: 'id', autoIncrement: true });
      } else {
        objectStore = request.transaction.objectStore('anuncios');
      }
      
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
        fotoCapa, 
        fotosAdicionais,
        descricao,
        contato,
        vagas,
        quartos,         
        banheiros,
        taxaCondominio,
        telefone,
      };
      const addAnuncioRequest = objectStore.add(anuncioData);

      addAnuncioRequest.onsuccess = () => {
        console.log('Anúncio adicionado com sucesso!');
      
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
          vagas={vagas}
          onChangeVagas={handleVagasChange}
          quartos={quartos}
          onChangeQuartos={handleQuartosChange}
          banheiros={banheiros}
          onChangeBanheiros={handleBanheirosChange}
          taxaCondominio={taxaCondominio}
          onChangeTaxaCondominio={handleTaxaCondominioChange}
          telefone={telefone}
          onChangeTeefone={handleTelefoneChange}
        />
      )}


      </div>
<div className="anuncio-container">
{tipoUsuario === 'cliente' && (
<div className="pesquisa-container">
  <form onSubmit={handlePesquisaSubmit} className="pesquisa-form">
    <div className="form-group">
      <label htmlFor="valorMaximo">Valor Máximo:</label>
      <input
        type="text"
        id="valorMaximo"
        value={valorMaximo}
        onChange={handleValorMaximoChange}
        placeholder="Valor Máximo"
      />
    </div>
    <div className="form-group">
      <label htmlFor="cidade">Cidade:</label>
      <input
        type="text"
        id="cidade"
        value={cidadePesquisa}
        onChange={handleCidadePesquisaChange}
        placeholder="Cidade"
      />
    </div>
    <button type="button" className="submit-button" onClick={handlePesquisaSubmit}>
  Pesquisar
</button>

  </form>
</div>
)}
</div>
<div className="anuncio-container">
  {anunciosFiltrados.map(anuncio => (
    <div className="anuncio-card" key={anuncio.id}>
      <img src={anuncio.fotoCapaUrl || 'placeholder-image-url'} alt="Imagem do Imóvel" className="anuncio-imagem" />
      <div className="anuncio-card-body">
        <h3 className="anuncio-title">{anuncio.titulo}</h3>
        <p className="anuncio-endereco">Endereço: {anuncio.endereco}</p>
        <p className="anuncio-valor">Valor: {anuncio.valor}</p>
        <div className="anuncio-actions">
        <button onClick={() => abrirModal(anuncio)}>Mais detalhes</button>
          <button className="btn editar">Editar</button>
          <button className="btn deletar">Deletar</button>
          {
  modalAberto && (
    <Modal anuncio={anuncioSelecionado} fecharModal={fecharModal} />
  )
}
        </div>
      </div>
    </div>
  ))}
</div>




    </div>
    
  );
};

export default Home;
