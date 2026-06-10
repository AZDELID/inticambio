import Calculator from './Calculator';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden bg-white">
      {/* Decorative orange shape */}
      <div
        className="absolute bottom-0 left-0 w-72 h-72 md:w-[500px] md:h-[500px] rounded-full bg-[#FF6B2B] opacity-10 -translate-x-1/2 translate-y-1/2 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute top-10 right-0 w-40 h-40 md:w-64 md:h-64 rounded-full bg-[#1B2B5E] opacity-5 translate-x-1/2 pointer-events-none"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-3 py-1.5 mb-6">
              <span className="w-2 h-2 bg-[#FF6B2B] rounded-full animate-pulse" />
              <span className="text-[#FF6B2B] text-xs font-bold uppercase tracking-wider">Tipo de cambio en tiempo real</span>
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-[#1B2B5E] leading-[1.05] uppercase mb-6">
              Cambia tus{' '}
              <span className="text-[#FF6B2B]">dólares</span> y{' '}
              <span className="text-[#FF6B2B]">soles</span>{' '}
              con nosotros
            </h1>

            <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10 max-w-md">
              Ofrecemos el mejor tipo de cambio del mercado. Envía tu dinero y recibe la cantidad exacta en tu moneda local.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6">
              {/* Indecopi */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#1B2B5E] rounded-full flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-white">
                    <path d="M12 2L3 7v10l9 5 9-5V7L12 2zm0 2.5L18.5 8l-1.5.87-5-2.87-5 2.87L5.5 8 12 4.5zm-6.5 5.13L12 12.5l6.5-2.87V15l-6.5 3.5-6.5-3.5V9.63z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[#1B2B5E] text-sm leading-tight">Indecopi</p>
                  <p className="text-gray-400 text-[10px]">Certificado</p>
                </div>
              </div>

              {/* SBS */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#1B2B5E] rounded-full flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-white">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[#1B2B5E] text-xs leading-tight">Registrados</p>
                  <p className="text-gray-400 text-[10px]">en la SBS</p>
                </div>
              </div>

              {/* SUNAT */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#1B2B5E] rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-black text-[10px]">SUNAT</span>
                </div>
                <div>
                  <p className="font-bold text-[#1B2B5E] text-sm leading-tight">SUNAT</p>
                  <p className="text-gray-400 text-[10px]">Registrado</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column – Calculator */}
          <div className="flex justify-center lg:justify-end">
            <Calculator />
          </div>
        </div>
      </div>
    </section>
  );
}
