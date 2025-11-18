import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bell } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Registration = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-transition-container min-h-screen flex flex-col bg-gradient-to-b from-white to-diplomatic-50">
      <Navbar />
      <main className="flex-grow pt-20 pb-12 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block p-4 bg-gradient-to-br from-diplomatic-100 to-diplomatic-50 rounded-full mb-6"
              >
                <Bell size={48} className="text-diplomatic-600" />
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-diplomatic-900"
            >
              Coming Soon
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-neutral-600 mb-6"
            >
              Season 6 registration hasn't been announced yet. We're working on bringing you an even better experience!
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base text-neutral-600 mb-8"
            >
              Follow our Telegram channel to stay updated on registration opening and all the latest announcements.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href="https://t.me/TuronMUN"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#0088cc] hover:bg-[#0077b5] text-white font-semibold rounded-lg transition-colors duration-300 shadow-lg"
              >
                <Send size={20} />
                Join Telegram Channel
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-8 py-3 bg-diplomatic-600 hover:bg-diplomatic-700 text-white font-semibold rounded-lg transition-colors duration-300"
              >
                Back to Home
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 p-6 bg-diplomatic-50 rounded-xl border border-diplomatic-200"
            >
              <p className="text-sm text-diplomatic-700">
                <span className="font-semibold">📢 Pro Tip:</span> Enable notifications on our Telegram channel to get instant updates about Season 6 registration and important announcements!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Registration;
