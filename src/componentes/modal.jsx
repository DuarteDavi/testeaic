import React from 'react';

// Componente Modal
function Modal({ anuncio, fecharModal }) {
    if (!anuncio) return null;
  
    return (
      <div className="modal-backdrop">
        <div className="modal">
          <h2>{anuncio.titulo}</h2>
          <p>Titulo: {anuncio.titulo}</p>
            <p>Cidade: {anuncio.endereco}</p>
            <p>Valor: {anuncio.valor}</p>
            <img src={anuncio.fotoCapaUrl || 'placeholder-image-url'} alt="Imagem do Imóvel" />
          {/* Incluir outros detalhes do anúncio aqui */}
          <button onClick={fecharModal}>Fechar</button>
        </div>
      </div>
    );
}

export default Modal;
