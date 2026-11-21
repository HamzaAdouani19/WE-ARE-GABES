
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { supabase } from '../lib/supabase';
import {
  getVerifiedAdminSession,
  signInAdmin,
  signOutAdmin,
} from './services/auth.service';

import type { AdminProfile } from '../types/gabes';

type AuthStatus =
  | 'loading'
  | 'authenticated'
  | 'unauthenticated';

interface AdminAuthContextValue {
  status: AuthStatus;
  profile: AdminProfile | null;
  expiresAt: number | null;
  authError: string | null;

  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  clearAuthError: () => void;
}

const AdminAuthContext =
  createContext<AdminAuthContextValue | undefined>(undefined);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export function AdminAuthProvider({
  children,
}: AdminAuthProviderProps) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const refreshSession = useCallback(async () => {
    try {
      const session = await getVerifiedAdminSession();

      setProfile(session.profile);
      setExpiresAt(session.expiresAt);
      setStatus(
        session.profile ? 'authenticated' : 'unauthenticated',
      );
    } catch (error) {
      setProfile(null);
      setExpiresAt(null);
      setStatus('unauthenticated');

      setAuthError(
        error instanceof Error
          ? error.message
          : 'Unable to verify your session.',
      );
    }
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      setAuthError(null);
      setStatus('loading');

      try {
        const adminProfile = await signInAdmin(email, password);

        setProfile(adminProfile);

        const session = await getVerifiedAdminSession();
        setExpiresAt(session.expiresAt);
        setStatus('authenticated');
      } catch (error) {
        setProfile(null);
        setExpiresAt(null);
        setStatus('unauthenticated');

        const message =
          error instanceof Error
            ? error.message
            : 'Unable to sign in. Please try again.';

        setAuthError(message);
        throw error;
      }
    },
    [],
  );

  const signOut = useCallback(async () => {
    setAuthError(null);

    try {
      await signOutAdmin();

      setProfile(null);
      setExpiresAt(null);
      setStatus('unauthenticated');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to sign out.';

      setAuthError(message);
      throw error;
    }
  }, []);

  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  useEffect(() => {
    void refreshSession();

    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setProfile(null);
        setExpiresAt(null);
        setStatus('unauthenticated');
        return;
      }

      if (
        event === 'SIGNED_IN' ||
        event === 'TOKEN_REFRESHED' ||
        event === 'USER_UPDATED'
      ) {
        // Run after the auth callback has completed.
        queueMicrotask(() => {
          void refreshSession();
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [refreshSession]);

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      status,
      profile,
      expiresAt,
      authError,
      signIn,
      signOut,
      refreshSession,
      clearAuthError,
    }),
    [
      status,
      profile,
      expiresAt,
      authError,
      signIn,
      signOut,
      refreshSession,
      clearAuthError,
    ],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error(
      'useAdminAuth must be used inside AdminAuthProvider.',
    );
  }

  return context;
}
