
import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase, checkAuthState } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, Clock, User, School, MapPin, Download, Filter, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Application {
  id: string;
  full_name: string;
  email: string;
  institution: string;
  country: string;
  experience: string;
  committee_preference1: string;
  committee_preference2: string;
  committee_preference3: string;
  motivation?: string;
  dietary_restrictions?: string;
  has_ielts: boolean;
  has_sat: boolean;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

const AdminApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [authChecked, setAuthChecked] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { isAuthenticated } = await checkAuthState();
      if (isAuthenticated) {
        fetchApplications();
      }
      setAuthChecked(true);
    };
    
    checkAuth();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, statusFilter, searchQuery]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      console.log('Fetching applications...');
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching applications:', error);
        throw error;
      }
      
      console.log('Applications fetched:', data?.length || 0);
      
      // Convert the string status to the defined type
      const typedData = (data || []).map(app => ({
        ...app,
        status: (app.status || 'pending') as 'pending' | 'approved' | 'rejected'
      }));
      
      setApplications(typedData);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to load applications. Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
      
      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status } : app
        )
      );
      
      if (selectedApplication?.id === id) {
        setSelectedApplication(prev => prev ? { ...prev, status } : null);
      }
      
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

  const handleExportCSV = () => {
    // Create CSV content
    const headers = [
      'Full Name', 'Email', 'Institution', 'Country', 
      'Experience', 'Committee Preference 1', 'Committee Preference 2',
      'Committee Preference 3', 'Motivation', 'Dietary Restrictions',
      'Has IELTS', 'Has SAT', 'Status', 'Applied On'
    ];
    
    const csvRows = [
      headers.join(','),
      ...filteredApplications.map(app => [
        `"${app.full_name || ''}"`,
        `"${app.email || ''}"`,
        `"${app.institution || ''}"`,
        `"${app.country || ''}"`,
        `"${app.experience || ''}"`,
        `"${app.committee_preference1 || ''}"`,
        `"${app.committee_preference2 || ''}"`,
        `"${app.committee_preference3 || ''}"`,
        `"${app.motivation || ''}"`,
        `"${app.dietary_restrictions || ''}"`,
        app.has_ielts ? 'Yes' : 'No',
        app.has_sat ? 'Yes' : 'No',
        app.status,
        new Date(app.created_at).toLocaleDateString()
      ].join(','))
    ];
    
    const csvContent = csvRows.join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'turonmun_applications.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!authChecked) {
    return (
      <AdminLayout title="Applications Management">
        <div className="flex items-center justify-center h-64">
          <div className="loader w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Applications Management">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="loader w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col h-full lg:flex-row lg:gap-6">
          {/* List panel */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold mb-2 md:mb-0">Applications</h3>
                  
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
                      onClick={handleExportCSV}
                      className="bg-diplomatic-700 text-white py-2 px-3 rounded-md text-sm flex items-center hover:bg-diplomatic-800"
                    >
                      <Download size={14} className="mr-1" />
                      Export CSV
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
              
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    {applications.length === 0 
                      ? 'No applications have been submitted yet'
                      : 'No applications match your search criteria'}
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {filteredApplications.map((app) => (
                      <div 
                        key={app.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 ${
                          selectedApplication?.id === app.id ? 'bg-diplomatic-50' : ''
                        }`}
                        onClick={() => setSelectedApplication(app)}
                      >
                        <div className="flex justify-between">
                          <div className="flex-1">
                            <div className="flex items-start">
                              <div className="mr-3">
                                {app.status === 'approved' ? (
                                  <CheckCircle size={18} className="text-green-500" />
                                ) : app.status === 'rejected' ? (
                                  <XCircle size={18} className="text-red-500" />
                                ) : (
                                  <Clock size={18} className="text-yellow-500" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{app.full_name}</h4>
                                <div className="text-sm text-gray-500 mt-1">{app.email}</div>
                                <div className="flex flex-wrap gap-3 mt-2 text-xs">
                                  <div className="flex items-center text-gray-500">
                                    <School size={12} className="mr-1" />
                                    {app.institution}
                                  </div>
                                  <div className="flex items-center text-gray-500">
                                    <MapPin size={12} className="mr-1" />
                                    {app.country}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 whitespace-nowrap">
                            {new Date(app.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Detail panel */}
          <div className="mt-6 lg:mt-0 lg:w-1/3">
            {selectedApplication ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-lg font-semibold">Application Details</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedApplication.status === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : selectedApplication.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Personal Information</div>
                    <div className="flex items-center mb-2">
                      <User size={16} className="text-gray-400 mr-2" />
                      <span className="font-medium">{selectedApplication.full_name}</span>
                    </div>
                    <div className="pl-6 mb-1">
                      <div className="text-sm">Email: {selectedApplication.email}</div>
                    </div>
                    <div className="pl-6 mb-1">
                      <div className="text-sm">Institution: {selectedApplication.institution}</div>
                    </div>
                    <div className="pl-6 mb-1">
                      <div className="text-sm">Country: {selectedApplication.country}</div>
                    </div>
                    <div className="pl-6">
                      <div className="text-sm">Experience: {selectedApplication.experience}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Committee Preferences</div>
                    <ol className="list-decimal pl-8 space-y-1">
                      <li className="text-sm">{selectedApplication.committee_preference1}</li>
                      <li className="text-sm">{selectedApplication.committee_preference2}</li>
                      <li className="text-sm">{selectedApplication.committee_preference3}</li>
                    </ol>
                  </div>
                  
                  {selectedApplication.motivation && (
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Motivation</div>
                      <p className="text-sm bg-gray-50 p-3 rounded-md">{selectedApplication.motivation}</p>
                    </div>
                  )}
                  
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Additional Information</div>
                    <div className="bg-gray-50 p-3 rounded-md space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Has IELTS certificate:</span>
                        <span className="font-medium">{selectedApplication.has_ielts ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Has SAT certificate:</span>
                        <span className="font-medium">{selectedApplication.has_sat ? 'Yes' : 'No'}</span>
                      </div>
                      {selectedApplication.dietary_restrictions && (
                        <div className="text-sm">
                          <span className="font-medium">Dietary restrictions:</span>
                          <p className="mt-1">{selectedApplication.dietary_restrictions}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 mb-2">Application Status</div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateApplicationStatus(selectedApplication.id, 'approved')}
                        disabled={selectedApplication.status === 'approved'}
                        className={`flex-1 py-2 rounded-md text-sm font-medium flex items-center justify-center ${
                          selectedApplication.status === 'approved'
                            ? 'bg-green-100 text-green-800 cursor-default'
                            : 'bg-white border border-green-500 text-green-700 hover:bg-green-50'
                        }`}
                      >
                        <CheckCircle size={16} className="mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                        disabled={selectedApplication.status === 'rejected'}
                        className={`flex-1 py-2 rounded-md text-sm font-medium flex items-center justify-center ${
                          selectedApplication.status === 'rejected'
                            ? 'bg-red-100 text-red-800 cursor-default'
                            : 'bg-white border border-red-500 text-red-700 hover:bg-red-50'
                        }`}
                      >
                        <XCircle size={16} className="mr-1" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-xs text-gray-500">
                  Applied on {new Date(selectedApplication.created_at).toLocaleString()}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <User size={40} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">
                  Select an application to view details
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminApplications;
