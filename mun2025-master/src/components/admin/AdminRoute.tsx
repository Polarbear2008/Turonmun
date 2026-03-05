
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for common admin access first
        const hasCommonAdminAccess = localStorage.getItem('turonmun_admin_access') === 'true';
        
        if (hasCommonAdminAccess) {
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }
        
        // If not common admin, check Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        
        // Check if user is an admin
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (adminError || !adminData) {
          setIsAuthenticated(false);
          toast({
            title: "Access Denied",
            description: "You don't have admin privileges",
            variant: "destructive",
          });
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth error:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    checkAuth();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/admin" replace />;
};

export default AdminRoute;
