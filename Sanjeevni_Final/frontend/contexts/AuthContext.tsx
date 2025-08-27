'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing:', { supabaseUrl, supabaseAnonKey });
  throw new Error('Supabase credentials are not configured properly.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const initializeAuth = async () => {
      try {
        // First check localStorage for existing user data
        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        // Then verify with Supabase
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          throw sessionError;
        }
        
        if (session?.user) {
          setUser(session.user);
          localStorage.setItem('userData', JSON.stringify(session.user));
        } else if (!storedUser) {
          // Only clear user if there's no stored user data
          setUser(null);
          localStorage.removeItem('userData');
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        // Don't clear user state on initialization error
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('Auth state changed:', _event, session?.user?.id);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        localStorage.setItem('userData', JSON.stringify(session.user));
      } else {
        localStorage.removeItem('userData');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error("Supabase login error:", error);
        throw new Error(error.message);
      }
      if (!data.user) {
        console.error("Supabase login: No user returned.", data);
        throw new Error("No user returned from Supabase.");
      }
      setUser(data.user);
      localStorage.setItem('userData', JSON.stringify(data.user));
    } catch (err) {
      console.error("Login function error:", err);
      throw err;
    }
  };

  const signup = async (email: string, password: string): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.error("Supabase signup error:", error);
        throw new Error(error.message);
      }
      if (!data.user) {
        console.error("Supabase signup: No user returned.", data);
        throw new Error("No user returned from Supabase.");
      }
      setUser(data.user);
      localStorage.setItem('userData', JSON.stringify(data.user));
    } catch (err) {
      console.error("Signup function error:", err);
      throw err;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Supabase logout error:", error);
        throw new Error(error.message);
      }
      setUser(null);
      localStorage.removeItem('userData');
    } catch (err) {
      console.error("Logout function error:", err);
      throw err;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}