import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationContent from '../components/registration/RegistrationContent';
import { useRegistrationForm } from '../hooks/useRegistrationForm';
import { useToast } from '../hooks/use-toast';

const Registration = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-transition-container min-h-screen flex flex-col bg-gradient-to-b from-white to-diplomatic-50">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="relative overflow-hidden py-16 md:py-24 flex flex-col items-center justify-center">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-diplomatic-100 rounded-full opacity-20 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gold-100 rounded-full opacity-20 blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          <div className="relative z-10 max-w-xl mx-auto bg-white/80 rounded-xl shadow-lg p-10 text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 text-diplomatic-800">Applications are Closed</h1>
            <p className="text-lg md:text-xl text-neutral-700 mb-6">
              Thank you for your interest in TuronMUN!<br />
              Registration for this year is now closed.<br />
              We appreciate your enthusiasm and encourage you to follow our social media for future updates and opportunities.
            </p>
            <div className="flex justify-center gap-4">
              <a href="https://instagram.com/TuronMUN" target="_blank" rel="noopener noreferrer" className="inline-block text-diplomatic-700 hover:text-gold-500 font-medium underline">Instagram</a>
              <a href="https://t.me/TuronMUN" target="_blank" rel="noopener noreferrer" className="inline-block text-diplomatic-700 hover:text-gold-500 font-medium underline">Telegram</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Registration;
