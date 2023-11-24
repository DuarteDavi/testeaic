import '../css/meus_anuncios.css'
import React, { useState, useEffect } from 'react';
import Header from './header';
import '../css/meus_anuncios.css'
function MeusAnuncios() {
  const [anuncioDetalhado, setAnuncioDetalhado] = useState(null);
  const deletarAnuncio = (id) => {
    const request = window.indexedDB.open('ImoveisDatabase', 4);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['anuncios'], 'readwrite');
      const objectStore = transaction.objectStore('anuncios');
      
      const deleteRequest = objectStore.delete(id);

      deleteRequest.onsuccess = () => {
        console.log('Anúncio deletado com sucesso.');
        // Atualize o estado para refletir a remoção do anúncio
        setAnuncios(anuncios.filter(anuncio => anuncio.id !== id));
      };

      transaction.onerror = (event) => {
        console.error('Erro ao deletar o anúncio:', event.target.error);
      };
    };
  };
  const mostrarDetalhes = (anuncio) => {
    // Se o anúncio já está sendo mostrado, ocultá-lo. Caso contrário, mostrar os detalhes.
    if (anuncioDetalhado && anuncioDetalhado.id === anuncio.id) {
      setAnuncioDetalhado(null);
    } else {
      setAnuncioDetalhado(anuncio);
    }
  };
 

    const [anuncios, setAnuncios] = useState([]);

    useEffect(() => {
      // Substitua 'userEmail' pelo método correto para obter o e-mail do usuário autenticado
      const userEmail = localStorage.getItem('userEmail');
  
      if (userEmail) {
        const request = window.indexedDB.open('ImoveisDatabase', 4);
        
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
          <button onClick={() => mostrarDetalhes(anuncio)}>Detalhes</button>
          {/* Se o estado anuncioDetalhado contém o anúncio, mostre os detalhes */}
          {anuncioDetalhado && anuncioDetalhado.id === anuncio.id && (
            <div className="anuncio-detalhes">
              {/* Renderize todas as informações do anúncio aqui */}
              <p>Descrição: {anuncio.descricao}</p>
              <p>Contato: {anuncio.contato}</p>
              {/* Renderize as imagens adicionais se houver */}
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