import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Usuario {
  id: string;
  auth_id: string;
  nombre_completo: string;
  dni: string;
  email: string;
  telefono: string;
  created_at: string;
}

export interface Operacion {
  id: string;
  usuario_id: string;
  tipo: 'compra' | 'venta';
  moneda_origen: 'USD' | 'PEN';
  monto_envia: number;
  monto_recibe: number;
  tipo_cambio_usado: number;
  estado: 'pendiente' | 'completado';
  created_at: string;
}
