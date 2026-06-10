import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Nosotros from './pages/Nosotros';
import Ayuda from './pages/Ayuda';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/ayuda" element={<Ayuda />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
