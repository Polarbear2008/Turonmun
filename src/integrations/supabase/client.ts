
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://sasuvkcqdqmmjobmgida.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhc3V2a2NxZHFtbWpvYm1naWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjkwNTEsImV4cCI6MjA2NjEwNTA1MX0.ZbjusSyiN3kBTVM10Ws_nKoqvblBQFvy8kZE6U3IqoQ";

// Hardcoded admin credentials for demo purposes (in a real app, this would use proper auth)
const ADMIN_EMAIL = "admin";
const ADMIN_PASSWORD = "admin123";

// Configure Supabase client with additional options for better reliability
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
    global: {
      headers: {
        'x-application-name': 'TuronMUN-website',
        'Accept': 'application/json',
      },
    },
  }
);

// Helper function to sign in as admin (simplified for demo)
export const signInAsAdmin = async () => {
  // For now, we'll use a simple token-based approach
  // In production, you'd want proper email/password authentication
  try {
    // Store admin session in localStorage for demo purposes
    localStorage.setItem('admin_session', JSON.stringify({
      user: { email: ADMIN_EMAIL, role: 'admin' },
      authenticated: true,
      timestamp: Date.now()
    }));
    
    return { success: true, message: 'Signed in as admin' };
  } catch (error: any) {
    console.error('Admin authentication error:', error.message);
    return { success: false, message: error.message };
  }
};

// Helper function to check if Supabase connection is working
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('committees').select('id').limit(1);
    if (error) throw error;
    return { success: true, message: 'Connected to Supabase' };
  } catch (error: any) {
    console.error('Supabase connection error:', error.message);
    return { success: false, message: error.message };
  }
};

// Helper function to check current auth state
export const checkAuthState = async () => {
  try {
    const adminSession = localStorage.getItem('admin_session');
    if (adminSession) {
      const session = JSON.parse(adminSession);
      // Check if session is not expired (24 hours)
      const isExpired = Date.now() - session.timestamp > 24 * 60 * 60 * 1000;
      if (!isExpired && session.authenticated) {
        return { isAuthenticated: true, user: session.user };
      }
    }
    return { isAuthenticated: false, user: null };
  } catch (error) {
    return { isAuthenticated: false, user: null };
  }
};

// Helper function to sign out
export const signOut = async () => {
  try {
    localStorage.removeItem('admin_session');
    return { success: true, message: 'Signed out successfully' };
  } catch (error: any) {
    console.error('Sign out error:', error.message);
    return { success: false, message: error.message };
  }
};
