import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Check, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { usuario, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    navigate('/');
    setMenuOpen(false);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 shrink-0">
            <span className="text-2xl font-black text-[#1B2B5E] tracking-tight">Inti</span>
            <span className="text-2xl font-black text-[#FF6B2B] tracking-tight flex items-center gap-0.5">
              Cambio
              <span className="ml-1 w-5 h-5 bg-[#FF6B2B] rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white stroke-[3]" />
              </span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-semibold text-[#1B2B5E] hover:text-[#FF6B2B] transition-colors">
              Inicio
            </Link>
            <Link to="/nosotros" className="text-sm font-semibold text-[#1B2B5E] hover:text-[#FF6B2B] transition-colors">
              Nosotros
            </Link>
            <Link to="/ayuda" className="text-sm font-semibold text-[#1B2B5E] hover:text-[#FF6B2B] transition-colors">
              Ayuda
            </Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {!loading && (
              usuario ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                    <div className="w-7 h-7 bg-[#FF6B2B] rounded-full flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-[#1B2B5E] max-w-[120px] truncate">
                      {usuario.nombre_completo.split(' ')[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-500 hover:text-[#1B2B5E] transition-colors border border-gray-200 rounded-xl hover:bg-gray-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Salir
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2 text-sm font-semibold text-[#1B2B5E] border-2 border-[#1B2B5E] rounded-lg hover:bg-[#1B2B5E] hover:text-white transition-all duration-200"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 text-sm font-semibold text-white bg-[#FF6B2B] rounded-lg hover:bg-[#E55A1F] transition-all duration-200 shadow-md shadow-orange-200"
                  >
                    Registrarse
                  </Link>
                </>
              )
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[#1B2B5E]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold text-[#1B2B5E] py-2 hover:text-[#FF6B2B]"
          >
            Inicio
          </Link>
          <Link
            to="/nosotros"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold text-[#1B2B5E] py-2 hover:text-[#FF6B2B]"
          >
            Nosotros
          </Link>
          <Link
            to="/ayuda"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold text-[#1B2B5E] py-2 hover:text-[#FF6B2B]"
          >
            Ayuda
          </Link>
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            {usuario ? (
              <>
                <div className="flex items-center gap-2 py-2">
                  <div className="w-8 h-8 bg-[#FF6B2B] rounded-full flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-[#1B2B5E]">
                    {usuario.nombre_completo}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-2.5 text-sm font-semibold text-[#1B2B5E] border-2 border-[#1B2B5E] rounded-lg text-center"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-2.5 text-sm font-semibold text-white bg-[#FF6B2B] rounded-lg text-center"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
