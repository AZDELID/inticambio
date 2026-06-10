import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, Usuario } from '../lib/supabase';

const PENDING_PROFILE_KEY = 'inticambio_pending_profile';

interface PendingProfile {
  auth_id: string;
  nombre_completo: string;
  dni: string;
  email: string;
  telefono: string;
}

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  usuario: Usuario | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUsuario: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  session: null,
  user: null,
  usuario: null,
  loading: true,
  signOut: async () => {},
  refreshUsuario: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchOrCreateUsuario(authUser: User): Promise<void> {
    // Try to fetch existing profile
    const { data } = await supabase
      .from('usuarios')
      .select('*')
      .eq('auth_id', authUser.id)
      .maybeSingle();

    if (data) {
      setUsuario(data);
      return;
    }

    // No profile found — check if there's a pending one from registration
    const raw = localStorage.getItem(PENDING_PROFILE_KEY);
    if (raw) {
      try {
        const pending: PendingProfile = JSON.parse(raw);
        // Only use it if the auth_id matches the currently signed-in user
        if (pending.auth_id === authUser.id) {
          const { data: inserted } = await supabase
            .from('usuarios')
            .insert(pending)
            .select()
            .single();
          if (inserted) {
            setUsuario(inserted);
            localStorage.removeItem(PENDING_PROFILE_KEY);
            return;
          }
        }
      } catch {
        // malformed data, ignore
      }
    }

    setUsuario(null);
  }

  async function refreshUsuario() {
    if (user) await fetchOrCreateUsuario(user);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchOrCreateUsuario(session.user).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchOrCreateUsuario(session.user);
      } else {
        setUsuario(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ session, user, usuario, loading, signOut, refreshUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
