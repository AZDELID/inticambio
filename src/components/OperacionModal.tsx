import { useState } from 'react';
import { X, Copy, Check, Download, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface OperacionModalProps {
  onClose: () => void;
  direction: 'usd-pen' | 'pen-usd';
  sendAmount: string;
  receiveAmount: string;
  rate: number;
}

interface Comprobante {
  id: string;
  shortId: string;
  fecha: string;
  hora: string;
}

const BANCO_INFO = {
  banco: 'Interbank',
  cuenta: '123-456789-0-12',
  cci: '003-123-000456789012-34',
  titular: 'INVERSIONES FALABI SAC',
};

export default function OperacionModal({
  onClose,
  direction,
  sendAmount,
  receiveAmount,
  rate,
}: OperacionModalProps) {
  const { usuario } = useAuth();
  const [step, setStep] = useState<'resumen' | 'comprobante'>('resumen');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [comprobante, setComprobante] = useState<Comprobante | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const monedaOrigen = direction === 'usd-pen' ? 'USD' : 'PEN';
  const tipo = direction === 'usd-pen' ? 'venta' : 'compra';
  const sendNum = parseFloat(sendAmount.replace(/,/g, '')) || 0;
  const receiveNum = parseFloat(receiveAmount.replace(/,/g, '')) || 0;

  async function confirmar() {
    if (!usuario) return;
    setLoading(true);
    setError('');

    const { data, error: err } = await supabase
      .from('operaciones')
      .insert({
        usuario_id: usuario.id,
        tipo,
        moneda_origen: monedaOrigen,
        monto_envia: sendNum,
        monto_recibe: receiveNum,
        tipo_cambio_usado: rate,
        estado: 'pendiente',
      })
      .select()
      .single();

    setLoading(false);
    if (err || !data) {
      setError('Error al guardar la operación. Intenta de nuevo.');
      return;
    }

    const now = new Date();
    setComprobante({
      id: data.id,
      shortId: data.id.substring(0, 8).toUpperCase(),
      fecha: now.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      hora: now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
    });
    setStep('comprobante');
  }

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  function downloadComprobante() {
    if (!comprobante || !usuario) return;
    const text = [
      '========================================',
      '         COMPROBANTE INTICAMBIO',
      '========================================',
      `N° de operación: ${comprobante.shortId}`,
      `Fecha: ${comprobante.fecha}  Hora: ${comprobante.hora}`,
      '----------------------------------------',
      `Cliente: ${usuario.nombre_completo}`,
      `DNI: ${usuario.dni}`,
      '----------------------------------------',
      `Moneda origen: ${monedaOrigen}`,
      `Monto enviado: ${direction === 'usd-pen' ? '$' : 'S/.'}${sendAmount}`,
      `Monto a recibir: ${direction === 'usd-pen' ? 'S/.' : '$'}${receiveAmount}`,
      `Tipo de cambio: ${rate.toFixed(3)}`,
      `Estado: PENDIENTE`,
      '----------------------------------------',
      'DATOS BANCARIOS INTICAMBIO',
      `Banco: ${BANCO_INFO.banco}`,
      `Cuenta: ${BANCO_INFO.cuenta}`,
      `CCI: ${BANCO_INFO.cci}`,
      `Titular: ${BANCO_INFO.titular}`,
      '========================================',
      '  Gracias por confiar en IntiCambio',
      '  contacto@inticambio.pe | +51 981 850 870',
      '========================================',
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inticambio-${comprobante.shortId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {step === 'resumen' ? (
          <>
            {/* Header */}
            <div className="bg-[#FF6B2B] rounded-t-2xl px-6 py-5">
              <h2 className="text-white font-black text-xl">Resumen de operación</h2>
              <p className="text-white/80 text-sm mt-1">Revisa los detalles antes de confirmar</p>
            </div>

            <div className="p-6">
              {/* Amounts */}
              <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-3">
                <Row
                  label="Envías"
                  value={`${direction === 'usd-pen' ? '$' : 'S/.'}${sendAmount} ${monedaOrigen}`}
                  highlight
                />
                <Row
                  label="Recibes"
                  value={`${direction === 'usd-pen' ? 'S/.' : '$'}${receiveAmount} ${direction === 'usd-pen' ? 'PEN' : 'USD'}`}
                  highlight
                />
                <Row label="Tipo de cambio" value={`S/. ${rate.toFixed(3)}`} />
                <Row label="Tipo de operación" value={tipo.charAt(0).toUpperCase() + tipo.slice(1)} />
              </div>

              {/* Bank info */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5">
                <p className="text-xs font-bold text-[#1B2B5E] uppercase tracking-wider mb-3">
                  Transfiere a esta cuenta
                </p>
                <div className="space-y-2">
                  <BankRow label="Banco" value={BANCO_INFO.banco} />
                  <BankRow
                    label="Cuenta"
                    value={BANCO_INFO.cuenta}
                    onCopy={() => copyToClipboard(BANCO_INFO.cuenta, 'cuenta')}
                    copied={copied === 'cuenta'}
                  />
                  <BankRow
                    label="CCI"
                    value={BANCO_INFO.cci}
                    onCopy={() => copyToClipboard(BANCO_INFO.cci, 'cci')}
                    copied={copied === 'cci'}
                  />
                  <BankRow label="Titular" value={BANCO_INFO.titular} />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <p className="text-red-700 text-xs">{error}</p>
                </div>
              )}

              <button
                onClick={confirmar}
                disabled={loading}
                className="w-full py-4 bg-[#FF6B2B] text-white font-black text-sm uppercase tracking-wider rounded-xl hover:bg-[#E55A1F] transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Confirmando...' : 'Confirmar Operación'}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Comprobante */}
            <div className="bg-[#1B2B5E] rounded-t-2xl px-6 py-5 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-white stroke-[3]" />
              </div>
              <div>
                <h2 className="text-white font-black text-xl">¡Operación registrada!</h2>
                <p className="text-white/70 text-sm">Realiza la transferencia para completarla</p>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-3">
                <Row label="N° de operación" value={comprobante!.shortId} highlight />
                <Row label="Fecha" value={comprobante!.fecha} />
                <Row label="Hora" value={comprobante!.hora} />
                <Row
                  label="Enviado"
                  value={`${direction === 'usd-pen' ? '$' : 'S/.'}${sendAmount} ${monedaOrigen}`}
                />
                <Row
                  label="A recibir"
                  value={`${direction === 'usd-pen' ? 'S/.' : '$'}${receiveAmount}`}
                  highlight
                />
                <Row label="Estado" value="Pendiente de depósito" />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
                <p className="text-amber-800 text-xs font-medium leading-relaxed">
                  <strong>Importante:</strong> Tienes 24 horas para realizar la transferencia a la cuenta indicada. Una vez confirmado el depósito, procesaremos tu cambio.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={downloadComprobante}
                  className="flex-1 py-3.5 bg-[#1B2B5E] text-white font-bold text-sm rounded-xl hover:bg-[#243674] transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Descargar
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3.5 bg-[#FF6B2B] text-white font-bold text-sm rounded-xl hover:bg-[#E55A1F] transition-colors"
                >
                  Listo
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className={`text-sm font-bold ${highlight ? 'text-[#FF6B2B]' : 'text-[#1B2B5E]'}`}>
        {value}
      </span>
    </div>
  );
}

function BankRow({
  label,
  value,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  onCopy?: () => void;
  copied?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500 text-xs">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[#1B2B5E] text-xs font-bold">{value}</span>
        {onCopy && (
          <button
            onClick={onCopy}
            className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            {copied ? (
              <Check className="w-3 h-3 text-green-500 stroke-[3]" />
            ) : (
              <Copy className="w-3 h-3 text-gray-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
