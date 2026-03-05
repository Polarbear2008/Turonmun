
import { useState } from 'react';
import { sendRegistrationToGoogleSheets } from '../utils/googleSheetsIntegration';
import { useToast } from './use-toast';
import { supabase } from '@/integrations/supabase/client';

interface RegistrationFormData {
  fullName: string;
  email: string;
  institution: string;
  country: string;
  experience: string;
  committeePreference1: string;
  committeePreference2: string;
  committeePreference3: string;
  motivation: string;
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
  institution: string;
  country: string;
  experience: string;
  committee_preference1: string;
  committee_preference2: string;
  committee_preference3: string;
  motivation: string;
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
    institution: '',
    country: '',
    experience: 'beginner',
    committeePreference1: '',
    committeePreference2: '',
    committeePreference3: '',
    motivation: '',
    dietaryRestrictions: '',
    hasIELTS: false,
    hasSAT: false,
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate registration fee based on discount eligibility
  const calculateFee = (): FeeCalculation => {
    let baseFee = 79000;
    let discount = 0;
    
    if (formData.hasIELTS) discount += 10000;
    if (formData.hasSAT) discount += 10000;
    
    return {
      originalFee: baseFee,
      discount: discount,
      finalFee: baseFee - discount
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
    }));
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
        institution: formData.institution,
        country: formData.country,
        experience: formData.experience,
        committee_preference1: formData.committeePreference1,
        committee_preference2: formData.committeePreference2,
        committee_preference3: formData.committeePreference3,
        motivation: formData.motivation,
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
