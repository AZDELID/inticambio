import { Shield, Target, Eye, Award, Users, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const team = [
  {
    name: 'Ricardo Falabi',
    role: 'Director General',
    initials: 'RF',
    bio: 'Más de 15 años de experiencia en el sector financiero peruano.',
  },
  {
    name: 'Claudia Vargas',
    role: 'Gerente de Operaciones',
    initials: 'CV',
    bio: 'Especialista en mercado de divisas y operaciones cambiarias.',
  },
  {
    name: 'Miguel Torres',
    role: 'Jefe de Tecnología',
    initials: 'MT',
    bio: 'Ingeniero de sistemas con amplia experiencia en fintech.',
  },
];

const values = [
  {
    icon: Shield,
    title: 'Integridad',
    description:
      'Operamos con total transparencia y honestidad en cada transacción, cumpliendo siempre con la normativa vigente.',
  },
  {
    icon: TrendingUp,
    title: 'Innovación',
    description:
      'Nos adaptamos constantemente a las nuevas tecnologías para ofrecer la mejor experiencia a nuestros clientes.',
  },
  {
    icon: Users,
    title: 'Servicio al cliente',
    description:
      'Nuestros clientes son el centro de todo lo que hacemos. Su satisfacción es nuestra mayor recompensa.',
  },
];

export default function Nosotros() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-[#1B2B5E] to-[#243674] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
            <Award className="w-4 h-4 text-[#FF6B2B]" />
            <span className="text-white/90 text-xs font-bold uppercase tracking-wider">
              Registro SBS N° 67132-2024
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Conoce IntiCambio</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Somos la casa de cambio digital de confianza del Perú. Seguros, rápidos y siempre con las mejores tasas.
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#1B2B5E] mb-6">
                Nuestra historia
              </h2>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  IntiCambio nació en Lima en 2022 con una misión clara: democratizar el acceso al cambio de divisas para todos los peruanos. Inspirados en Inti, el dios sol de los incas, simbolizamos la calidez, confianza y prosperidad que queremos transmitir a nuestros clientes.
                </p>
                <p>
                  Operado por <strong className="text-[#1B2B5E]">INVERSIONES FALABI SAC</strong> (RUC: 20612873454), estamos debidamente registrados ante la Superintendencia de Banca, Seguros y AFP del Perú con el número <strong className="text-[#1B2B5E]">67132-2024</strong>, garantizando la total legalidad y seguridad de cada operación.
                </p>
                <p>
                  Desde nuestros inicios hemos procesado más de 50,000 operaciones exitosas, ganándonos la confianza de miles de personas y empresas en todo el país.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '50,000+', label: 'Operaciones realizadas' },
                { value: 'S/. 200M+', label: 'Volumen procesado' },
                { value: '99.9%', label: 'Operaciones exitosas' },
                { value: '4.9/5', label: 'Calificación promedio' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-2xl p-6 text-center"
                >
                  <p className="text-3xl font-black text-[#FF6B2B] mb-1">{stat.value}</p>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-[#1B2B5E] text-center mb-12">
            Misión, visión y valores
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 bg-[#FF6B2B] rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-black text-[#1B2B5E] text-xl mb-3">Misión</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Brindar a los peruanos una plataforma de cambio de divisas segura, rápida y con las mejores tasas del mercado, facilitando el acceso financiero para todos.
              </p>
            </div>
            <div className="bg-[#1B2B5E] rounded-2xl p-8 shadow-sm text-center">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-black text-white text-xl mb-3">Visión</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Ser la casa de cambio digital líder del Perú, reconocida por su innovación, confiabilidad y compromiso con el bienestar financiero de sus clientes.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-black text-[#1B2B5E] text-xl mb-5 text-center">Valores</h3>
              <div className="space-y-3">
                {values.map((v, idx) => {
                  const Icon = v.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#FF6B2B]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#1B2B5E] text-sm">{v.title}</p>
                        <p className="text-gray-500 text-xs leading-relaxed">{v.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-[#1B2B5E] text-center mb-12">
            Nuestro equipo
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member, idx) => (
              <div key={idx} className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#FF6B2B] to-[#1B2B5E] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <span className="text-white font-black text-xl">{member.initials}</span>
                </div>
                <h3 className="font-black text-[#1B2B5E] text-base">{member.name}</h3>
                <p className="text-[#FF6B2B] text-xs font-bold uppercase tracking-wide mb-2">
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
