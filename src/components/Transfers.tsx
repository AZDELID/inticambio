import { Zap, Clock } from 'lucide-react';

export default function Transfers() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1: Transferencias Inmediatas */}
          <div className="bg-[#FF6B2B] rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-8 -translate-y-8" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-white fill-white stroke-none" />
                </div>
                <h3 className="font-black text-lg uppercase tracking-wide">
                  Transferencias Inmediatas
                </h3>
              </div>

              {/* Interbank logo */}
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white rounded-xl px-4 py-2 flex items-center gap-2 shadow-md">
                  <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-black text-sm">I</span>
                  </div>
                  <span className="font-black text-gray-800 text-sm">Interbank</span>
                </div>
                <div className="bg-white/20 rounded-xl px-4 py-2">
                  <span className="font-bold text-white text-sm">(10 a 45 minutos)</span>
                </div>
              </div>

              <p className="text-white/80 text-sm leading-relaxed">
                Realizamos transferencias a cuentas de INTERBANK de forma rápida y segura.
              </p>
            </div>
          </div>

          {/* Card 2: Transferencias Interbancarias */}
          <div className="bg-[#FF6B2B] rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-8 translate-y-8" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-black text-lg uppercase tracking-wide">
                  Transferencias Interbancarias
                </h3>
              </div>

              {/* Bank logos */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <div className="bg-white rounded-xl px-4 py-2 flex items-center gap-2 shadow-md">
                  <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-black text-sm">S</span>
                  </div>
                  <span className="font-black text-gray-800 text-sm">Scotiabank</span>
                </div>
                <div className="bg-white rounded-xl px-4 py-2 flex items-center gap-2 shadow-md">
                  <div className="w-7 h-7 bg-[#1B2B5E] rounded-full flex items-center justify-center">
                    <span className="text-white font-black text-[9px]">OTROS</span>
                  </div>
                  <span className="font-black text-gray-800 text-sm">Otros Bancos</span>
                </div>
              </div>

              <p className="text-white/80 text-sm leading-relaxed mb-2">
                Transferimos dinero a cuentas en diferentes bancos con facilidad.
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="bg-white/20 rounded-lg px-3 py-1 text-white text-xs font-bold">
                  Comisión: S/ 4.80 | $1.93
                </span>
                <span className="bg-white/20 rounded-lg px-3 py-1 text-white text-xs font-bold uppercase tracking-wide">
                  De 8 a 24 horas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
