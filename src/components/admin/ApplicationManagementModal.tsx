import React from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  School, 
  Calendar, 
  MessageSquare, 
  Award, 
  FileText, 
  Users, 
  DollarSign,
  CheckCircle, 
  XCircle, 
  Trash2,
  ExternalLink,
  Clock,
  Upload
} from 'lucide-react';

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

interface ApplicationManagementModalProps {
  application: Application;
  onClose: () => void;
  onUpdateStatus: (id: string, status: 'approved' | 'rejected') => void;
  onDelete: (id: string) => void;
}

const ApplicationManagementModal: React.FC<ApplicationManagementModalProps> = ({
  application,
  onClose,
  onUpdateStatus,
  onDelete
}) => {
  const calculateAge = (birthDate: string) => {
    if (!birthDate) return 'Not specified';
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'rejected':
        return <XCircle size={20} className="text-red-500" />;
      default:
        return <Clock size={20} className="text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="absolute inset-4 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-diplomatic-700 to-diplomatic-800">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <User size={24} className="text-diplomatic-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{application.full_name}</h2>
              <p className="text-diplomatic-100">{application.institution}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(application.status)}`}>
              {getStatusIcon(application.status)}
              <span className="font-medium capitalize">{application.status}</span>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Left Column - Personal Information */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <User size={20} className="mr-2 text-diplomatic-600" />
                  Personal Information
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail size={16} className="mr-3 text-gray-400" />
                    <span className="font-medium mr-2">Email:</span>
                    <a href={`mailto:${application.email}`} className="text-diplomatic-600 hover:underline">
                      {application.email}
                    </a>
                  </div>
                  
                  {application.telegram_username && (
                    <div className="flex items-center text-sm">
                      <MessageSquare size={16} className="mr-3 text-gray-400" />
                      <span className="font-medium mr-2">Telegram:</span>
                      <span className="text-gray-700">{application.telegram_username}</span>
                    </div>
                  )}
                  
                  {application.phone && (
                    <div className="flex items-center text-sm">
                      <Phone size={16} className="mr-3 text-gray-400" />
                      <span className="font-medium mr-2">Phone:</span>
                      <span className="text-gray-700">{application.phone}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm">
                    <MapPin size={16} className="mr-3 text-gray-400" />
                    <span className="font-medium mr-2">Location:</span>
                    <span className="text-gray-700">{application.country}</span>
                  </div>
                  
                  {application.date_of_birth && (
                    <div className="flex items-center text-sm">
                      <Calendar size={16} className="mr-3 text-gray-400" />
                      <span className="font-medium mr-2">Age:</span>
                      <span className="text-gray-700">{calculateAge(application.date_of_birth)} years old</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm">
                    <School size={16} className="mr-3 text-gray-400" />
                    <span className="font-medium mr-2">Institution:</span>
                    <span className="text-gray-700">{application.institution}</span>
                  </div>
                </div>
              </div>
              
              {/* Uploaded Files */}
              {(application.photo_url || application.ielts_certificate_url || application.sat_certificate_url || application.certificate_url) && (
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Upload size={20} className="mr-2 text-purple-600" />
                    Uploaded Files
                  </h3>
                  
                  <div className="space-y-4">
                    {application.photo_url && (
                      <div>
                        <span className="text-sm font-medium text-gray-600 block mb-2">📷 Applicant Photo:</span>
                        <div className="flex items-start space-x-3">
                          <img 
                            src={application.photo_url} 
                            alt={`${application.full_name}'s photo`}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                          <div className="flex-1">
                            <a 
                              href={application.photo_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-purple-600 hover:underline flex items-center text-sm"
                            >
                              <ExternalLink size={14} className="mr-1" />
                              View Full Size
                            </a>
                            <p className="text-xs text-gray-500 mt-1">Click to open in new tab</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* IELTS Certificate */}
                    {application.ielts_certificate_url && (
                      <div>
                        <span className="text-sm font-medium text-gray-600 block mb-2">📄 IELTS Certificate:</span>
                        <div className="bg-white p-3 rounded border border-green-200">
                          <a 
                            href={application.ielts_certificate_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-600 hover:underline flex items-center text-sm font-medium"
                          >
                            <FileText size={16} className="mr-2" />
                            {application.ielts_certificate_url.toLowerCase().includes('.pdf') ? 'View IELTS PDF' : 'View IELTS Image'}
                            <ExternalLink size={14} className="ml-1" />
                          </a>
                          <p className="text-xs text-gray-500 mt-1">IELTS score verification document</p>
                        </div>
                      </div>
                    )}

                    {/* SAT Certificate */}
                    {application.sat_certificate_url && (
                      <div>
                        <span className="text-sm font-medium text-gray-600 block mb-2">📊 SAT Certificate:</span>
                        <div className="bg-white p-3 rounded border border-blue-200">
                          <a 
                            href={application.sat_certificate_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center text-sm font-medium"
                          >
                            <FileText size={16} className="mr-2" />
                            {application.sat_certificate_url.toLowerCase().includes('.pdf') ? 'View SAT PDF' : 'View SAT Image'}
                            <ExternalLink size={14} className="ml-1" />
                          </a>
                          <p className="text-xs text-gray-500 mt-1">SAT score verification document</p>
                        </div>
                      </div>
                    )}

                    {/* Legacy Certificate (for backward compatibility) */}
                    {application.certificate_url && !application.ielts_certificate_url && !application.sat_certificate_url && (
                      <div>
                        <span className="text-sm font-medium text-gray-600 block mb-2">📋 Legacy Certificate:</span>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <a 
                            href={application.certificate_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:underline flex items-center text-sm font-medium"
                          >
                            <FileText size={16} className="mr-2" />
                            {application.certificate_url.toLowerCase().includes('.pdf') ? 'View Certificate PDF' : 'View Certificate Image'}
                            <ExternalLink size={14} className="ml-1" />
                          </a>
                          <p className="text-xs text-gray-500 mt-1">IELTS/SAT score verification document</p>
                        </div>
                      </div>
                    )}

                    {/* Discount Status Display */}
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">🎯 Discount Status:</h4>
                      <div className="flex items-center space-x-4 text-xs">
                        <div className={`px-2 py-1 rounded ${application.has_ielts ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                          IELTS: {application.has_ielts ? 'Eligible' : 'Not Selected'}
                        </div>
                        <div className={`px-2 py-1 rounded ${application.has_sat ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                          SAT: {application.has_sat ? 'Eligible' : 'Not Selected'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Experience & Background */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Award size={20} className="mr-2 text-diplomatic-600" />
                  Experience & Background
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">MUN Experience Level:</span>
                    <p className="text-sm text-gray-800 mt-1">{application.experience}</p>
                  </div>
                  
                  {application.previous_muns && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Previous MUNs & Awards:</span>
                      <p className="text-sm text-gray-800 mt-1 bg-white p-3 rounded border">
                        {application.previous_muns}
                      </p>
                    </div>
                  )}
                  
                  {application.portfolio_link && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Portfolio/Profile:</span>
                      <a 
                        href={application.portfolio_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-diplomatic-600 hover:underline mt-1"
                      >
                        <ExternalLink size={14} className="mr-1" />
                        View Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Application Timeline */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Clock size={20} className="mr-2 text-diplomatic-600" />
                  Application Timeline
                </h3>
                
                <div className="text-sm text-gray-600">
                  <p><strong>Submitted:</strong> {formatDate(application.created_at)}</p>
                  <p className="mt-2"><strong>Status:</strong> {application.status.charAt(0).toUpperCase() + application.status.slice(1)}</p>
                </div>
              </div>
            </div>
            
            {/* Middle Column - Essays & Motivation */}
            <div className="space-y-6">
              {/* Essays Section */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FileText size={20} className="mr-2 text-blue-600" />
                  Essays & Responses
                </h3>
                
                <div className="space-y-4">
                  {application.unique_delegate_trait && (
                    <div>
                      <h4 className="text-sm font-semibold text-blue-800 mb-2">What aspects of your background, thinking, or presence set you apart from most delegates - and how?</h4>
                      <p className="text-sm text-gray-800 bg-white p-3 rounded border leading-relaxed">
                        {application.unique_delegate_trait}
                      </p>
                    </div>
                  )}
                  
                  {application.issue_interest && (
                    <div>
                      <h4 className="text-sm font-semibold text-blue-800 mb-2">Topic/issue you're passionate about:</h4>
                      <p className="text-sm text-gray-800 bg-white p-3 rounded border leading-relaxed">
                        {application.issue_interest}
                      </p>
                    </div>
                  )}
                  
                  {application.type1_insight_response && (
                    <div>
                      <h4 className="text-sm font-semibold text-blue-800 mb-2">
                        Personal Insight (Prompt {application.type1_selected_prompt}):
                      </h4>
                      <p className="text-sm text-gray-800 bg-white p-3 rounded border leading-relaxed">
                        {application.type1_insight_response}
                      </p>
                    </div>
                  )}
                  
                  {application.type2_political_response && (
                    <div>
                      <h4 className="text-sm font-semibold text-blue-800 mb-2">
                        Political Reflection (Prompt {application.type2_selected_prompt}):
                      </h4>
                      <p className="text-sm text-gray-800 bg-white p-3 rounded border leading-relaxed">
                        {application.type2_political_response}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right Column - Preferences & Additional Info */}
            <div className="space-y-6">
              {/* Committee Preferences */}
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Users size={20} className="mr-2 text-green-600" />
                  Committee Preferences
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Committee Choices:</span>
                    <ol className="list-decimal pl-5 mt-1 space-y-1">
                      <li className="text-sm text-gray-800">
                        <strong>1st Choice:</strong> {application.committee_preference1}
                      </li>
                      <li className="text-sm text-gray-800">
                        <strong>2nd Choice:</strong> {application.committee_preference2}
                      </li>
                      <li className="text-sm text-gray-800">
                        <strong>3rd Choice:</strong> {application.committee_preference3}
                      </li>
                    </ol>
                  </div>
                  
                  {application.motivation && application.motivation !== 'Not provided' && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Motivation for Joining:</span>
                      <p className="text-sm text-gray-800 mt-1 bg-white p-3 rounded border leading-relaxed">
                        {application.motivation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Fee & Logistics */}
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <DollarSign size={20} className="mr-2 text-yellow-600" />
                  Fee & Logistics
                </h3>
                
                <div className="space-y-3">
                  {application.fee_agreement && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Fee Agreement:</span>
                      <p className={`text-sm mt-1 px-2 py-1 rounded inline-block ${
                        application.fee_agreement === 'Yes' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {application.fee_agreement}
                      </p>
                    </div>
                  )}
                  
                  {application.discount_eligibility && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Discount Eligibility:</span>
                      <p className="text-sm text-gray-800 mt-1">{application.discount_eligibility}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Special Notes & Dietary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Final Confirmation:</span>
                    <p className={`text-sm mt-1 px-2 py-1 rounded inline-block ${
                      application.final_confirmation 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {application.final_confirmation ? 'Confirmed' : 'Not confirmed'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Application submitted on {formatDate(application.created_at)}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => onUpdateStatus(application.id, 'approved')}
                disabled={application.status === 'approved'}
                className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
                  application.status === 'approved'
                    ? 'bg-green-100 text-green-800 cursor-default'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <CheckCircle size={18} />
                <span>Approve</span>
              </button>
              
              <button
                onClick={() => onUpdateStatus(application.id, 'rejected')}
                disabled={application.status === 'rejected'}
                className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
                  application.status === 'rejected'
                    ? 'bg-red-100 text-red-800 cursor-default'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                <XCircle size={18} />
                <span>Reject</span>
              </button>
              
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
                    onDelete(application.id);
                  }
                }}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-700 transition-colors"
              >
                <Trash2 size={18} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationManagementModal; 