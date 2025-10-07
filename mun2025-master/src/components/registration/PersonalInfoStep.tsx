
import React from 'react';
import { User, Mail, Building, Globe, ArrowRight } from 'lucide-react';

interface PersonalInfoStepProps {
  formData: {
    fullName: string;
    email: string;
    institution: string;
    country: string;
    experience: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  nextStep: () => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ formData, handleChange, nextStep }) => {
  return (
    <div className="bg-white rounded-xl shadow-elegant p-8 border border-neutral-100">
      <h2 className="text-2xl font-display font-semibold mb-6">Personal Information</h2>
      
      <div className="space-y-6">
        <div className="form-group">
          <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-1">Full Name *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-neutral-400" />
            </div>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email Address *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-neutral-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent"
              placeholder="Enter your email address"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="institution" className="block text-sm font-medium text-neutral-700 mb-1">Institution/University *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building size={18} className="text-neutral-400" />
            </div>
            <input
              type="text"
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent"
              placeholder="Enter your institution/university"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="country" className="block text-sm font-medium text-neutral-700 mb-1">Country *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe size={18} className="text-neutral-400" />
            </div>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent"
              placeholder="Enter your country"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="experience" className="block text-sm font-medium text-neutral-700 mb-1">MUN Experience Level *</label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent"
            required
          >
            <option value="beginner">Beginner (0-1 conferences)</option>
            <option value="intermediate">Intermediate (2-5 conferences)</option>
            <option value="advanced">Advanced (6+ conferences)</option>
          </select>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={nextStep}
          className="btn-primary flex items-center gap-2"
        >
          Next Step <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
