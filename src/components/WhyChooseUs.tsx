import { Clock, Shield, Building2, Tag, Headphones } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Rapidez',
    description:
      'Nos enfocamos en brindarte un servicio rápido y eficiente para que puedas completar tus operaciones sin demoras.',
  },
  {
    icon: Shield,
    title: 'Seguridad',
    description:
      'Protegemos tu información personal y empresarial en cada transacción, cumpliendo con las normativas de la SBS para ofrecerte la máxima seguridad en todas tus operaciones.',
  },
  {
    icon: Building2,
    title: 'Garantía y confianza',
    description:
      'Como empresa registrada y supervisada, ofrecemos garantía total en cada operación, asegurando que tu dinero esté en manos confiables.',
  },
  {
    icon: Tag,
    title: 'Precios Competitivos',
    description:
      'Te garantizamos un tipo de cambio altamente competitivo, siempre alineado con las condiciones del mercado.',
  },
  {
    icon: Headphones,
    title: 'Atención al Cliente Personalizada',
    description:
      'Nuestro equipo está aquí para ayudarte en cada paso del proceso. Ofrecemos soporte rápido y profesional, porque tu satisfacción es nuestra prioridad.',
    centered: true,
  },
];

export default function WhyChooseUs() {
  const mainFeatures = features.slice(0, 4);
  const lastFeature = features[4];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-[#1B2B5E] text-center mb-16">
          ¿Por qué elegir a INTICAMBIO?
        </h2>

        {/* 2x2 grid */}
        <div className="grid sm:grid-cols-2 gap-8 mb-8 max-w-3xl mx-auto">
          {mainFeatures.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} />
          ))}
        </div>

        {/* 5th centered */}
        <div className="flex justify-center">
          <div className="max-w-sm w-full">
            <FeatureCard feature={lastFeature} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  const Icon = feature.icon;
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="w-16 h-16 rounded-full bg-[#FF6B2B] flex items-center justify-center mb-4 shadow-lg shadow-orange-100">
        <Icon className="w-7 h-7 text-white stroke-[1.5]" />
      </div>
      <h3 className="text-base font-black text-[#1B2B5E] mb-2">{feature.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
    </div>
  );
}
