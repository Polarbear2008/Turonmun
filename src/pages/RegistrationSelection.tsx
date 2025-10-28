import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RegistrationSelection = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const roles = [
    {
      title: "Delegate",
      description: "Active participation",
      price: "79K UZS",
      date: "Deadline: October 29, 2025",
      spots: "100 spots",
      available: true,
      route: "/registration",
      location: "Registan Private School"
    },
    {
      title: "Chair",
      description: "Leading the committee — Transportation expenses are covered",
      price: "FREE",
      date: "Deadline: October 29, 2025",
      spots: "5 chairs, 5 co-chairs",
      available: true,
      route: "https://forms.gle/z8vT7jBW8T97v6hh9",
      location: "Registan Private School"
    },
    {
      title: "Observer",
      description: "Relaxed participation",
      price: "79K UZS",
      date: "Deadline: November 5",
      spots: "20 spots",
      available: true,
      route: "https://forms.gle/Cq6XkXiKPByFDhSVA"
    }
  ];

  // Function to handle external link clicks
  const handleExternalLinkClick = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="page-transition-container min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-diplomatic-900 via-diplomatic-800 to-diplomatic-700 min-h-screen">
          <div className="absolute inset-0 opacity-50"></div>
          
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="w-full max-w-6xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                  Choose Your Role
                </h1>
                <p className="text-xl text-white/80 max-w-3xl mx-auto">
                  Select your participation type for TuronMUN 2025. Each role offers a unique diplomatic experience.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
                {roles.map((role, index) => (
                  <motion.div
                    key={role.title}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="relative"
                  >
                    <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 h-full flex flex-col justify-between shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-white/15">
                      <div className="text-center mb-6">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gold-400 mb-3">
                          {role.title}
                        </h2>
                        <p className="text-white/70 text-lg">
                          {role.description}
                        </p>
                      </div>

                      <div className="text-center mb-6">
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {role.price}
                        </div>
                        {role.title === "Delegate" && (
                          <div className="text-sm text-gold-400 font-medium">
                            Discounts available for SAT/IELTS certificates
                          </div>
                        )}
                      </div>

                      <div className="space-y-4 mb-8 flex-grow">
                        <div className="text-center">
                          <div className="text-white/80 text-lg">
                            {role.date}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-white/80 text-lg">
                            {role.spots}
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        {role.title === "Delegate" ? (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link
                              to={role.route}
                              className="inline-flex items-center justify-center w-full font-semibold py-4 px-8 rounded-2xl transition-all duration-300 backdrop-blur-sm"
                              style={{
                                backgroundColor: hoveredButton === `${role.title}-apply` ? '#EAB308' : 'rgba(255, 255, 255, 0.2)',
                                color: hoveredButton === `${role.title}-apply` ? '#000000' : '#ffffff',
                                borderColor: hoveredButton === `${role.title}-apply` ? '#EAB308' : 'rgba(255, 255, 255, 0.3)',
                                borderWidth: '1px',
                                borderStyle: 'solid'
                              }}
                              onMouseEnter={() => setHoveredButton(`${role.title}-apply`)}
                              onMouseLeave={() => setHoveredButton(null)}
                            >
                              Apply
                            </Link>
                          </motion.div>
                        ) : (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <a
                              href={role.route}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => handleExternalLinkClick(role.route, e)}
                              className="inline-flex items-center justify-center w-full font-semibold py-4 px-8 rounded-2xl transition-all duration-300 backdrop-blur-sm"
                              style={{
                                backgroundColor: hoveredButton === `${role.title}-apply` ? '#EAB308' : 'rgba(255, 255, 255, 0.2)',
                                color: hoveredButton === `${role.title}-apply` ? '#000000' : '#ffffff',
                                borderColor: hoveredButton === `${role.title}-apply` ? '#EAB308' : 'rgba(255, 255, 255, 0.3)',
                                borderWidth: '1px',
                                borderStyle: 'solid'
                              }}
                              onMouseEnter={() => setHoveredButton(`${role.title}-apply`)}
                              onMouseLeave={() => setHoveredButton(null)}
                            >
                              Apply
                            </a>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center mt-16"
              >
                <p className="text-white/60 text-lg max-w-2xl mx-auto">
                  Each role offers different responsibilities and experiences. Choose the one that best fits your diplomatic aspirations.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegistrationSelection; 