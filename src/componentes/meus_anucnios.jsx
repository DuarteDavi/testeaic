import '../css/meus_anuncios.css'
import React, { useState, useEffect } from 'react';
import Header from './header';
import '../css/meus_anuncios.css'
function MeusAnuncios() {
  const [anuncioDetalhado, setAnuncioDetalhado] = useState(null);
  const deletarAnuncio = (id) => {
    const request = window.indexedDB.open('ImoveisDatabase', 6);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['anuncios'], 'readwrite');
      const objectStore = transaction.objectStore('anuncios');
      
      const deleteRequest = objectStore.delete(id);

      deleteRequest.onsuccess = () => {
        console.log('Anúncio deletado com sucesso.');
        setAnuncios(anuncios.filter(anuncio => anuncio.id !== id));
      };

      transaction.onerror = (event) => {
        console.error('Erro ao deletar o anúncio:', event.target.error);
      };
    };
  };
  const mostrarDetalhes = (anuncio) => {
    if (anuncioDetalhado && anuncioDetalhado.id === anuncio.id) {
      setAnuncioDetalhado(null);
    } else {
      setAnuncioDetalhado(anuncio);
    }
  };
 

    const [anuncios, setAnuncios] = useState([]);

    useEffect(() => {
      const userEmail = localStorage.getItem('userEmail');
  
      if (userEmail) {
        const request = window.indexedDB.open('ImoveisDatabase', 6);
        
        request.onerror = (event) => {
          console.error("Database error: " + event.target.errorCode);
        };
  
        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction(['anuncios'], 'readonly');
          const objectStore = transaction.objectStore('anuncios');
          const myIndex = objectStore.index('userEmail');
          const getAllRequest = myIndex.getAll(userEmail);
  
          getAllRequest.onsuccess = () => {
            const anunciosRecuperados = getAllRequest.result.map(anuncio => {
              return {
                ...anuncio,
                fotoCapaUrl: anuncio.fotoCapa ? URL.createObjectURL(anuncio.fotoCapa) : null,
                fotosAdicionaisUrls: anuncio.fotosAdicionais ? anuncio.fotosAdicionais.map(foto => URL.createObjectURL(foto)) : []
              };
            });
            setAnuncios(anunciosRecuperados);
          };
        };
      }
    }, []);
  return (
    <div className="meus-anuncios">
        <Header/>
        <p>Anuncios</p>
      {anuncios.map(anuncio => (
        <div className="anuncio-card" key={anuncio.id}>
            
          <img src={anuncio.fotoCapaUrl || 'placeholder-image-url'} alt="Imagem do Imóvel" />
          <div className="anuncio-card-body">
            <p>Titulo: {anuncio.titulo}</p>
            <p>Cidade: {anuncio.endereco}</p>
            <p>Valor: {anuncio.valor}</p>
          <button onClick={() => mostrarDetalhes(anuncio)}>Detalhes</button>
          {anuncioDetalhado && anuncioDetalhado.id === anuncio.id && (
            <div className="anuncio-detalhes">
              <p>Descrição: {anuncio.descricao}</p>
              <p>Contato: {anuncio.contato}</p>
              {anuncio.fotosAdicionaisUrls && anuncio.fotosAdicionaisUrls.map((url, index) => (
                <img key={index} src={url} alt={`Imagem adicional ${index + 1}`} />
              ))}
            </div>
          )}
            <div className="anuncio-actions">
            
            <button onClick={() => deletarAnuncio(anuncio.id)}>Deletar</button>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MeusAnuncios;