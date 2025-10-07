
import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase, checkSupabaseConnection } from '@/integrations/supabase/client';
import { Users, Calendar, FileText, Mail, ArrowUp, AlertCircle, ChevronRight, UserCheck, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface DashboardCounts {
  committees: number;
  schedule_days: number;
  applications: number;
  unread_messages: number;
  resources: number;
}

interface WebsiteStats {
  totalVisitors: number;
  activeApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  pendingApplications: number;
}

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<{success: boolean, message: string} | null>(null);
  const { toast } = useToast();
  const [counts, setCounts] = useState<DashboardCounts>({
    committees: 0,
    schedule_days: 0,
    applications: 0,
    unread_messages: 0,
    resources: 0,
  });
  
  const [stats, setStats] = useState<WebsiteStats>({
    totalVisitors: 0,
    activeApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    pendingApplications: 0,
  });
  
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [applicationsByStatus, setApplicationsByStatus] = useState<Record<string, number>>({});
  const [applicationsByCountry, setApplicationsByCountry] = useState<Record<string, number>>({});

  useEffect(() => {
    const checkConnection = async () => {
      const status = await checkSupabaseConnection();
      setConnectionStatus(status);
      
      if (!status.success) {
        toast({
          title: "Database Connection Error",
          description: status.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      fetchDashboardData();
    };
    
    checkConnection();
  }, [toast]);

  const fetchDashboardData = async () => {
    try {
      // Fetch counts
      const committeesCount = await supabase
        .from('committees')
        .select('id', { count: 'exact', head: true });
      
      const scheduleDaysCount = await supabase
        .from('schedule_events')
        .select('id', { count: 'exact', head: true });
      
      const applicationsCount = await supabase
        .from('applications')
        .select('id', { count: 'exact', head: true });
      
      const unreadMessagesCount = await supabase
        .from('contact_messages')
        .select('id', { count: 'exact', head: true })
        .eq('is_read', false);
      
      const resourcesCount = await supabase
        .from('resources')
        .select('id', { count: 'exact', head: true });
      
      // Fetch recent applications
      const { data: recentApps, error: appsError } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (appsError) {
        console.error('Error fetching applications:', appsError);
      }
      
      // Fetch recent messages
      const { data: recentMsgs, error: msgsError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (msgsError) {
        console.error('Error fetching messages:', msgsError);
      }
      
      // Get application statistics by status
      const { data: statusStats, error: statusError } = await supabase
        .from('applications')
        .select('status')
        .not('status', 'is', null);
        
      if (statusError) {
        console.error('Error fetching application status stats:', statusError);
      } else if (statusStats) {
        const statusCounts: Record<string, number> = {};
        statusStats.forEach(app => {
          const status = app.status || 'unknown';
          statusCounts[status] = (statusCounts[status] || 0) + 1;
        });
        setApplicationsByStatus(statusCounts);
        
        // Update application stats
        setStats(prev => ({
          ...prev,
          activeApplications: statusStats.length,
          approvedApplications: statusCounts['approved'] || 0,
          rejectedApplications: statusCounts['rejected'] || 0,
          pendingApplications: statusCounts['pending'] || 0,
        }));
      }
      
      // Get application statistics by country
      const { data: countryStats, error: countryError } = await supabase
        .from('applications')
        .select('country');
        
      if (countryError) {
        console.error('Error fetching application country stats:', countryError);
      } else if (countryStats) {
        const countryCounts: Record<string, number> = {};
        countryStats.forEach(app => {
          if (app.country) {
            countryCounts[app.country] = (countryCounts[app.country] || 0) + 1;
          }
        });
        setApplicationsByCountry(countryCounts);
      }
      
      setCounts({
        committees: committeesCount.count || 0,
        schedule_days: scheduleDaysCount.count || 0,
        applications: applicationsCount.count || 0,
        unread_messages: unreadMessagesCount.count || 0,
        resources: resourcesCount.count || 0,
      });
      
      setRecentApplications(recentApps || []);
      setRecentMessages(recentMsgs || []);
      
      // Set mock total visitors for now - in a real app, this would come from analytics
      setStats(prev => ({ ...prev, totalVisitors: 1254 }));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error Loading Dashboard",
        description: "There was an error fetching dashboard data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, count, icon: Icon, path, color }: { 
    title: string; 
    count: number; 
    icon: any; 
    path: string;
    color: string;
  }) => (
    <Link to={path} className="block">
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-semibold mt-1">{count}</p>
          </div>
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon size={20} className="text-white" />
          </div>
        </div>
      </div>
    </Link>
  );

  const QuickAction = ({ title, description, icon: Icon, path }: {
    title: string;
    description: string;
    icon: any;
    path: string;
  }) => (
    <Link to={path} className="block">
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-lg bg-diplomatic-50 text-diplomatic-700">
            <Icon size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
          <div className="text-diplomatic-600">
            <ChevronRight size={20} />
          </div>
        </div>
      </div>
    </Link>
  );

  const renderStatisticsCharts = () => {
    // Application Status Chart - Simplified visualization
    const statusColors: Record<string, string> = {
      approved: 'bg-green-500',
      rejected: 'bg-red-500',
      pending: 'bg-yellow-500',
    };
    
    const totalApplications = Object.values(applicationsByStatus).reduce((a, b) => a + b, 0);
    
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Applications by Status</h3>
        
        {Object.keys(applicationsByStatus).length > 0 ? (
          <div className="space-y-4">
            <div className="flex h-8 w-full rounded-md overflow-hidden">
              {Object.entries(applicationsByStatus).map(([status, count]) => (
                <div 
                  key={status}
                  className={`${statusColors[status] || 'bg-gray-500'}`}
                  style={{ width: `${(count / totalApplications) * 100}%` }}
                  title={`${status}: ${count} (${Math.round((count / totalApplications) * 100)}%)`}
                />
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(applicationsByStatus).map(([status, count]) => (
                <div key={status} className="text-center">
                  <div className="text-2xl font-semibold">{count}</div>
                  <div className="text-sm text-gray-500 capitalize">{status}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No application data available
          </div>
        )}
      </div>
    );
  };

  const renderGeographicDistribution = () => {
    // Top 5 countries by applications
    const topCountries = Object.entries(applicationsByCountry)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
        
        {topCountries.length > 0 ? (
          <div className="space-y-3">
            {topCountries.map(([country, count]) => (
              <div key={country} className="flex items-center">
                <div className="w-32 truncate">{country}</div>
                <div className="flex-1 mx-2">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-diplomatic-600 rounded-full" 
                      style={{ width: `${(count / topCountries[0][1]) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="w-8 text-right text-sm text-gray-600">{count}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No geographic data available
          </div>
        )}
      </div>
    );
  };

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="loader w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : !connectionStatus?.success ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
          <h3 className="text-xl font-semibold text-red-800 mb-2">Database Connection Error</h3>
          <p className="mb-4 text-red-700">
            {connectionStatus?.message || "Could not connect to database. Please check your connection and try again."}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry Connection
          </button>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Committees" 
                count={counts.committees} 
                icon={Users} 
                path="/admin/committees"
                color="bg-blue-500"
              />
              <StatCard 
                title="Schedule Days" 
                count={counts.schedule_days} 
                icon={Calendar} 
                path="/admin/schedule"
                color="bg-green-500"
              />
              <StatCard 
                title="Applications" 
                count={counts.applications} 
                icon={UserCheck}
                path="/admin/applications"
                color="bg-purple-500"
              />
              <StatCard 
                title="Unread Messages" 
                count={counts.unread_messages} 
                icon={Mail}
                path="/admin/messages"
                color="bg-red-500"
              />
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <QuickAction
                title="Review Pending Applications"
                description="Review and approve/reject participant applications"
                icon={UserCheck}
                path="/admin/applications"
              />
              <QuickAction
                title="Update Schedule"
                description="Manage event schedule and activities"
                icon={Calendar}
                path="/admin/schedule"
              />
              <QuickAction
                title="Manage Committees"
                description="Add, edit or remove conference committees"
                icon={Globe}
                path="/admin/committees"
              />
              <QuickAction
                title="Response to Messages"
                description="Check and respond to contact messages"
                icon={Mail}
                path="/admin/messages"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {renderStatisticsCharts()}
            {renderGeographicDistribution()}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Applications</h3>
                <Link 
                  to="/admin/applications" 
                  className="text-diplomatic-600 hover:text-diplomatic-800 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              
              {recentApplications.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2 text-sm font-medium text-gray-500">Name</th>
                        <th className="text-left py-2 px-2 text-sm font-medium text-gray-500">Institution</th>
                        <th className="text-left py-2 px-2 text-sm font-medium text-gray-500">Status</th>
                        <th className="text-left py-2 px-2 text-sm font-medium text-gray-500">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentApplications.map((app) => (
                        <tr key={app.id} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="py-3 px-2">{app.full_name}</td>
                          <td className="py-3 px-2">{app.institution}</td>
                          <td className="py-3 px-2">
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                              app.status === 'approved' 
                                ? 'bg-green-100 text-green-800' 
                                : app.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-500">
                            {new Date(app.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No applications yet
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Messages</h3>
                <Link 
                  to="/admin/messages" 
                  className="text-diplomatic-600 hover:text-diplomatic-800 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              
              {recentMessages.length > 0 ? (
                <div className="space-y-4">
                  {recentMessages.map((msg) => (
                    <div key={msg.id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{msg.name}</h4>
                        <span className="text-sm text-gray-500">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{msg.subject}</p>
                      {!msg.is_read && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">
                          Unread
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No messages yet
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
