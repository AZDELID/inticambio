import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Amanda Salas',
    role: 'Cliente frecuente',
    text: '"Excelente servicio. Rápido, seguro y con las mejores tasas del mercado. ¡Totalmente recomendado!"',
    stars: 5,
  },
  {
    name: 'Rodrigo Suarez',
    role: 'Empresario',
    text: '"Atención excelente, el cambio fue inmediato y sin complicaciones. Volvería a usar sus servicios."',
    stars: 5,
  },
  {
    name: 'Santiago Aldana',
    role: 'Cliente nuevo',
    text: '"Gran experiencia, el cambio fue eficiente y el personal muy atento. Definitivamente seguiré utilizando este servicio."',
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-[#1B2B5E] text-center mb-4">
          Lo que dicen nuestros clientes
        </h2>
        <p className="text-center text-gray-400 text-sm mb-14">
          Miles de personas ya confían en IntiCambio para sus operaciones de cambio.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#FF6B2B] fill-[#FF6B2B] stroke-none" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">{t.text}</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B2B] to-[#1B2B5E] rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-bold text-[#1B2B5E] text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
