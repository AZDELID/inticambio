import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '1',
    title: 'Cotiza',
    description:
      'Ingresa el monto que deseas cambiar en nuestra calculadora y haz clic en "Cambiar ahora" para iniciar tu operación.',
    color: 'navy',
  },
  {
    number: '2',
    title: 'Transfiere',
    description:
      'Transfiere al número de cuenta y banco indicados, y asegúrate de conservar el comprobante.',
    color: 'orange',
  },
  {
    number: '3',
    title: 'Recibe',
    description:
      'Recibe el importe cambiado en tu cuenta bancaria en minutos.',
    color: 'navy',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white" id="nosotros">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-[#1B2B5E] text-center mb-16">
          ¿Cómo funciona?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center">
              {/* Arrow between steps */}
              {idx < steps.length - 1 && (
                <div className="hidden md:flex absolute top-10 left-[calc(50%+56px)] right-[-calc(50%-56px)] items-center justify-center z-10">
                  <ArrowRight className="w-8 h-8 text-[#FF6B2B] stroke-[2.5]" />
                </div>
              )}

              {/* Circle */}
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black text-white shadow-xl mb-6 ${
                  step.color === 'orange' ? 'bg-[#FF6B2B] shadow-orange-200' : 'bg-[#1B2B5E] shadow-navy-200'
                }`}
              >
                {step.number}
              </div>

              <h3 className="text-xl font-black text-[#1B2B5E] mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
