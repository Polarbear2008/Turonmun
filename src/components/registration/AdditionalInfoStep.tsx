import React from 'react';
import { AlertCircle, Loader2, Users, FileText, Upload, MapPin, MessageSquare, DollarSign, Award, CheckCircle } from 'lucide-react';
import { CustomButton } from '../ui/custom-button';

interface FeeInfo {
  originalFee: number;
  discount: number;
  finalFee: number;
}

interface AdditionalInfoStepProps {
  formData: {
    committeePreference1: string;
    committeePreference2: string;
    committeePreference3: string;
    motivation: string;
    feeAgreement: string;
    discountEligibility: string[];
    proofDocument: File | null;
    cityOfDeparture: string;
    specialNotes: string;
    finalConfirmation: boolean;
    dietaryRestrictions: string;
    agreeToTerms: boolean;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  calculateFee: () => FeeInfo;
  handleSubmit: (e: React.FormEvent) => void;
  prevStep: () => void;
  isSubmitting?: boolean;
}

const AdditionalInfoStep: React.FC<AdditionalInfoStepProps> = ({ 
  formData, 
  handleChange, 
  calculateFee, 
  handleSubmit, 
  prevStep,
  isSubmitting = false
}) => {
  const fee = calculateFee();

  const isFormValid = () => {
    return (
      formData.committeePreference1.trim() !== '' &&
      formData.committeePreference2.trim() !== '' &&
      formData.motivation.trim() !== '' &&
      formData.feeAgreement === 'Yes' &&
      formData.cityOfDeparture.trim() !== '' &&
      formData.finalConfirmation &&
      formData.agreeToTerms
    );
  };

  const maxDiscount = 20000;
  const currentDiscount = fee.discount;

  return (
    <div className="bg-white rounded-xl shadow-elegant p-8 border border-neutral-100">
      <h2 className="text-2xl font-display font-semibold mb-2">Page 4 — Confirmation & Logistics</h2>
      <p className="text-neutral-600 mb-6">Complete your registration with final details and confirmations</p>
      
      <div className="space-y-8">
        {/* Committee Preferences Section */}
        <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <h3 className="text-lg font-semibold mb-4 text-diplomatic-800">Committee Preferences</h3>
          
          <div className="space-y-4">
            {/* 1st Committee Preference */}
            <div className="form-group">
              <label htmlFor="committeePreference1" className="block text-sm font-medium text-neutral-700 mb-1">
                1st Committee Preference <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users size={18} className="text-neutral-400" />
                </div>
                <select
                  id="committeePreference1"
                  name="committeePreference1"
                  value={formData.committeePreference1}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select your first choice</option>
                  <option value="UNGA">United Nations General Assembly (UNGA)</option>
                  <option value="WTO">World Trade Organization (WTO)</option>
                  <option value="ECOSOC">Economic and Social Council (ECOSOC)</option>
                  <option value="HRC">Human Rights Council (HRC)</option>
                </select>
              </div>
            </div>

            {/* 2nd Committee Preference */}
            <div className="form-group">
              <label htmlFor="committeePreference2" className="block text-sm font-medium text-neutral-700 mb-1">
                2nd Committee Preference <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users size={18} className="text-neutral-400" />
                </div>
                <select
                  id="committeePreference2"
                  name="committeePreference2"
                  value={formData.committeePreference2}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select your second choice</option>
                  <option value="UNGA">United Nations General Assembly (UNGA)</option>
                  <option value="WTO">World Trade Organization (WTO)</option>
                  <option value="ECOSOC">Economic and Social Council (ECOSOC)</option>
                  <option value="HRC">Human Rights Council (HRC)</option>
                </select>
              </div>
            </div>

            {/* 3rd Committee Preference */}
            <div className="form-group">
              <label htmlFor="committeePreference3" className="block text-sm font-medium text-neutral-700 mb-1">
                3rd Committee Preference <span className="text-neutral-500">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users size={18} className="text-neutral-400" />
                </div>
                <select
                  id="committeePreference3"
                  name="committeePreference3"
                  value={formData.committeePreference3}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent transition-all"
                >
                  <option value="">Select your third choice (optional)</option>
                  <option value="UNGA">United Nations General Assembly (UNGA)</option>
                  <option value="WTO">World Trade Organization (WTO)</option>
                  <option value="ECOSOC">Economic and Social Council (ECOSOC)</option>
                  <option value="HRC">Human Rights Council (HRC)</option>
                </select>
              </div>
            </div>

            {/* Motivation */}
            <div className="form-group">
              <label htmlFor="motivation" className="block text-sm font-medium text-neutral-700 mb-1">
                Motivation for Joining <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                  <FileText size={18} className="text-neutral-400" />
                </div>
                <textarea
                  id="motivation"
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  rows={4}
                  className="pl-10 w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent transition-all resize-none"
                  placeholder="Briefly describe why you want to participate in this MUN and what you hope to gain from the experience."
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Application Fee Agreement */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold mb-3 text-diplomatic-800 flex items-center gap-2">
            <DollarSign size={20} className="text-diplomatic-600" />
            Application Fee Agreement
          </h3>
          
          <div className="mb-4">
            <p className="text-sm text-neutral-700 mb-3">
              <strong>The delegate application fee is 69,000 UZS. Are you aware of this and ready to pay upon acceptance?</strong>
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="feeYes"
                  name="feeAgreement"
                  value="Yes"
                  checked={formData.feeAgreement === "Yes"}
                  onChange={handleChange}
                  className="w-4 h-4 text-diplomatic-600 border-neutral-300 focus:ring-diplomatic-500"
                  required
                />
                <label htmlFor="feeYes" className="text-sm text-neutral-700 cursor-pointer">
                  <strong>Yes</strong> - I am aware and ready to pay upon acceptance
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="feeNo"
                  name="feeAgreement"
                  value="No"
                  checked={formData.feeAgreement === "No"}
                  onChange={handleChange}
                  className="w-4 h-4 text-diplomatic-600 border-neutral-300 focus:ring-diplomatic-500"
                />
                <label htmlFor="feeNo" className="text-sm text-neutral-700 cursor-pointer">
                  No - I am not ready to pay
                </label>
              </div>
            </div>
            
            <p className="text-xs text-neutral-500 mt-2">Must select "Yes" to proceed</p>
          </div>
        </div>

        {/* Discount Eligibility */}
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold mb-3 text-diplomatic-800 flex items-center gap-2">
            <Award size={20} className="text-green-600" />
            Discount Eligibility
          </h3>
          
          <div className="mb-4">
            <p className="text-sm text-neutral-700 mb-3">
              <strong>We offer a 10,000 UZS discount for each of the following:</strong>
            </p>
            <ul className="text-sm text-neutral-600 mb-3 ml-4">
              <li>– IELTS 6.5+</li>
              <li>– SAT 1350+</li>
            </ul>
            <p className="text-sm text-neutral-600 mb-4">
              <em>Do you qualify for either?</em>
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="discountIELTS"
                  name="discountEligibility"
                  value="IELTS"
                  checked={formData.discountEligibility.includes("IELTS")}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 border-neutral-300 rounded focus:ring-green-500"
                />
                <label htmlFor="discountIELTS" className="text-sm text-neutral-700 cursor-pointer">
                  IELTS 6.5+ (10,000 UZS discount)
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="discountSAT"
                  name="discountEligibility"
                  value="SAT"
                  checked={formData.discountEligibility.includes("SAT")}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 border-neutral-300 rounded focus:ring-green-500"
                />
                <label htmlFor="discountSAT" className="text-sm text-neutral-700 cursor-pointer">
                  SAT 1350+ (10,000 UZS discount)
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="discountNone"
                  name="discountEligibility"
                  value="None"
                  checked={formData.discountEligibility.includes("None")}
                  onChange={handleChange}
                  className="w-4 h-4 text-neutral-600 border-neutral-300 rounded focus:ring-neutral-500"
                />
                <label htmlFor="discountNone" className="text-sm text-neutral-700 cursor-pointer">
                  None - I don't qualify for discounts
                </label>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white rounded border border-green-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-neutral-700">Application Fee:</span>
                <span className="text-sm text-diplomatic-800">{fee.originalFee.toLocaleString()} UZS</span>
              </div>
              {currentDiscount > 0 && (
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-green-600">Your Discount:</span>
                  <span className="text-sm text-green-600">-{currentDiscount.toLocaleString()} UZS</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-1 border-t">
                <span className="text-sm font-bold text-diplomatic-900">Your Total:</span>
                <span className="text-sm font-bold text-diplomatic-900">{fee.finalFee.toLocaleString()} UZS</span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">Max discount: {maxDiscount.toLocaleString()} UZS</p>
            </div>
          </div>
        </div>

        {/* Upload Proof for Discounts */}
        {formData.discountEligibility.some(item => item === 'IELTS' || item === 'SAT') && (
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold mb-3 text-diplomatic-800 flex items-center gap-2">
              <Upload size={20} className="text-yellow-600" />
              Upload Proof for Discounts
            </h3>
            
            <div className="form-group">
              <label htmlFor="proofDocument" className="block text-sm font-medium text-neutral-700 mb-1">
                Upload your IELTS/SAT score document or screenshot
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="proofDocument"
                  name="proofDocument"
                  onChange={handleChange}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                />
              </div>
              <p className="text-xs text-neutral-500 mt-1">Optional unless discount selected</p>
            </div>
          </div>
        )}

        {/* City of Departure */}
        <div className="form-group">
          <label htmlFor="cityOfDeparture" className="block text-sm font-medium text-neutral-700 mb-1">
            City of Departure <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin size={18} className="text-neutral-400" />
            </div>
            <input
              type="text"
              id="cityOfDeparture"
              name="cityOfDeparture"
              value={formData.cityOfDeparture}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent transition-all"
              placeholder="Which city will you be traveling from?"
              required
            />
          </div>
          <p className="text-xs text-neutral-500 mt-1">Useful for planning communication or outreach</p>
        </div>

        {/* Special Notes / Requests */}
        <div className="form-group">
          <label htmlFor="specialNotes" className="block text-sm font-medium text-neutral-700 mb-1">
            Special Notes / Requests <span className="text-neutral-500">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
              <MessageSquare size={18} className="text-neutral-400" />
            </div>
            <textarea
              id="specialNotes"
              name="specialNotes"
              value={formData.specialNotes}
              onChange={handleChange}
              rows={3}
              className="pl-10 w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent transition-all resize-none"
              placeholder="Any personal notes, preferences, or health/travel conditions you'd like to share?"
            />
          </div>
          <p className="text-xs text-neutral-500 mt-1">Optional</p>
        </div>

        {/* Dietary Restrictions */}
        <div className="form-group">
          <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-neutral-700 mb-1">
            Dietary Restrictions <span className="text-neutral-500">(Optional)</span>
          </label>
          <textarea
            id="dietaryRestrictions"
            name="dietaryRestrictions"
            value={formData.dietaryRestrictions}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent transition-all"
            placeholder="Please specify any dietary restrictions or allergies you may have."
          />
        </div>

        {/* Final Confirmation */}
        <div className="p-4 bg-diplomatic-50 rounded-lg border border-diplomatic-200">
          <h3 className="text-lg font-semibold mb-3 text-diplomatic-800 flex items-center gap-2">
            <CheckCircle size={20} className="text-diplomatic-600" />
            Final Confirmation
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="finalConfirmation"
                  name="finalConfirmation"
                  type="checkbox"
                  checked={formData.finalConfirmation}
                  onChange={handleChange}
                  className="w-4 h-4 text-diplomatic-600 border-neutral-300 rounded focus:ring-diplomatic-500"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="finalConfirmation" className="text-neutral-700 cursor-pointer">
                  <strong>I confirm that all information above is accurate and I am committed to participating if selected.</strong> <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-neutral-500 mt-1">Required to submit</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 text-diplomatic-600 border-neutral-300 rounded focus:ring-diplomatic-500"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className="text-neutral-700 cursor-pointer">
                  I agree to the <a href="#" className="text-diplomatic-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-diplomatic-600 hover:underline">Privacy Policy</a>. <span className="text-red-500">*</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-neutral-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-neutral-700">
              <strong>Note:</strong> Your application will be saved to our database and sent to Google Sheets for processing. You will receive a confirmation email shortly after submission.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <CustomButton 
          variant="outline" 
          onClick={prevStep}
          disabled={isSubmitting}
        >
          Back
        </CustomButton>
        
        <CustomButton 
          variant="primary"
          onClick={handleSubmit}
          disabled={!isFormValid() || isSubmitting}
          className="flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Registration'
          )}
        </CustomButton>
      </div>
    </div>
  );
};

export default AdditionalInfoStep;
