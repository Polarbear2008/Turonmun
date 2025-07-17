import React from 'react';
import CommitteeCard from './CommitteeCard';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CustomButton } from './ui/custom-button';

const committees = [
  {
    name: 'United Nations General Assembly',
    abbreviation: 'UNGA',
    description: 'The main forum for international discussions, where all UN member states collaborate to address global issues.',
    topics: ['Global Refugee Crisis', 'Humanitarian Aid'],
    imageUrl: '/images/committees/unga.png'
  },
  {
    name: 'World Trade Organization',
    abbreviation: 'WTO',
    description: 'Oversees global trade rules, ensuring stability and fairness in international markets.',
    topics: ['Trade Wars', 'Economic Sanctions'],
    imageUrl: '/images/committees/wto.jpg'
  },
  {
    name: 'Economic and Social Council',
    abbreviation: 'ECOSOC',
    description: 'ECOSOC coordinates the work of the 14 UN specialized agencies, functional commissions and regional commissions, focusing on sustainable development, economic growth, and social progress.',
    topics: ['Sustainable Development Goals', 'Digital Economy', 'Social Protection Systems'],
    imageUrl: '/images/committees/ecosoc.avif'
  },
  {
    name: 'Human Rights Council',
    abbreviation: 'HRC',
    description: 'Responsible for promoting and protecting human rights worldwide and addressing violations.',
    topics: ['Modern Slavery', 'Global Supply Chain'],
    imageUrl: '/images/committees/HRC.png'
  }
];

export default function CommitteesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5" />
      
      {/* Reduce number of animated dots for better performance */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-diplomatic-300"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 6,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Simplify floating curved lines */}
      <motion.div
        className="absolute w-64 h-64 border-2 border-diplomatic-200/10 rounded-full"
        style={{ top: '10%', right: '5%' }}
        animate={{ 
          rotate: 360,
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="container relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <motion.span 
            className="chip mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            For Delegates
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-diplomatic-800">
              Our Committees
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-neutral-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Explore our diverse committees where you can debate critical global issues, forge diplomatic relationships, and develop leadership skills.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {committees.map((committee, idx) => (
            <motion.div 
              key={committee.abbreviation}
              variants={itemVariants}
              custom={idx}
              className="h-96"
            >
              <CommitteeCard {...committee} />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="hover:scale-105 transition-transform duration-200">
            <CustomButton 
              to="/committees" 
              variant="ghost"
              className="group"
            >
              <span>View All Committees</span>
              <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </CustomButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
