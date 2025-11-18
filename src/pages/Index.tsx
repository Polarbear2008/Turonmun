
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Seo } from '../components/seo';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import CommitteesSection from '../components/CommitteesSection';
import SchedulePreview from '../components/SchedulePreview';
import FAQSection from '../components/FAQSection';
import SponsorsSection from '../components/SponsorsSection';
import Footer from '../components/Footer';
import { seasonsData } from '../data/seasonsData';

// Get the latest season data
const latestSeason = seasonsData[seasonsData.length - 1];

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants for staggered reveals
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <div className="page-transition-container min-h-screen flex flex-col">
      <Seo 
        title="TuronMUN - Model United Nations Conference"
        description="Join TuronMUN for an enriching Model United Nations experience. Develop diplomacy, debate, and leadership skills with students from around the world."
        event={{
          name: `TuronMUN ${latestSeason.title}`,
          startDate: latestSeason.date,
          endDate: latestSeason.endDate || latestSeason.date,
          location: latestSeason.location,
          description: latestSeason.description,
        }}
      />
      <Navbar />
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Hero />
        
        <motion.div variants={sectionVariants}>
          <AboutSection />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <CommitteesSection />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <SchedulePreview />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <SponsorsSection />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <FAQSection />
        </motion.div>
      </motion.main>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;
