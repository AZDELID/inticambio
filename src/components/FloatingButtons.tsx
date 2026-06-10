import { MessageCircle } from 'lucide-react';

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-2">
      <a
        href="https://wa.me/51981850870?text=Hola,%20quiero%20realizar%20una%20venta"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] text-white font-bold text-xs px-3 py-2.5 rounded-xl shadow-xl hover:bg-green-600 transition-all duration-200 hover:scale-105 group"
      >
        <MessageCircle className="w-4 h-4 fill-white stroke-none" />
        <span>VENTAS</span>
      </a>
      <a
        href="https://wa.me/51981850870?text=Hola,%20tengo%20una%20consulta"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] text-white font-bold text-xs px-3 py-2.5 rounded-xl shadow-xl hover:bg-green-600 transition-all duration-200 hover:scale-105"
      >
        <MessageCircle className="w-4 h-4 fill-white stroke-none" />
        <span>CONSULTAS</span>
      </a>
    </div>
  );
}
