import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSupabaseClient, getSupabaseCredentials } from '../utils/supabaseClient';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  isDemo?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isSupabaseConfigured: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, pass: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loginAsDemoUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  const { isConfigured } = getSupabaseCredentials();

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (supabase && isConfigured) {
      // Check existing Supabase session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'user@solvexa.org',
            fullName: session.user.user_metadata?.full_name || 'Verified Citizen',
            isDemo: false,
          });
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'user@solvexa.org',
            fullName: session.user.user_metadata?.full_name || 'Verified Citizen',
            isDemo: false,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Check local storage for persistent demo login session
      const savedDemoUser = localStorage.getItem('solvexa_demo_session');
      if (savedDemoUser) {
        try {
          setUser(JSON.parse(savedDemoUser));
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
    }
  }, [isConfigured]);

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const supabase = getSupabaseClient();
    if (supabase && isConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (error) {
        return { success: false, error: error.message };
      }
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || email,
          fullName: data.user.user_metadata?.full_name || 'Verified Citizen',
          isDemo: false,
        });
        closeAuthModal();
        return { success: true };
      }
    }

    // Demo Mode login
    if (!email || !pass) {
      return { success: false, error: 'Please provide both email and password.' };
    }
    const demoUser: AuthUser = {
      id: 'demo-user-12345',
      email: email.trim().toLowerCase(),
      fullName: email.split('@')[0].toUpperCase() || 'Demo Citizen',
      isDemo: true,
    };
    setUser(demoUser);
    localStorage.setItem('solvexa_demo_session', JSON.stringify(demoUser));
    closeAuthModal();
    return { success: true };
  };

  const signup = async (
    email: string,
    pass: string,
    fullName: string
  ): Promise<{ success: boolean; error?: string }> => {
    const supabase = getSupabaseClient();
    if (supabase && isConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: { full_name: fullName },
        },
      });
      if (error) {
        return { success: false, error: error.message };
      }
      if (data.user) {
        // Create profile row if user id exists
        try {
          await supabase.from('profiles').insert([{ id: data.user.id, full_name: fullName }]);
        } catch {
          // ignore if table trigger handles it
        }
        setUser({
          id: data.user.id,
          email: data.user.email || email,
          fullName: fullName || 'Verified Citizen',
          isDemo: false,
        });
        closeAuthModal();
        return { success: true };
      }
    }

    // Demo Mode signup
    if (!email || !pass || !fullName) {
      return { success: false, error: 'All fields are required.' };
    }
    if (pass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }
    const demoUser: AuthUser = {
      id: 'demo-user-' + Date.now(),
      email: email.trim().toLowerCase(),
      fullName: fullName.trim(),
      isDemo: true,
    };
    setUser(demoUser);
    localStorage.setItem('solvexa_demo_session', JSON.stringify(demoUser));
    closeAuthModal();
    return { success: true };
  };

  const logout = async () => {
    const supabase = getSupabaseClient();
    if (supabase && isConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('solvexa_demo_session');
  };

  const loginAsDemoUser = () => {
    const demoUser: AuthUser = {
      id: 'demo-user-12345',
      email: 'citizen.sample@solvexa.org',
      fullName: 'Sampreeth Goud',
      isDemo: true,
    };
    setUser(demoUser);
    localStorage.setItem('solvexa_demo_session', JSON.stringify(demoUser));
    closeAuthModal();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isSupabaseConfigured: isConfigured,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        logout,
        loginAsDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
