
import React from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { CustomButton } from '../ui/custom-button';

interface FeeInfo {
  originalFee: number;
  discount: number;
  finalFee: number;
}

interface AdditionalInfoStepProps {
  formData: {
    hasIELTS: boolean;
    hasSAT: boolean;
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

  return (
    <div className="bg-white rounded-xl shadow-elegant p-8 border border-neutral-100">
      <h2 className="text-2xl font-display font-semibold mb-6">Additional Information</h2>
      
      <div className="space-y-6">
        {/* Discount eligibility section */}
        <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <h3 className="text-lg font-semibold mb-3 text-diplomatic-800">Discount Eligibility</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="hasIELTS"
                  name="hasIELTS"
                  type="checkbox"
                  checked={formData.hasIELTS}
                  onChange={handleChange}
                  className="w-4 h-4 text-diplomatic-600 border-neutral-300 rounded focus:ring-diplomatic-500"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="hasIELTS" className="text-sm font-medium text-neutral-700">
                  I have an IELTS score (10,000 UZS discount)
                </label>
                <p className="text-xs text-neutral-500">
                  You will need to provide proof of your IELTS score during registration check-in.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="hasSAT"
                  name="hasSAT"
                  type="checkbox"
                  checked={formData.hasSAT}
                  onChange={handleChange}
                  className="w-4 h-4 text-diplomatic-600 border-neutral-300 rounded focus:ring-diplomatic-500"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="hasSAT" className="text-sm font-medium text-neutral-700">
                  I have a SAT score (10,000 UZS discount)
                </label>
                <p className="text-xs text-neutral-500">
                  You will need to provide proof of your SAT score during registration check-in.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-white rounded border border-neutral-100">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-neutral-700">Registration Fee:</span>
              <span className="text-sm text-diplomatic-800">{fee.originalFee.toLocaleString()} UZS</span>
            </div>
            {fee.discount > 0 && (
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-green-600">Your Discount:</span>
                <span className="text-sm text-green-600">-{fee.discount.toLocaleString()} UZS</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-1 border-t">
              <span className="text-sm font-bold text-diplomatic-900">Your Total:</span>
              <span className="text-sm font-bold text-diplomatic-900">{fee.finalFee.toLocaleString()} UZS</span>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-neutral-700 mb-1">Dietary Restrictions</label>
          <textarea
            id="dietaryRestrictions"
            name="dietaryRestrictions"
            value={formData.dietaryRestrictions}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent"
            placeholder="Please specify any dietary restrictions or allergies you may have."
          ></textarea>
        </div>
        
        <div className="form-group">
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
              <label htmlFor="agreeToTerms" className="text-neutral-700">
                I agree to the <a href="#" className="text-diplomatic-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-diplomatic-600 hover:underline">Privacy Policy</a>. *
              </label>
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
          disabled={!formData.agreeToTerms || isSubmitting}
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
