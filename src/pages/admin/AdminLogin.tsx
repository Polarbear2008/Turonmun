
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Verify if the user is an admin
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (!adminError && adminData) {
          navigate('/admin/dashboard');
        }
      }
    };

    checkSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast({
        title: "Missing Fields",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // Check for the common admin credentials
      if (username === 'admin' && password === 'turonmun2025') {
        // Skip Supabase auth and grant access directly
        localStorage.setItem('TuronMUN_admin_access', 'true');
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
        });
        navigate('/admin/dashboard');
        return;
      }

      // Otherwise, proceed with Supabase auth for regular admin users
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username, // Use username as email for Supabase auth
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Check if the user is an admin
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (adminError || !adminData) {
          await supabase.auth.signOut();
          toast({
            title: "Access Denied",
            description: "You don't have admin privileges",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login Successful",
            description: "Welcome to the admin dashboard",
          });
          navigate('/admin/dashboard');
        }
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-diplomatic-50/50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-diplomatic-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-diplomatic-700" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-diplomatic-900">Admin Login</h1>
          <p className="text-neutral-600 mt-2">Sign in to access the TuronMUN admin dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-neutral-700 mb-1">
              Email or Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-diplomatic-500"
              placeholder="admin@turonmun.com"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-diplomatic-500"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-diplomatic-700 text-white py-2 px-4 rounded-md hover:bg-diplomatic-800 transition-colors font-medium disabled:opacity-70"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-diplomatic-600 hover:text-diplomatic-800 text-sm">
            Return to Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
