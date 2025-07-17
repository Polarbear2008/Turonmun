import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { seasonsData } from '@/data/seasonsData';
import PageLayout from '@/components/layout/PageLayout';
import SeasonOverview from '@/components/past-conferences/SeasonOverview';
import SeasonStatistics from '@/components/past-conferences/SeasonStatistics';
import SeasonGallery from '@/components/past-conferences/SeasonGallery';
import SeasonTeam from '@/components/past-conferences/SeasonTeam';
import CallToAction from '@/components/past-conferences/CallToAction';
import { ArrowLeft, Cpu, Users, Globe, Award, BarChart3, Network } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Season3() {
  // Get the season data for Season 3
  const seasonData = seasonsData.find(season => season.id === "season3") || seasonsData[2];
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      transition: { 
        duration: 0.3,
        ease: "easeIn" 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <PageLayout>
      <motion.div
        key="season-3"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="bg-gradient-to-b from-white to-diplomatic-50"
      >
        {/* Hero Section - Digital Transformation Theme */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-r from-diplomatic-600 to-diplomatic-800">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0">
              {/* Digital pattern */}
              <svg className="w-full h-full opacity-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50,10 L90,50 L50,90 L10,50 Z" fill="#ffffff"/>
                <path d="M30,30 L70,70 M30,70 L70,30" stroke="#ffffff" strokeWidth="0.5" fill="none"/>
              </svg>
            </div>
          </div>
          
          {/* Floating digital icons animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`digital-${i}`}
                className="absolute text-white/20"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%", 
                  rotate: Math.random() * 360,
                  scale: 0.5 + Math.random() * 1
                }}
                animate={{ 
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  rotate: Math.random() * 360 + 360,
                }}
                transition={{ 
                  duration: 20 + Math.random() * 10, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                {i % 2 === 0 ? <Cpu size={24} /> : <Network size={24} />}
              </motion.div>
            ))}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Link 
                to="/past-conferences" 
                className="inline-flex items-center text-white hover:text-diplomatic-100 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                <span className="text-sm font-medium">Back to All Seasons</span>
              </Link>
            </motion.div>

            <div className="max-w-4xl mx-auto text-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6"
              >
                <Cpu size={32} className="text-white" />
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Season 2023
              </motion.h1>
              
              <motion.div 
                className="w-24 h-1 mx-auto my-6 rounded-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              
              <motion.h2 
                className="text-xl md:text-2xl font-medium text-white opacity-90 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {seasonData.theme}
              </motion.h2>
            </div>
          </div>

          {/* Curved bottom edge */}
          <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" fill="white"></path>
          </svg>
        </section>

        {/* Season Overview */}
        <section className="py-20 bg-white relative z-0">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              <motion.div variants={itemVariants} className="mb-16">
                <div className="flex items-center justify-center mb-6">
                  <div className="h-0.5 w-10 bg-diplomatic-200 rounded-full mr-4"></div>
                  <h2 className="text-diplomatic-600 font-semibold text-lg uppercase tracking-wider">Overview</h2>
                  <div className="h-0.5 w-10 bg-diplomatic-200 rounded-full ml-4"></div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                  Digital Transformation & Global Governance
                </h3>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 mb-6 text-center">
                    Our third season brought together future leaders to address digital challenges and promote 
                    responsible technology governance through international cooperation.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-8 mt-12">
                    <div className="bg-diplomatic-50 p-6 rounded-xl shadow-sm border border-diplomatic-100">
                      <div className="w-12 h-12 bg-diplomatic-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Cpu className="text-diplomatic-600 h-6 w-6" />
                      </div>
                      <h4 className="font-bold text-lg mb-2 text-center text-gray-800">Digital Initiatives</h4>
                      <p className="text-gray-600 text-center text-sm">
                        Delegates proposed innovative solutions to ongoing digital challenges.
                      </p>
                    </div>
                    
                    <div className="bg-diplomatic-50 p-6 rounded-xl shadow-sm border border-diplomatic-100">
                      <div className="w-12 h-12 bg-diplomatic-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Globe className="text-diplomatic-600 h-6 w-6" />
                      </div>
                      <h4 className="font-bold text-lg mb-2 text-center text-gray-800">Global Representation</h4>
                      <p className="text-gray-600 text-center text-sm">
                        {seasonData.statistics.countries} nations participated in our most diverse conference yet.
                      </p>
                    </div>
                    
                    <div className="bg-diplomatic-50 p-6 rounded-xl shadow-sm border border-diplomatic-100">
                      <div className="w-12 h-12 bg-diplomatic-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Award className="text-diplomatic-600 h-6 w-6" />
                      </div>
                      <h4 className="font-bold text-lg mb-2 text-center text-gray-800">Diplomatic Forums</h4>
                      <p className="text-gray-600 text-center text-sm">
                        {seasonData.statistics.committees} specialized committees addressed various aspects of digital governance.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Statistics Section with Digital Transformation Theme */}
        <section className="py-20 bg-diplomatic-50 relative z-0">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 opacity-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4967AB" d="M42.8,-62.2C54.9,-54.3,63.7,-40.9,69.2,-26.3C74.8,-11.7,77.2,4.1,73.2,18.1C69.2,32.1,58.9,44.3,46.4,54.9C33.8,65.5,19,74.5,2.4,72.8C-14.1,71.1,-32.4,58.7,-45.6,44.7C-58.8,30.7,-67,15.3,-70.8,-2.2C-74.7,-19.8,-74.2,-39.5,-64.1,-49.5C-53.9,-59.5,-34.2,-59.8,-17.7,-65.8C-1.2,-71.8,12.1,-83.5,25.1,-80.2C38.1,-76.9,50.8,-58.5,42.8,-62.2Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 opacity-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4967AB" d="M43.5,-69.1C54.9,-62.1,61.8,-47.5,67.2,-33.1C72.6,-18.7,76.5,-4.5,74.6,8.8C72.7,22.1,65,34.5,55.3,44.9C45.6,55.3,34,63.7,20.6,70.1C7.3,76.4,-7.8,80.7,-22.4,78.1C-37,75.5,-51.1,66,-61.3,53.5C-71.5,41,-77.8,25.4,-79.9,9.1C-82,-7.2,-79.9,-24.3,-71.7,-37.3C-63.5,-50.3,-49.2,-59.3,-35.2,-65.1C-21.1,-70.9,-7.4,-73.5,5.1,-81.6C17.6,-89.7,35.3,-103.3,43.5,-69.1Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              className="max-w-5xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="flex items-center justify-center mb-6">
                  <div className="h-0.5 w-10 bg-diplomatic-200 rounded-full mr-4"></div>
                  <h2 className="text-diplomatic-600 font-semibold text-lg uppercase tracking-wider">Statistics</h2>
                  <div className="h-0.5 w-10 bg-diplomatic-200 rounded-full ml-4"></div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Season Impact</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our third season achieved unprecedented global participation and digital engagement.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {Object.entries(seasonData.statistics).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-sm p-6 text-center transform hover:scale-105 transition-transform duration-300 border border-diplomatic-100"
                  >
                    <div className="w-12 h-12 bg-diplomatic-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                      {key === 'participants' ? (
                        <Users className="text-diplomatic-600 h-6 w-6" />
                      ) : key === 'countries' ? (
                        <Globe className="text-diplomatic-600 h-6 w-6" />
                      ) : key === 'committees' ? (
                        <Award className="text-diplomatic-600 h-6 w-6" />
                      ) : (
                        <BarChart3 className="text-diplomatic-600 h-6 w-6" />
                      )}
                    </div>
                    <h4 className="text-4xl font-bold text-diplomatic-600 mb-2">{value}</h4>
                    <p className="text-gray-600 capitalize">{key}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-white relative z-0">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="flex items-center justify-center mb-6">
                  <div className="h-0.5 w-10 bg-diplomatic-200 rounded-full mr-4"></div>
                  <h2 className="text-diplomatic-600 font-semibold text-lg uppercase tracking-wider">Gallery</h2>
                  <div className="h-0.5 w-10 bg-diplomatic-200 rounded-full ml-4"></div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Digital Moments</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Highlights from our third season focused on digital transformation and global governance.
                </p>
              </motion.div>

              <div className="relative">
                <div className="absolute -top-10 -left-10 w-20 h-20 text-diplomatic-100 opacity-50">
                  <Cpu size={80} />
                </div>
                <div className="absolute -bottom-10 -right-10 w-20 h-20 text-diplomatic-100 opacity-50 transform rotate-45">
                  <Cpu size={80} />
                </div>
                <SeasonGallery season={seasonData} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-diplomatic-50 relative z-0">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="flex items-center justify-center mb-6">
                  <div className="h-0.5 w-10 bg-diplomatic-200 rounded-full mr-4"></div>
                  <h2 className="text-diplomatic-600 font-semibold text-lg uppercase tracking-wider">Organizers</h2>
                  <div className="h-0.5 w-10 bg-diplomatic-200 rounded-full ml-4"></div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Digital Team</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Meet the dedicated individuals who orchestrated our digital-focused season.
                </p>
              </motion.div>

              <SeasonTeam season={seasonData} />
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <CallToAction selectedSeason={seasonData} />
      </motion.div>
    </PageLayout>
  );
}
