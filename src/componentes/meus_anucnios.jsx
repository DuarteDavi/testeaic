import '../css/meus_anuncios.css'
import React, { useState, useEffect } from 'react';
import Header from './header';

function MeusAnuncios() {



    const [anuncios, setAnuncios] = useState([]);

    useEffect(() => {
      // Substitua 'userEmail' pelo método correto para obter o e-mail do usuário autenticado
      const userEmail = localStorage.getItem('userEmail');
  
      if (userEmail) {
        const request = window.indexedDB.open('ImoveisDatabase', 3);
        
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
  // Aqui você pode usar um hook ou componente de classe para buscar e exibir os anúncios do usuário
  return (
    <div className="meus-anuncios">
        <Header/>
        <p>Anuncios</p>
      {anuncios.map(anuncio => (
        <div className="anuncio-card" key={anuncio.id}>
            
          {/* Utilize a URL do objeto criada para a imagem de capa do anúncio */}
          <img src={anuncio.fotoCapaUrl || 'placeholder-image-url'} alt="Imagem do Imóvel" />
          <div className="anuncio-card-body">
            <h3 className="anuncio-title">{anuncio.titulo}</h3>
            <p className="anuncio-endereco">Endereço: {anuncio.endereco}</p>
            <p className="anuncio-valor">Valor: {anuncio.valor}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MeusAnuncios;