
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationContent from '../components/registration/RegistrationContent';
import { useRegistrationForm } from '../hooks/useRegistrationForm';
import { useToast } from '../hooks/use-toast';

const Registration = () => {
  const { toast } = useToast();
  
  // Scroll to top on page load and check for success message
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if there's a success message in localStorage (from redirect after submission)
    const successMessage = localStorage.getItem('registrationSuccess');
    if (successMessage) {
      toast({
        title: "Registration Submitted",
        description: "Your application has been received successfully.",
      });
      localStorage.removeItem('registrationSuccess');
    }
  }, [toast]);

  const {
    step,
    formData,
    isSubmitting,
    calculateFee,
    handleChange,
    nextStep,
    prevStep,
    handleSubmit
  } = useRegistrationForm();

  return (
    <div className="page-transition-container min-h-screen flex flex-col bg-gradient-to-b from-white to-diplomatic-50">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="relative overflow-hidden py-16 md:py-24">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-diplomatic-100 rounded-full opacity-20 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gold-100 rounded-full opacity-20 blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          
          <RegistrationContent
            step={step}
            formData={formData}
            isSubmitting={isSubmitting}
            calculateFee={calculateFee}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Registration;
