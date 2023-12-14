import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../css/modal.css'
function Modal({ anuncio, fecharModal }) {
  if (!anuncio) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="modal-title">{anuncio.titulo}</h2>
        
        {/* Carrossel de imagens */}
        <Carousel showThumbs={false} useKeyboardArrows dynamicHeight>
          {anuncio.fotosAdicionaisUrls && anuncio.fotosAdicionaisUrls.map((url, index) => (
            <div key={index}>
              <img src={url} alt={`Foto Adicional ${index + 1}`} />
            </div>
          ))}
        </Carousel>

        <div className="modal-details">
          <p><strong>Cidade:</strong> {anuncio.endereco}</p>
          <p><strong>Valor:</strong> {anuncio.valor}</p>
          {/* Inclua aqui mais detalhes do imóvel como número de quartos, banheiros, etc. */}
        </div>

        <button onClick={fecharModal} className="modal-close-button">Fechar</button>
      </div>
    </div>
  );
}

export default Modal;
