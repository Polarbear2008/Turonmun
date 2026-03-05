import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationContent from '../components/registration/RegistrationContent';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [ieltsFile, setIeltsFile] = useState<File | null>(null);
  const [satFile, setSatFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    telegramUsername: '',  // Added missing field
    institution: '',
    countryAndCity: '',    // Added missing field
    grade: '',
    munExperience: '',

    // Preferences (Step 2)
    experience: '',        // MUN experience level
    previousMUNs: '',      // Previous MUN conferences
    delegationType: 'individual',
    participationType: 'in-person',

    // Committee Preferences
    committee_preference1: '',
    committee_preference2: '',
    committee_preference3: '',

    // Essay
    motivationEssay: '', // Keeping for backward compatibility if needed, but mainly using new fields
    issueInterest: '',

    // Additional Info
    dietaryRestrictions: '',
    medicalConditions: '',
    emergencyContact: '',
    emergencyPhone: '',
    feeAgreement: '',
    discountEligibility: [] as string[],
    finalConfirmation: false,
    hasIELTS: 'no',
    hasSAT: 'no',
    ieltsScore: '',
    satScore: '',
    agreeToTerms: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Scroll to form section when step changes
    const formSection = document.getElementById('registration-form-section');
    if (formSection && step > 1) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (name === 'discountEligibility') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => {
        const current = prev.discountEligibility;
        if (checked) {
          return { ...prev, discountEligibility: [...current, value] };
        } else {
          return { ...prev, discountEligibility: current.filter(item => item !== value) };
        }
      });
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const calculateFee = () => {
    const baseFee = 80000; // 80K UZS
    let discount = 0;

    // Apply IELTS discount (10K)
    if (formData.discountEligibility.includes('IELTS') && ieltsFile) {
      discount += 10000;
    }

    // Apply SAT discount (10K)
    if (formData.discountEligibility.includes('SAT') && satFile) {
      discount += 10000;
    }

    const finalFee = baseFee - discount;

    return {
      originalFee: baseFee,
      discount,
      finalFee
    };
  };

  const nextStep = () => {
    // Validate current step before proceeding
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.telegramUsername || !formData.institution || !formData.dateOfBirth || !formData.countryAndCity) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    }

    if (step === 2) {
      if (!formData.experience) {
        toast({
          title: "Missing Experience",
          description: "Please select your MUN experience level",
          variant: "destructive",
        });
        return;
      }
    }

    if (step === 3) {
      if (!formData.committee_preference1 || !formData.committee_preference2 || !formData.committee_preference3) {
        toast({
          title: "Missing Committees",
          description: "Please select all three committee preferences",
          variant: "destructive",
        });
        return;
      }
    }

    if (step === 4) {
      if (!formData.issueInterest) {
        toast({
          title: "Essay Required",
          description: "Please complete the essay question",
          variant: "destructive",
        });
        return;
      }
    }

    if (step === 5) {
      if (formData.feeAgreement !== 'Yes' || !formData.finalConfirmation || !formData.agreeToTerms) {
        toast({
          title: "Missing Confirmation",
          description: "Please agree to the fee and terms to proceed",
          variant: "destructive",
        });
        return;
      }
    }

    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('applications')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('applications')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload files
      let photoUrl = null;
      let ieltsUrl = null;
      let satUrl = null;

      if (photoFile) {
        photoUrl = await uploadFile(photoFile, 'photos');
      }

      if (ieltsFile) {
        ieltsUrl = await uploadFile(ieltsFile, 'certificates');
      }

      if (satFile) {
        satUrl = await uploadFile(satFile, 'certificates');
      }

      // Calculate final fee
      const fee = calculateFee();

      // Insert application into database
      const { data, error } = await supabase
        .from('applications')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone || '',
          institution: formData.institution,
          country: formData.countryAndCity,
          committee_preference1: formData.committee_preference1,
          committee_preference2: formData.committee_preference2,
          committee_preference3: formData.committee_preference3,
          experience: formData.experience || 'None',
          motivation: `Interest: ${formData.issueInterest}`,
          dietary_restrictions: formData.dietaryRestrictions || null,
          emergency_contact_relation: formData.telegramUsername,
          has_ielts: formData.discountEligibility.includes('IELTS'),
          has_sat: formData.discountEligibility.includes('SAT'),
          payment_amount: fee.finalFee,
          status: 'pending',
          notes: `
Date of Birth: ${formData.dateOfBirth}
Gender: ${formData.gender || 'Not Specified'}
Grade: ${formData.grade || 'N/A'}
Medical Conditions: ${formData.medicalConditions || 'None'}
Previous MUNs: ${formData.previousMUNs || 'N/A'}
Photo URL: ${photoUrl || 'N/A'}
IELTS URL: ${ieltsUrl || 'N/A'}
SAT URL: ${satUrl || 'N/A'}
          `.trim(),
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "Your registration has been submitted successfully. Check your email for further instructions.",
      });

      // Move to confirmation step
      setStep(6);

      // Redirect to dashboard after 5 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 5000);

    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-transition-container min-h-screen flex flex-col bg-gradient-to-b from-white to-diplomatic-50">
      <Navbar />
      <main className="flex-grow pt-20 pb-12">
        <RegistrationContent
          step={step}
          formData={formData}
          isSubmitting={isSubmitting}
          calculateFee={calculateFee}
          handleChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
          photoFile={photoFile}
          ieltsFile={ieltsFile}
          satFile={satFile}
          updatePhotoFile={setPhotoFile}
          updateIeltsCertificate={setIeltsFile}
          updateSatCertificate={setSatFile}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Registration;

