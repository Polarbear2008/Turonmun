import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const ChairLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    // If a session already exists, verify chair role and redirect
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                const { data: adminData, error } = await supabase
                    .from('admin_users')
                    .select('role')
                    .eq('email', session.user.email)
                    .single();

                // Only redirect if they ARE a chair
                if (!error && adminData?.role === 'chair') {
                    navigate('/chair-dashboard');
                }
                // If not a chair, just stay on login page (don't sign out)
            }
        };
        checkSession();
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast({
                title: 'Missing Fields',
                description: 'Please enter both email and password',
                variant: 'destructive',
            });
            return;
        }
        try {
            setLoading(true);
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;

            if (data?.user) {
                // Verify that the authenticated user is a chair
                const { data: adminData, error: adminError } = await supabase
                    .from('admin_users')
                    .select('role')
                    .eq('id', data.user.id)
                    .single();

                if (adminError || adminData?.role !== 'chair') {
                    await supabase.auth.signOut();
                    toast({
                        title: 'Access Denied',
                        description: "You don't have permission to access the Chair Dashboard.",
                        variant: 'destructive',
                    });
                    return;
                }

                toast({
                    title: 'Login Successful',
                    description: 'Welcome to the Chair Dashboard',
                });
                navigate('/chair-dashboard');
            }
        } catch (err: any) {
            toast({
                title: 'Login Failed',
                description: err.message || 'An error occurred during login',
                variant: 'destructive',
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
                    <h1 className="text-2xl font-bold text-diplomatic-900">Chair Login</h1>
                    <p className="text-neutral-600 mt-2">Sign in to manage your committee</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-diplomatic-500"
                            placeholder="chair@turonmun.com"
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
                        {loading ? 'Signing in…' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChairLogin;
