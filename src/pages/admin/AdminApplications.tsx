import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ApplicationManagementModal from '@/components/admin/ApplicationManagementModal';
import DeleteAllApplicationsModal from '@/components/admin/DeleteAllApplicationsModal';
import { supabase, checkAuthState } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, Clock, User, School, MapPin, Download, Filter, Search, Trash2, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { exportApplicationsToExcel } from '@/utils/excelExport';

interface Application {
  id: string;
  full_name: string;
  email: string;
  telegram_username?: string;
  institution: string;
  date_of_birth?: string;
  country: string;
  phone?: string;
  experience: string;
  previous_muns?: string;
  portfolio_link?: string;
  unique_delegate_trait?: string;
  issue_interest?: string;
  type1_selected_prompt?: string;
  type1_insight_response?: string;
  type2_selected_prompt?: string;
  type2_political_response?: string;
  committee_preference1: string;
  committee_preference2: string;
  committee_preference3: string;
  motivation?: string;
  fee_agreement?: string;
  discount_eligibility?: string;
  final_confirmation?: boolean;
  has_ielts: boolean;
  has_sat: boolean;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  application_id?: string;
  photo_url?: string;
  certificate_url?: string;
  ielts_certificate_url?: string;
  sat_certificate_url?: string;
}

const AdminApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalApplication, setModalApplication] = useState<Application | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [authChecked, setAuthChecked] = useState(false);
  const [acceptedEmails, setAcceptedEmails] = useState<string>('');
  const [rejectedEmails, setRejectedEmails] = useState<string>('');
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const { isAuthenticated, user } = await checkAuthState();
        console.log('Auth state:', { isAuthenticated, user });
        
        if (!isAuthenticated || !user) {
          console.log('Not authenticated, redirecting to login...');
          window.location.href = '/admin';
          return;
        }
        
        await fetchApplications();
        await loadEmailCollections(); // Load persisted emails
      } catch (error) {
        console.error('Auth check failed:', error);
        toast({
          title: "Authentication Error",
          description: "Failed to verify authentication status",
          variant: "destructive",
        });
      } finally {
        setAuthChecked(true);
        setLoading(false);
      }
    };
    
    checkAuth();
    
    // Set up a realtime subscription to applications
    const subscription = supabase
      .channel('applications')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'applications' },
        () => {
          console.log('Applications changed, refreshing...');
          fetchApplications();
        }
      )
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, statusFilter, searchQuery]);

  const fetchApplications = async () => {
    try {
      console.log('Fetching applications...');
      const { data, error, status } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });
        
      console.log('Supabase response:', { status, error, count: data?.length });
      
      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }
      
      if (!data) {
        console.warn('No data returned from applications table');
        setApplications([]);
        return;
      }
      
      console.log(`Successfully fetched ${data.length} applications`);
      
      // Convert the string status to the defined type
      const typedData = data.map(app => ({
        ...app,
        status: (app.status || 'pending') as 'pending' | 'approved' | 'rejected'
      }));
      
      setApplications(typedData);
    } catch (error: any) {
      console.error('Error in fetchApplications:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to load applications. Please check your connection and try again.",
        variant: "destructive",
      });
      setApplications([]);
    }
  };

  const filterApplications = () => {
    let filtered = [...applications];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        app => 
          app.full_name?.toLowerCase().includes(query) ||
          app.email?.toLowerCase().includes(query) ||
          app.institution?.toLowerCase().includes(query) ||
          app.country?.toLowerCase().includes(query)
      );
    }
    
    setFilteredApplications(filtered);
  };

  const updateApplicationStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local applications state
      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status } : app
        )
      );
      
      if (modalApplication?.id === id) {
        setModalApplication(prev => prev ? { ...prev, status } : null);
      }
      
      // Refresh email collections from database
      await loadEmailCollections();
      
      toast({
        title: "Status Updated",
        description: `Application has been ${status}`,
      });
    } catch (error) {
      console.error('Error updating application status:', error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: `${type} emails copied to clipboard`,
      });
    }).catch(() => {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    });
  };

  const clearEmails = (type: 'accepted' | 'rejected') => {
    if (type === 'accepted') {
      setAcceptedEmails('');
    } else {
      setRejectedEmails('');
    }
    toast({
      title: "Cleared",
      description: `${type} emails list cleared`,
    });
  };

  const deleteApplication = async (id: string) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to delete this application? This action cannot be undone.'
    );
    
    if (!confirmed) return;
    
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setApplications(prev => prev.filter(app => app.id !== id));
      setFilteredApplications(prev => prev.filter(app => app.id !== id));
      
      // Clear selected application if it was deleted
      if (modalApplication?.id === id) {
        setModalApplication(null);
      }
      
      // Refresh email collections from database
      await loadEmailCollections();
      
      toast({
        title: "Application Deleted",
        description: "The application has been permanently deleted",
      });
    } catch (error) {
      console.error('Error deleting application:', error);
      toast({
        title: "Error",
        description: "Failed to delete application",
        variant: "destructive",
      });
    }
  };

  const handleExportExcel = () => {
    try {
      const fileName = exportApplicationsToExcel(filteredApplications, 'TuronMUN_Applications');
      toast({
        title: "Export Successful",
        description: `Applications exported to ${fileName}`,
      });
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      toast({
        title: "Export Failed",
        description: "Failed to export applications. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Load email collections from Supabase
  const loadEmailCollections = async () => {
    try {
      // Get all approved applications
      const { data: approved, error: approvedError } = await supabase
        .from('applications')
        .select('email')
        .eq('status', 'approved');
        
      if (approvedError) throw approvedError;
      
      // Get all rejected applications  
      const { data: rejected, error: rejectedError } = await supabase
        .from('applications')
        .select('email')
        .eq('status', 'rejected');
        
      if (rejectedError) throw rejectedError;
      
      // Set email collections
      setAcceptedEmails(approved ? approved.map(app => app.email).join(', ') : '');
      setRejectedEmails(rejected ? rejected.map(app => app.email).join(', ') : '');
      
    } catch (error) {
      console.error('Error loading email collections:', error);
      toast({
        title: "Error",
        description: "Failed to load email collections",
        variant: "destructive",
      });
    }
  };

  const deleteAllApplications = async () => {
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records
        
      if (error) throw error;
      
      // Clear local state
      setApplications([]);
      setFilteredApplications([]);
      setAcceptedEmails('');
      setRejectedEmails('');
      
      // Close modal if open
      if (modalApplication) {
        setModalApplication(null);
      }
      
      toast({
        title: "All Applications Deleted",
        description: "All applications have been permanently deleted from the database",
      });
    } catch (error) {
      console.error('Error deleting all applications:', error);
      toast({
        title: "Error",
        description: "Failed to delete all applications",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout title="Applications Management">
      {!authChecked || loading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-diplomatic-600"></div>
          <p className="text-diplomatic-600">Loading applications...</p>
        </div>
      ) : (
        <>
          {/* Email Collection Section */}
          <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Accepted Emails */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-green-800">Accepted Emails</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(acceptedEmails, 'Accepted')}
                    disabled={!acceptedEmails}
                    className="px-3 py-1 text-xs bg-green-600 text-white rounded disabled:bg-gray-300 hover:bg-green-700"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => clearEmails('accepted')}
                    disabled={!acceptedEmails}
                    className="px-3 py-1 text-xs bg-red-600 text-white rounded disabled:bg-gray-300 hover:bg-red-700"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <textarea
                value={acceptedEmails}
                readOnly
                className="w-full h-20 p-2 text-xs border border-green-300 rounded bg-white resize-none"
                placeholder="Accepted applicant emails will appear here (comma-separated)"
              />
            </div>

            {/* Rejected Emails */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-red-800">Rejected Emails</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(rejectedEmails, 'Rejected')}
                    disabled={!rejectedEmails}
                    className="px-3 py-1 text-xs bg-red-600 text-white rounded disabled:bg-gray-300 hover:bg-red-700"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => clearEmails('rejected')}
                    disabled={!rejectedEmails}
                    className="px-3 py-1 text-xs bg-red-600 text-white rounded disabled:bg-gray-300 hover:bg-red-700"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <textarea
                value={rejectedEmails}
                readOnly
                className="w-full h-20 p-2 text-xs border border-red-300 rounded bg-white resize-none"
                placeholder="Rejected applicant emails will appear here (comma-separated)"
              />
            </div>
          </div>

          <div className="flex flex-col h-full">
            {/* Applications Grid */}
            <div className="w-full">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold mb-2 md:mb-0">Applications Management</h3>
                    
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Filter size={14} className="text-gray-400" />
                        </div>
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm"
                        >
                          <option value="all">All Applications</option>
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                      
                      <button
                        onClick={handleExportExcel}
                        className="bg-green-600 text-white py-2 px-3 rounded-md text-sm flex items-center hover:bg-green-700 transition-colors"
                      >
                        <Download size={14} className="mr-1" />
                        Export Excel
                      </button>
                      
                      <button
                        onClick={() => setIsDeleteAllModalOpen(true)}
                        disabled={applications.length === 0}
                        className="bg-red-600 text-white py-2 px-3 rounded-md text-sm flex items-center hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Delete All
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name, email, school, country..."
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="p-6">
                  {filteredApplications.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      {applications.length === 0 
                        ? 'No applications have been submitted yet'
                        : 'No applications match your search criteria'}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredApplications.map((app) => (
                        <div 
                          key={app.id}
                          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                              <div className="mr-3">
                                {app.status === 'approved' ? (
                                  <CheckCircle size={20} className="text-green-500" />
                                ) : app.status === 'rejected' ? (
                                  <XCircle size={20} className="text-red-500" />
                                ) : (
                                  <Clock size={20} className="text-yellow-500" />
                                )}
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                app.status === 'approved' 
                                  ? 'bg-green-100 text-green-800' 
                                  : app.status === 'rejected'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-900 text-lg mb-2">{app.full_name}</h4>
                            <div className="text-sm text-gray-600 mb-2">{app.email}</div>
                            
                            <div className="flex flex-col gap-2 text-sm">
                              <div className="flex items-center text-gray-500">
                                <School size={14} className="mr-2" />
                                {app.institution}
                              </div>
                              <div className="flex items-center text-gray-500">
                                <MapPin size={14} className="mr-2" />
                                {app.country}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="text-xs text-gray-500">
                              {new Date(app.created_at).toLocaleDateString()}
                            </div>
                            
                            <button
                              onClick={() => setModalApplication(app)}
                              className="bg-diplomatic-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-diplomatic-700 transition-colors"
                            >
                              <Settings size={16} />
                              <span>Manage</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Application Management Modal */}
          {modalApplication && (
            <ApplicationManagementModal
              application={modalApplication}
              onClose={() => setModalApplication(null)}
              onUpdateStatus={updateApplicationStatus}
              onDelete={deleteApplication}
            />
          )}
          
          {/* Delete All Applications Modal */}
          <DeleteAllApplicationsModal
            isOpen={isDeleteAllModalOpen}
            onClose={() => setIsDeleteAllModalOpen(false)}
            onConfirm={deleteAllApplications}
            applicationCount={applications.length}
          />
        </>
      )}
    </AdminLayout>
  );
};

export default AdminApplications;
