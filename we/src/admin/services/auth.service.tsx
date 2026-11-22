

import type { Session, User } from '@supabase/supabase-js';

import {
  isSupabaseConfigured,
  supabase,
} from '../../lib/supabase';

import type { AdminProfile } from '../../types/gabes';


interface VerifiedAdminSession {
  profile: AdminProfile | null;
  expiresAt: number | null;
}

function getClient() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Check your environment variables.');
  }

  return supabase;
}

function isAdminUser(user: User | null): user is User {
  return user?.app_metadata?.role === 'admin';
}

function createAdminProfile(user: User): AdminProfile {
  const metadata = user.user_metadata ?? {};

  return {
    id: user.id,
    email: user.email ?? '',
    displayName:
      metadata.display_name ??
      metadata.full_name ??
      metadata.name ??
      user.email?.split('@')[0] ??
      'Administrator',
  };
}

function verifySession(session: Session | null): VerifiedAdminSession {
  if (!session || !isAdminUser(session.user)) {
    return {
      profile: null,
      expiresAt: null,
    };
  }

  return {
    profile: createAdminProfile(session.user),
    expiresAt: session.expires_at
      ? session.expires_at * 1000
      : null,
  };
}

export async function getVerifiedAdminSession(): Promise<VerifiedAdminSession> {
  const client = getClient();

  const { data, error } = await client.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return verifySession(data.session);
}

export async function signInAdmin(
  email: string,
  password: string,
): Promise<AdminProfile> {
  const client = getClient();

  const { data, error } = await client.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!isAdminUser(data.user)) {
    await client.auth.signOut();
    throw new Error('Access denied. This account is not an administrator.');
  }

  return createAdminProfile(data.user);
}

export async function signOutAdmin(): Promise<void> {
  const client = getClient();

  const { error } = await client.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
