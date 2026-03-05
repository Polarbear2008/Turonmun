import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommitteeCard from '../components/CommitteeCard';
import NewsletterForm from '../components/NewsletterForm';
import { motion } from 'framer-motion';
import { Globe, FileBarChart, Landmark, Shield } from 'lucide-react';
import { useToast } from "../hooks/use-toast";

const committees = [
  {
    name: 'United Nations General Assembly',
    abbreviation: 'UNGA',
    description: 'The UNGA is the main forum for international discussions, where all UN member states collaborate to address global issues. This session will focus on the global refugee crisis, exploring ways to provide humanitarian aid while maintaining national security.',
    topics: ['Global Refugee Crisis', 'Humanitarian Aid'],
    chairs: ['Dr. Jane Smith', 'Prof. John Doe'],
    imageUrl: '/images/committees/unga.png',
    icon: Globe
  },
  {
    name: 'World Trade Organization',
    abbreviation: 'WTO',
    description: 'The WTO oversees global trade rules, ensuring stability and fairness in international markets. This session will examine the impact of trade wars and economic sanctions, assessing their effects on economies and diplomatic relations.',
    topics: ['Trade Wars', 'Economic Sanctions'],
    chairs: ['Ambassador Lee Chang', 'Dr. Maria Rodriguez'],
    imageUrl: '/images/committees/wto.jpg',
    icon: FileBarChart
  },
  {
    name: 'Economic and Social Council',
    abbreviation: 'ECOSOC',
    description: 'ECOSOC is responsible for addressing economic and social challenges, promoting sustainable development, and reducing inequality. This session will analyze the effects of AI and automation on employment, ethics, and global economic stability.',
    topics: ['AI and Automation', 'Economic Inequality'],
    chairs: ['Prof. Eliza Wang', 'Dr. Thomas Mueller'],
    imageUrl: '/images/committees/ecosoc.avif',
    icon: Landmark
  },
  {
    name: 'Human Rights Council',
    abbreviation: 'HRC',
    description: 'The HRC is responsible for promoting and protecting human rights worldwide. It addresses violations, recommends solutions, and ensures global accountability. This session will focus on the identification and prevention of modern slavery in global supply chains.',
    topics: ['Modern Slavery', 'Global Supply Chain'],
    chairs: ['Justice Amara Kone', 'Dr. Robert Park'],
    imageUrl: '/images/committees/HRC.png',
    icon: Shield
  }
];

const Committees = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-transition-container min-h-screen flex flex-col bg-gradient-to-b from-white to-diplomatic-50">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-diplomatic-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gold-100 rounded-full opacity-20 blur-3xl"></div>
          
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-12 text-center"
            >
              <span className="inline-block px-3 py-1 bg-gold-100 text-gold-600 rounded-full text-sm font-medium mb-3">turonmun Season 4</span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-diplomatic-900 mb-6">
                Our Committees
              </h1>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Join one of our carefully designed committees to debate pressing international issues, develop diplomatic skills, and forge connections with fellow delegates.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
              {committees.map((committee, index) => (
                <motion.div
                  key={committee.abbreviation}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="committee-detail-card h-96"
                >
                  <CommitteeCard {...committee} />
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="glass-panel p-8 text-center max-w-3xl mx-auto"
            >
              <h3 className="text-2xl font-display font-semibold mb-4">Ready to Join the Deliberation?</h3>
              <p className="mb-6 text-neutral-600">
                Register now to secure your place in one of our prestigious committees. Spaces are limited and allocated on a first-come, first-served basis.
              </p>
              <a 
                href="/registration" 
                className="btn-primary bg-diplomatic-700 hover:bg-diplomatic-800 transition-colors duration-200"
              >
                Register as a Delegate
              </a>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Committees;
