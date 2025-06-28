import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { seasonsData } from '@/data/seasonsData';
import PageLayout from '@/components/layout/PageLayout';
import SeasonOverview from '@/components/past-conferences/SeasonOverview';
import SeasonStatistics from '@/components/past-conferences/SeasonStatistics';
import SeasonGallery from '@/components/past-conferences/SeasonGallery';
import SeasonTeam from '@/components/past-conferences/SeasonTeam';
import CallToAction from '@/components/past-conferences/CallToAction';
import { ArrowLeft, Heart, Users, Globe, Award, BarChart3, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Season1() {
  // Get the season data for Season 1
  const seasonData = seasonsData.find(season => season.id === "season1") || seasonsData[0];
  
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
        key="season-1"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="bg-gradient-to-b from-white to-diplomatic-50"
      >
        {/* Hero Section - Health Theme */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-r from-diplomatic-600 to-diplomatic-800">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0">
              {/* Health pattern */}
              <svg className="w-full h-full opacity-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M30,10 L70,10 L70,30 L90,30 L90,70 L70,70 L70,90 L30,90 L30,70 L10,70 L10,30 L30,30 Z" fill="#ffffff"/>
              </svg>
            </div>
          </div>
          
          {/* Floating health symbols animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`health-${i}`}
                className="absolute text-white/20"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%", 
                  rotate: Math.random() * 20 - 10,
                  scale: 0.5 + Math.random() * 1
                }}
                animate={{ 
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  rotate: Math.random() * 20 - 10,
                }}
                transition={{ 
                  duration: 20 + Math.random() * 10, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <Activity size={24} />
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
                <Activity size={32} className="text-white" />
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Season 2021
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
            <div className="max-w-4xl mx-auto">
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
                    Global Health Emergencies
                  </h3>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-600 mb-6 text-center">
                      Our inaugural season focused on addressing global health challenges and developing 
                      collaborative solutions to worldwide health emergencies.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                      <div className="bg-diplomatic-50 p-6 rounded-xl shadow-sm border border-diplomatic-100">
                        <div className="w-12 h-12 bg-diplomatic-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <Activity className="text-diplomatic-600 h-6 w-6" />
                        </div>
                        <h4 className="font-bold text-lg mb-2 text-center text-gray-800">Health Initiatives</h4>
                        <p className="text-gray-600 text-center text-sm">
                          Delegates proposed innovative solutions to global health crises.
                        </p>
                      </div>
                      
                      <div className="bg-diplomatic-50 p-6 rounded-xl shadow-sm border border-diplomatic-100">
                        <div className="w-12 h-12 bg-diplomatic-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <Globe className="text-diplomatic-600 h-6 w-6" />
                        </div>
                        <h4 className="font-bold text-lg mb-2 text-center text-gray-800">Global Collaboration</h4>
                        <p className="text-gray-600 text-center text-sm">
                          {seasonData.statistics.countries} nations joined forces to address health challenges.
                        </p>
                      </div>
                      
                      <div className="bg-diplomatic-50 p-6 rounded-xl shadow-sm border border-diplomatic-100">
                        <div className="w-12 h-12 bg-diplomatic-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <Users className="text-diplomatic-600 h-6 w-6" />
                        </div>
                        <h4 className="font-bold text-lg mb-2 text-center text-gray-800">Expert Participation</h4>
                        <p className="text-gray-600 text-center text-sm">
                          {seasonData.statistics.participants} dedicated delegates worked on health solutions.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Statistics Section with Health Theme */}
        <section className="py-20 bg-diplomatic-50 relative z-0">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 opacity-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4967AB" d="M42.8,-62.2C54.9,-54.3,63.7,-40.9,69.2,-26.3C74.8,-11.7,77.2,4.1,73.2,18.1C69.2,32.1,58.9,44.3,46.4,54.9C33.8,65.5,19,74.5,2.4,72.8C-14.1,71.1,-32.4,58.7,-45.6,44.7C-58.8,30.7,-67,15.3,-70.8,-2.2C-74.7,-19.8,-74.2,-39.5,-64.1,-49.5C-53.9,-59.5,-34.2,-59.8,-17.7,-65.8C-1.2,-71.8,12.1,-83.5,25.1,-80.2C38.1,-76.9,50.8,-58.5,42.8,-62.2Z" transform="translate(100 100)" />
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
                  Our inaugural season brought together global health experts and future leaders to address pressing health challenges.
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
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Conference Highlights</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Memorable moments from our inaugural season focused on global health.
                </p>
              </motion.div>

              <div className="relative">
                <div className="absolute -top-10 -left-10 w-20 h-20 text-diplomatic-100 opacity-50">
                  <Activity size={80} />
                </div>
                <div className="absolute -bottom-10 -right-10 w-20 h-20 text-diplomatic-100 opacity-50 transform rotate-45">
                  <Activity size={80} />
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
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Health Experts</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Meet the dedicated team who made our health-focused season possible.
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
