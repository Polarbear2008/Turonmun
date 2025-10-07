import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationContent from '../components/registration/RegistrationContent';
import { useRegistrationForm } from '../hooks/useRegistrationForm';

const Registration = () => {
  const {
    step,
    formData,
    isSubmitting,
    calculateFee,
    handleChange,
    nextStep,
    prevStep,
    handleSubmit,
    photoFile,
    ieltsFile,
    satFile,
    updatePhotoFile,
    updateIeltsCertificate,
    updateSatCertificate,
  } = useRegistrationForm();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          updatePhotoFile={updatePhotoFile}
          updateIeltsCertificate={updateIeltsCertificate}
          updateSatCertificate={updateSatCertificate}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Registration;
