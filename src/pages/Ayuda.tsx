import { useState } from 'react';
import { ChevronDown, MessageCircle, Mail, Phone, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqs = [
  {
    question: '¿Cómo funciona el cambio de divisas en IntiCambio?',
    answer:
      'Es muy sencillo: ingresa el monto que deseas cambiar en nuestra calculadora, selecciona la dirección (USD→PEN o PEN→USD), haz clic en "Cambiar ahora" y sigue las instrucciones para transferir el dinero a nuestra cuenta. Una vez recibido el depósito, te enviamos el equivalente en tu moneda destino.',
  },
  {
    question: '¿Es seguro usar IntiCambio?',
    answer:
      'Sí, totalmente. Estamos registrados en la Superintendencia de Banca, Seguros y AFP del Perú (SBS N° 67132-2024) y operamos bajo supervisión constante. Toda tu información personal y financiera está protegida con encriptación de nivel bancario.',
  },
  {
    question: '¿Cuánto tiempo demora el cambio?',
    answer:
      'Para cuentas Interbank, las transferencias son casi inmediatas (10 a 45 minutos). Para otros bancos (Scotiabank, BCP, BBVA, etc.) el tiempo es de 8 a 24 horas hábiles. Siempre te notificamos cuando el dinero es enviado.',
  },
  {
    question: '¿Cuál es el límite mínimo y máximo por operación?',
    answer:
      'El monto mínimo es de $50 USD o S/ 200 PEN. Para operaciones mayores a $10,000 USD, contáctate directamente con nuestro equipo mediante el enlace "negocia aquí" para obtener una tasa especial.',
  },
  {
    question: '¿Cómo me registro en IntiCambio?',
    answer:
      'Haz clic en "Registrarse" en la parte superior de la página, completa el formulario con tu nombre, DNI, correo electrónico y teléfono, crea tu contraseña y acepta los términos. El proceso toma menos de 2 minutos.',
  },
  {
    question: '¿Qué hago si no recibo mi dinero?',
    answer:
      'Si han pasado más de 24 horas hábiles y no has recibido tu dinero, escríbenos inmediatamente a contacto@inticambio.pe o por WhatsApp al +51 981 850 870 con tu número de operación. Tenemos un equipo dedicado a resolver estos casos en menos de 2 horas.',
  },
  {
    question: '¿Tienen comisiones adicionales?',
    answer:
      'Para transferencias a cuentas Interbank no hay comisión adicional. Para transferencias interbancarias se aplica una comisión de S/ 4.80 en soles o $1.93 en dólares. Esta comisión es cobrada por el sistema financiero interbancario.',
  },
  {
    question: '¿Qué bancos aceptan para enviar y recibir dinero?',
    answer:
      'Aceptamos transferencias desde y hacia todos los bancos del sistema financiero peruano: BCP, Interbank, Scotiabank, BBVA, BanBif, Pichincha y más. Para depósitos o retiros en efectivo, también contamos con convenios con Kasnet y GlobalNet.',
  },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-bold text-[#1B2B5E] text-sm pr-4">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#FF6B2B] shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 border-t border-gray-100">
          <p className="text-gray-600 text-sm leading-relaxed pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function Ayuda() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-[#1B2B5E] to-[#243674] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Centro de Ayuda</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Encuentra respuestas a las preguntas más frecuentes o contáctanos directamente.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-[#1B2B5E] mb-10">Preguntas Frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <FAQ key={idx} q={faq.question} a={faq.answer} />
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-[#1B2B5E] text-center mb-12">
            ¿Necesitas más ayuda?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <ContactCard
              icon={Mail}
              title="Email"
              detail="contacto@inticambio.pe"
              sub="Respuesta en menos de 2h"
              href="mailto:contacto@inticambio.pe"
            />
            <ContactCard
              icon={Phone}
              title="Teléfono / WhatsApp"
              detail="+51 981 850 870"
              sub="Lun-Sáb 8am - 8pm"
              href="https://wa.me/51981850870"
            />
            <ContactCard
              icon={Clock}
              title="Horario de atención"
              detail="Lun - Sáb"
              sub="8:00am – 8:00pm"
              href="#"
            />
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/51981850870?text=Hola,%20necesito%20ayuda"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-4 z-50 flex items-center gap-2 bg-[#25D366] text-white font-bold text-sm px-4 py-3 rounded-xl shadow-xl hover:bg-green-600 transition-all duration-200"
      >
        <MessageCircle className="w-5 h-5 fill-white stroke-none" />
        WhatsApp
      </a>
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  detail,
  sub,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  detail: string;
  sub: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 block"
    >
      <div className="w-12 h-12 bg-[#FF6B2B] rounded-xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-bold text-[#1B2B5E] text-sm mb-1">{title}</h3>
      <p className="font-black text-[#FF6B2B] text-base mb-1">{detail}</p>
      <p className="text-gray-400 text-xs">{sub}</p>
    </a>
  );
}
