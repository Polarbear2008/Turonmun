
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Mail,
  LogOut,
  Menu,
  X,
  Globe
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/committees', label: 'Committees', icon: Users },
    { path: '/admin/schedule', label: 'Schedule', icon: Calendar },
    { path: '/admin/resources', label: 'Resources', icon: FileText },
    { path: '/admin/applications', label: 'Applications', icon: Users },
    { path: '/admin/messages', label: 'Messages', icon: Mail },
  ];
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
      navigate('/admin');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Failed",
        description: "An error occurred during logout",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-diplomatic-800 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
              <Globe className="text-diplomatic-800" size={18} />
            </div>
            <span className="text-xl font-semibold">turonmun Admin</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="mt-4">
          <div className="px-4 py-2 text-xs text-white/50 uppercase tracking-wider">
            Management
          </div>
          <ul className="mt-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-white/80 hover:bg-diplomatic-700 hover:text-white transition-colors ${
                    location.pathname === item.path ? 'bg-diplomatic-700 text-white' : ''
                  }`}
                >
                  <item.icon size={18} className="mr-3" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="px-4 py-2 mt-6 text-xs text-white/50 uppercase tracking-wider">
            Account
          </div>
          <ul className="mt-2">
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-6 py-3 text-white/80 hover:bg-diplomatic-700 hover:text-white transition-colors"
              >
                <LogOut size={18} className="mr-3" />
                <span>Logout</span>
              </button>
            </li>
            <li>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-3 text-white/80 hover:bg-diplomatic-700 hover:text-white transition-colors"
              >
                <Globe size={18} className="mr-3" />
                <span>View Website</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-700 hover:text-diplomatic-600 mr-4"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-lg font-medium">{title}</h1>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
