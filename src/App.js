import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home'; // Importe seus componentes aqui
import Sobre from './componentes/sobre';
import Login from './pages/Login';
import Cadastro from './pages/cadastro'
import ProtectedRoute from './Auth/withAuth'
function App() {
  return (
    <Router>
      <Routes>
     
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
        </Route>
   
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        {/* Adicione mais rotas conforme necessário */}
      </Routes>
    </Router>
  );
}

export default App;