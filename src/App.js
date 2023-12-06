import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home'; 
import Sobre from './componentes/sobre';
import Login from './pages/Login';
import Cadastro from './pages/cadastro'
import ProtectedRoute from './Auth/withAuth'
import MeusAnuncios from './componentes/meus_anucnios';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/meus-anuncios" element={<MeusAnuncios />} />
        </Route>
   
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;