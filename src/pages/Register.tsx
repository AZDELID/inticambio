import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, AlertCircle, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

const PENDING_PROFILE_KEY = 'inticambio_pending_profile';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre_completo: '',
    dni: '',
    email: '',
    telefono: '',
    password: '',
    confirmar_password: '',
    acepta_terminos: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [waitingConfirmation, setWaitingConfirmation] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function validate(): string | null {
    if (form.nombre_completo.trim().length < 3) return 'Ingresa tu nombre completo.';
    if (!/^\d{8}$/.test(form.dni)) return 'El DNI debe tener exactamente 8 dígitos numéricos.';
    if (form.password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
    if (form.password !== form.confirmar_password) return 'Las contraseñas no coinciden.';
    if (!form.acepta_terminos) return 'Debes aceptar los términos y condiciones para continuar.';
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setLoading(true);
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email.trim().toLowerCase(),
      password: form.password,
    });
    setLoading(false);

    if (authError || !authData.user) {
      if (authError?.message?.toLowerCase().includes('already registered')) {
        setError('Este correo ya está registrado. Intenta iniciar sesión.');
      } else {
        setError(authError?.message ?? 'Error al crear la cuenta. Intenta de nuevo.');
      }
      return;
    }

    const profileData = {
      auth_id: authData.user.id,
      nombre_completo: form.nombre_completo.trim(),
      dni: form.dni.trim(),
      email: form.email.trim().toLowerCase(),
      telefono: form.telefono.trim(),
    };

    // If we have a session, insert immediately
    if (authData.session) {
      const { error: insertError } = await supabase.from('usuarios').insert(profileData);
      if (insertError) {
        // Save to localStorage as fallback so AuthContext can retry on next login
        localStorage.setItem(PENDING_PROFILE_KEY, JSON.stringify(profileData));
      }
      navigate('/');
    } else {
      // Email confirmation required — save profile data for after confirmation
      localStorage.setItem(PENDING_PROFILE_KEY, JSON.stringify(profileData));
      setWaitingConfirmation(true);
    }
  }

  if (waitingConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <Mail className="w-8 h-8 text-[#1B2B5E]" />
          </div>
          <h2 className="text-2xl font-black text-[#1B2B5E] mb-3">Revisa tu correo</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Te enviamos un enlace de confirmación a{' '}
            <span className="font-bold text-[#1B2B5E]">{form.email}</span>. Haz clic en el enlace para activar tu cuenta y luego inicia sesión.
          </p>
          <Link
            to="/login"
            className="inline-block w-full py-3.5 bg-[#FF6B2B] text-white font-bold rounded-xl hover:bg-[#E55A1F] transition-colors"
          >
            Ir a Iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-1 justify-center">
            <span className="text-3xl font-black text-[#1B2B5E]">Inti</span>
            <span className="text-3xl font-black text-[#FF6B2B] flex items-center gap-1">
              Cambio
              <span className="w-6 h-6 bg-[#FF6B2B] rounded-full flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
              </span>
            </span>
          </Link>
          <h1 className="mt-4 text-2xl font-black text-[#1B2B5E]">Crea tu cuenta</h1>
          <p className="text-gray-500 text-sm mt-1">Regístrate y empieza a cambiar divisas</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Nombre completo">
              <input
                name="nombre_completo"
                type="text"
                value={form.nombre_completo}
                onChange={handleChange}
                required
                placeholder="Vicky Alania García"
                className={inputClass}
              />
            </Field>

            <Field label="DNI (8 dígitos)">
              <input
                name="dni"
                type="text"
                value={form.dni}
                onChange={handleChange}
                required
                maxLength={8}
                placeholder="12345678"
                className={inputClass}
              />
            </Field>

            <Field label="Correo electrónico">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="tu@correo.pe"
                className={inputClass}
              />
            </Field>

            <Field label="Teléfono">
              <input
                name="telefono"
                type="tel"
                value={form.telefono}
                onChange={handleChange}
                placeholder="+51 999 888 777"
                className={inputClass}
              />
            </Field>

            <Field label="Contraseña">
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Mínimo 8 caracteres"
                  className={`${inputClass} pr-12`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </Field>

            <Field label="Confirmar contraseña">
              <div className="relative">
                <input
                  name="confirmar_password"
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirmar_password}
                  onChange={handleChange}
                  required
                  placeholder="Repite tu contraseña"
                  className={`${inputClass} pr-12`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </Field>

            <label className="flex items-start gap-3 cursor-pointer mt-2">
              <div className="mt-0.5 shrink-0">
                <input
                  name="acepta_terminos"
                  type="checkbox"
                  checked={form.acepta_terminos}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  onClick={() => setForm(prev => ({ ...prev, acepta_terminos: !prev.acepta_terminos }))}
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors cursor-pointer ${
                    form.acepta_terminos
                      ? 'bg-[#FF6B2B] border-[#FF6B2B]'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {form.acepta_terminos && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
              </div>
              <span className="text-sm text-gray-600">
                Acepto los{' '}
                <a href="#" className="text-[#FF6B2B] font-semibold hover:underline">términos y condiciones</a>{' '}
                y la{' '}
                <a href="#" className="text-[#FF6B2B] font-semibold hover:underline">política de privacidad</a>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#FF6B2B] text-white font-black text-sm uppercase tracking-wider rounded-xl hover:bg-[#E55A1F] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-orange-100 mt-2"
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-[#FF6B2B] font-bold hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const inputClass =
  'w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-gray-800 text-sm outline-none focus:border-[#FF6B2B] transition-colors placeholder-gray-400';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
