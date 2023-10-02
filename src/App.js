import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './componentes/home'; // Importe seus componentes aqui
import Sobre from './componentes/sobre';
import Login from './pages/Login';
import Cadastro from './pages/cadastro'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path='login' element={<Login/>}/>
        <Route path='cadastro' element={<Cadastro/>}/>
        {/* Adicione mais rotas conforme necessário */}
      </Routes>
    </Router>
  );
}

export default App;