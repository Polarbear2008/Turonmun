
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PreferencesStepProps {
  formData: {
    committeePreference1: string;
    committeePreference2: string;
    committeePreference3: string;
    motivation: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const PreferencesStep: React.FC<PreferencesStepProps> = ({ formData, handleChange, nextStep, prevStep }) => {
  return (
    <div className="bg-white rounded-xl shadow-elegant p-8 border border-neutral-100">
      <h2 className="text-2xl font-display font-semibold mb-6">Committee Preferences</h2>
      
      <div className="space-y-6">
        <div className="form-group">
          <label htmlFor="committeePreference1" className="block text-sm font-medium text-neutral-700 mb-1">1st Committee Preference *</label>
          <select
            id="committeePreference1"
            name="committeePreference1"
            value={formData.committeePreference1}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent"
            required
          >
            <option value="">Select a committee</option>
            <option value="UNGA">United Nations General Assembly (UNGA)</option>
            <option value="WTO">World Trade Organization (WTO)</option>
            <option value="ECOSOC">Economic and Social Council (ECOSOC)</option>
            <option value="HRC">Human Rights Council (HRC)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="committeePreference2" className="block text-sm font-medium text-neutral-700 mb-1">2nd Committee Preference *</label>
          <select
            id="committeePreference2"
            name="committeePreference2"
            value={formData.committeePreference2}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent"
            required
          >
            <option value="">Select a committee</option>
            <option value="UNGA">United Nations General Assembly (UNGA)</option>
            <option value="WTO">World Trade Organization (WTO)</option>
            <option value="ECOSOC">Economic and Social Council (ECOSOC)</option>
            <option value="HRC">Human Rights Council (HRC)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="committeePreference3" className="block text-sm font-medium text-neutral-700 mb-1">3rd Committee Preference</label>
          <select
            id="committeePreference3"
            name="committeePreference3"
            value={formData.committeePreference3}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent"
          >
            <option value="">Select a committee</option>
            <option value="UNGA">United Nations General Assembly (UNGA)</option>
            <option value="WTO">World Trade Organization (WTO)</option>
            <option value="ECOSOC">Economic and Social Council (ECOSOC)</option>
            <option value="HRC">Human Rights Council (HRC)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="motivation" className="block text-sm font-medium text-neutral-700 mb-1">Motivation for Joining (100-200 words) *</label>
          <textarea
            id="motivation"
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent"
            placeholder="Briefly describe why you want to participate in this MUN and what you hope to gain from the experience."
            required
          ></textarea>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="btn-outline"
        >
          Back
        </button>
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

export default PreferencesStep;
