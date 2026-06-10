import { Check, Mail, Phone, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1B2B5E] text-white" id="ayuda">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-black text-white tracking-tight">Inti</span>
              <span className="text-2xl font-black text-[#FF6B2B] tracking-tight flex items-center">
                Cambio
                <span className="ml-1 w-5 h-5 bg-[#FF6B2B] rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white stroke-[3]" />
                </span>
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Tu mejor opción para cambio de divisas online.
            </p>
            <div className="text-gray-400 text-xs leading-relaxed space-y-1">
              <p>Operado por: INVERSIONES FALABI SAC</p>
              <p>RUC: 20612873454</p>
              <p>Registro SBS N° 67132-2024</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-5">
              Enlaces rápidos
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Inicio', to: '/' },
                { label: 'Nosotros', to: '/nosotros' },
                { label: 'Ayuda', to: '/ayuda' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-gray-300 text-sm hover:text-[#FF6B2B] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-5">Legal</h4>
            <ul className="space-y-3">
              {[
                'Términos y condiciones',
                'Política de privacidad',
                'Política de cookies',
                'Libro de reclamaciones',
              ].map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-300 text-sm hover:text-[#FF6B2B] transition-colors leading-snug block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-5">
              Contáctanos
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#FF6B2B] mt-0.5 shrink-0" />
                <a
                  href="mailto:contacto@inticambio.pe"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  contacto@inticambio.pe
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF6B2B] shrink-0" />
                <a
                  href="tel:+51981850870"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  +51 981 850 870
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Social + Libro */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-5">
              Síguenos
            </h4>
            <div className="flex gap-3 mb-6">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Youtube, label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 hover:bg-[#FF6B2B] rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>

            {/* Libro de Reclamaciones */}
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-4 py-3 transition-colors duration-200 group"
            >
              <div className="w-8 h-8 bg-[#FF6B2B] rounded-lg flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                  <path d="M8 12h8v2H8zm0 4h5v2H8z" />
                </svg>
              </div>
              <span className="text-white text-xs font-bold uppercase tracking-wide leading-tight">
                Libro de<br />Reclamaciones
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-400 text-xs">
            © 2026{' '}
            <span className="text-white font-bold">INTICAMBIO</span>. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-xs">
            Supervisado por la Superintendencia de Banca y Seguros del Perú
          </p>
        </div>
      </div>
    </footer>
  );
}
