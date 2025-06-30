import { useState } from 'react';
import { sendRegistrationToGoogleSheets } from '../utils/googleSheetsIntegration';
import { useToast } from './use-toast';
import { supabase } from '@/integrations/supabase/client';

interface RegistrationFormData {
  fullName: string;
  email: string;
  telegramUsername: string;
  institution: string;
  dateOfBirth: string;
  countryAndCity: string;
  phone: string;
  photo: File | null;
  experience: string;
  previousMUNs: string;
  portfolioLink: string;
  uniqueDelegateTrait: string;
  issueInterest: string;
  type1SelectedPrompt: string;
  type1InsightResponse: string;
  type2SelectedPrompt: string;
  type2PoliticalResponse: string;
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
  hasIELTS: boolean;
  hasSAT: boolean;
  agreeToTerms: boolean;
}

interface FeeCalculation {
  originalFee: number;
  discount: number;
  finalFee: number;
}

// Define a proper type for the application data to be sent to Supabase
interface ApplicationData {
  full_name: string;
  email: string;
  telegram_username: string;
  institution: string;
  date_of_birth: string;
  country: string;
  phone: string;
  experience: string;
  previous_muns: string;
  portfolio_link: string;
  unique_delegate_trait: string;
  issue_interest: string;
  type1_selected_prompt: string;
  type1_insight_response: string;
  type2_selected_prompt: string;
  type2_political_response: string;
  committee_preference1: string;
  committee_preference2: string;
  committee_preference3: string;
  motivation: string;
  fee_agreement: string;
  discount_eligibility: string;
  city_of_departure: string;
  special_notes: string;
  final_confirmation: boolean;
  dietary_restrictions: string;
  has_ielts: boolean;
  has_sat: boolean;
  status: string;
}

export const useRegistrationForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    telegramUsername: '',
    institution: '',
    dateOfBirth: '',
    countryAndCity: '',
    phone: '',
    photo: null,
    experience: '',
    previousMUNs: '',
    portfolioLink: '',
    uniqueDelegateTrait: '',
    issueInterest: '',
    type1SelectedPrompt: '',
    type1InsightResponse: '',
    type2SelectedPrompt: '',
    type2PoliticalResponse: '',
    committeePreference1: '',
    committeePreference2: '',
    committeePreference3: '',
    motivation: '',
    feeAgreement: '',
    discountEligibility: [],
    proofDocument: null,
    cityOfDeparture: '',
    specialNotes: '',
    finalConfirmation: false,
    dietaryRestrictions: '',
    hasIELTS: false,
    hasSAT: false,
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate registration fee based on discount eligibility
  const calculateFee = (): FeeCalculation => {
    let baseFee = 69000; // Updated base fee as per the image
    let discount = 0;
    
    if (formData.discountEligibility.includes('IELTS')) discount += 10000;
    if (formData.discountEligibility.includes('SAT')) discount += 10000;
    
    return {
      originalFee: baseFee,
      discount: discount,
      finalFee: baseFee - discount
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const isFile = type === 'file';
    
    if (isFile) {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0] || null;
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
    } else if (name === 'discountEligibility') {
      // Handle multi-select checkboxes for discount eligibility
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => {
        if (checkbox.checked) {
          return {
            ...prev,
            discountEligibility: [...prev.discountEligibility, value]
          };
        } else {
          return {
            ...prev,
            discountEligibility: prev.discountEligibility.filter(item => item !== value)
          };
        }
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Send data to Google Sheets via Make.com webhook
      let sheetsResult;
      try {
        sheetsResult = await sendRegistrationToGoogleSheets(formData);
        
        if (!sheetsResult.success) {
          console.error('Google Sheets error:', sheetsResult.message);
        }
      } catch (sheetError) {
        console.error('Error sending to Google Sheets:', sheetError);
        // Continue with Supabase even if Google Sheets fails
      }

      // 2. Save to Supabase database for backup and admin management
      const applicationData: ApplicationData = {
        full_name: formData.fullName,
        email: formData.email,
        telegram_username: formData.telegramUsername,
        institution: formData.institution,
        date_of_birth: formData.dateOfBirth,
        country: formData.countryAndCity,
        phone: formData.phone,
        experience: formData.experience,
        previous_muns: formData.previousMUNs,
        portfolio_link: formData.portfolioLink,
        unique_delegate_trait: formData.uniqueDelegateTrait,
        issue_interest: formData.issueInterest,
        type1_selected_prompt: formData.type1SelectedPrompt,
        type1_insight_response: formData.type1InsightResponse,
        type2_selected_prompt: formData.type2SelectedPrompt,
        type2_political_response: formData.type2PoliticalResponse,
        committee_preference1: formData.committeePreference1,
        committee_preference2: formData.committeePreference2,
        committee_preference3: formData.committeePreference3,
        motivation: formData.motivation,
        fee_agreement: formData.feeAgreement,
        discount_eligibility: formData.discountEligibility.join(', '),
        city_of_departure: formData.cityOfDeparture,
        special_notes: formData.specialNotes,
        final_confirmation: formData.finalConfirmation,
        dietary_restrictions: formData.dietaryRestrictions,
        has_ielts: formData.hasIELTS,
        has_sat: formData.hasSAT,
        status: 'pending',
      };

      console.log('Saving application to Supabase:', applicationData);
      
      // Ensure we don't have undefined/null values that might cause issues
      Object.keys(applicationData).forEach(key => {
        const typedKey = key as keyof ApplicationData;
        if (applicationData[typedKey] === undefined || applicationData[typedKey] === null) {
          if (typeof applicationData[typedKey] === 'string') {
            (applicationData[typedKey as keyof ApplicationData] as string) = '';
          } else if (typeof applicationData[typedKey] === 'boolean') {
            (applicationData[typedKey as keyof ApplicationData] as boolean) = false;
          }
        }
      });
      
      const { data, error } = await supabase
        .from('applications')
        .insert(applicationData)
        .select();

      if (error) {
        console.error('Supabase error:', error);
        toast({
          title: "Application Error",
          description: "There was a problem submitting your application. Please try again or contact support.",
          variant: "destructive",
        });
        return;
      }

      console.log('Application saved successfully:', data);
      
      // Store success message in localStorage for after redirect
      localStorage.setItem('registrationSuccess', 'true');
      
      // Move to confirmation step
      nextStep();
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    step,
    formData,
    isSubmitting,
    calculateFee,
    handleChange,
    nextStep,
    prevStep,
    handleSubmit
  };
};
