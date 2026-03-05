
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jkpvnapmjtwdccnggiwt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprcHZuYXBtanR3ZGNjbmdnaXd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NjcwMTcsImV4cCI6MjA1NzI0MzAxN30.RLWuOjEtohaUFFsWtZn7H0LZWVo0OAPnBMvjsa7bxfs";

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
        'x-application-name': 'turonmun-website',
      },
    },
  }
);

// Helper function to sign in as admin
export const signInAsAdmin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  });

  if (error) {
    console.error('Admin authentication error:', error.message);
    return { success: false, message: error.message };
  }

  return { success: true, message: 'Signed in as admin', user: data.user };
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
  const { data } = await supabase.auth.getSession();
  return data.session ? { isAuthenticated: true, user: data.session.user } : { isAuthenticated: false, user: null };
};

// Helper function to sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Sign out error:', error.message);
    return { success: false, message: error.message };
  }
  return { success: true, message: 'Signed out successfully' };
};
