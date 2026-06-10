import { useState, useEffect } from 'react';
import { ArrowLeftRight, Tag, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import OperacionModal from './OperacionModal';

const COMPRA_RATE = 3.445;
const VENTA_RATE = 3.468;

type Direction = 'usd-pen' | 'pen-usd';

export default function Calculator() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [direction, setDirection] = useState<Direction>('usd-pen');
  const [sendAmount, setSendAmount] = useState('500.00');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [coupon, setCoupon] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);

  const activeRate = direction === 'usd-pen' ? COMPRA_RATE : VENTA_RATE;

  useEffect(() => {
    calculate(sendAmount, direction);
  }, []);

  function calculate(value: string, dir: Direction) {
    const num = parseFloat(value.replace(/,/g, ''));
    if (isNaN(num) || num <= 0) {
      setReceiveAmount('');
      return;
    }
    const result = dir === 'usd-pen' ? num * COMPRA_RATE : num / VENTA_RATE;
    setReceiveAmount(result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  }

  function handleSendChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    setSendAmount(raw);
    calculate(raw, direction);
    setLoginPrompt(false);
  }

  function handleSwap() {
    const newDir: Direction = direction === 'usd-pen' ? 'pen-usd' : 'usd-pen';
    setDirection(newDir);
    setSendAmount('500.00');
    calculate('500.00', newDir);
    setLoginPrompt(false);
  }

  function handleCambiar() {
    if (!user) {
      setLoginPrompt(true);
      return;
    }
    setShowModal(true);
  }

  const fromCurrency = direction === 'usd-pen' ? 'USD' : 'PEN';
  const toCurrency = direction === 'usd-pen' ? 'PEN' : 'USD';
  const fromFlag = direction === 'usd-pen' ? '🇺🇸' : '🇵🇪';
  const toFlag = direction === 'usd-pen' ? '🇵🇪' : '🇺🇸';

  return (
    <>
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-sm mx-auto lg:mx-0">
        {/* Header */}
        <div className="bg-[#FF6B2B] px-5 py-4">
          <p className="text-white text-center text-xs font-bold tracking-widest uppercase mb-3">
            Tasas de Cambio Actuales
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
              <p className="text-white/80 text-[10px] font-semibold uppercase tracking-wider">Compra</p>
              <p className="text-white text-xl font-black">S/. {COMPRA_RATE.toFixed(3)}</p>
            </div>
            <div className="w-px h-10 bg-white/30" />
            <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
              <p className="text-white/80 text-[10px] font-semibold uppercase tracking-wider">Venta</p>
              <p className="text-white text-xl font-black">S/. {VENTA_RATE.toFixed(3)}</p>
            </div>
          </div>
        </div>

        <div className="px-5 py-5">
          {/* Currency Selector */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{fromFlag}</span>
              <span className="font-bold text-[#1B2B5E] text-sm">{fromCurrency}</span>
            </div>
            <button
              onClick={handleSwap}
              className="w-9 h-9 bg-[#FF6B2B] rounded-full flex items-center justify-center text-white hover:bg-[#E55A1F] transition-colors shadow-md"
              title="Cambiar dirección"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#1B2B5E] text-sm">{toCurrency}</span>
              <span className="text-2xl">{toFlag}</span>
            </div>
          </div>

          {/* Send Amount */}
          <div className="mb-3">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
              Envías
            </label>
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-[#FF6B2B] transition-colors">
              <span className="px-3 text-gray-400 font-semibold text-sm bg-gray-50 py-3.5 border-r border-gray-200">
                {fromCurrency === 'USD' ? '$' : 'S/.'}
              </span>
              <input
                type="text"
                value={sendAmount}
                onChange={handleSendChange}
                className="flex-1 px-3 py-3.5 text-[#1B2B5E] font-bold text-lg outline-none bg-white"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Receive Amount */}
          <div className="mb-4">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
              Recibes
            </label>
            <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden bg-gray-50">
              <span className="px-3 text-gray-400 font-semibold text-sm bg-gray-100 py-3.5 border-r border-gray-200">
                {toCurrency === 'USD' ? '$' : 'S/.'}
              </span>
              <span className="flex-1 px-3 py-3.5 text-[#1B2B5E] font-black text-xl">
                {receiveAmount || '0.00'}
              </span>
            </div>
          </div>

          {/* Coupon */}
          <div className="flex gap-2 mb-4">
            <div className="flex-1 flex items-center border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-[#FF6B2B] transition-colors">
              <Tag className="ml-3 w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={coupon}
                onChange={e => { setCoupon(e.target.value); setLoginPrompt(false); }}
                placeholder="Código de cupón"
                className="flex-1 px-2 py-3 text-sm text-gray-700 outline-none bg-white placeholder-gray-400"
              />
            </div>
            <button className="px-4 py-3 bg-[#1B2B5E] text-white text-sm font-bold rounded-xl hover:bg-[#243674] transition-colors">
              Aplicar
            </button>
          </div>

          {/* Login prompt */}
          {loginPrompt && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3 text-center">
              <p className="text-amber-800 text-xs font-medium mb-2">
                Debes iniciar sesión para realizar una operación
              </p>
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center gap-1.5 text-[#FF6B2B] text-xs font-bold hover:underline"
              >
                <LogIn className="w-3.5 h-3.5" />
                Iniciar sesión
              </button>
            </div>
          )}

          {/* CTA Button */}
          <button
            onClick={handleCambiar}
            className="w-full py-4 bg-[#FF6B2B] text-white font-black text-base uppercase tracking-wider rounded-xl hover:bg-[#E55A1F] transition-all duration-200 shadow-lg shadow-orange-200 mb-3"
          >
            Cambiar Ahora
          </button>

          {/* Negotiate link */}
          <p className="text-center text-xs text-gray-500">
            Mayor a $10,000{' '}
            <a href="#" className="text-[#FF6B2B] font-semibold hover:underline">
              negocia aquí
            </a>
          </p>
        </div>
      </div>

      {showModal && (
        <OperacionModal
          onClose={() => setShowModal(false)}
          direction={direction}
          sendAmount={sendAmount}
          receiveAmount={receiveAmount}
          rate={activeRate}
        />
      )}
    </>
  );
}
