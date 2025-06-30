import React from 'react';
import FeatureCard from './FeatureCard';
import { Users, Award, Globe, PenTool } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Globe,
    title: 'Why TuronMUN?',
    description: 'Experience authentic international diplomacy through immersive crisis scenarios that place real global challenges in your hands.'
  },
  {
    icon: Users,
    title: 'Why TuronMUN?',
    description: 'Transform into a master negotiator through thrilling consensus-building exercises that mirror high-stakes international diplomacy perfectly.'
  },
  {
    icon: Award,
    title: 'Why TuronMUN?',
    description: 'Forge powerful connections with exceptional delegates who share your passion for justice and bring diverse cultural perspectives.'
  },
  {
    icon: PenTool,
    title: 'Why TuronMUN?',
    description: 'Unleash your intellectual potential through masterfully designed challenges that sharpen analytical prowess and eloquent speaking abilities.'
  }
];

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-neutral-50 to-white border-y border-neutral-200">
      <div className="absolute inset-0 bg-world-map opacity-[0.03] pointer-events-none" />
      <div className="container relative">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Text content */}
          <motion.div 
            className="lg:w-1/2 space-y-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <Badge variant="outline" className="mb-4 text-diplomatic-600 bg-diplomatic-50/50 border-diplomatic-200 px-3 py-1 text-sm font-medium">
              About Our Conference
            </Badge>
            
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-diplomatic-900 leading-tight">
                We are the only MUN from <span className="text-gold-500">Central Asia</span> that topped the <span className="text-gold-500">mymun charts</span>
              </h2>
              <div className="w-20 h-1 bg-gold-400 rounded-full" />
            </div>

            <div className="space-y-6 pt-6">
              <p className="text-neutral-700 leading-relaxed">
                Our Model United Nations conference provides a unique platform for students to simulate international diplomacy and develop a deep understanding of global issues. Through carefully designed committee sessions, workshops, and social events, participants gain valuable skills while building lifelong connections.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Whether you're a seasoned delegate or new to MUN, our conference offers opportunities for growth, learning, and meaningful engagement with international affairs.
              </p>
              
              {/* Trusted by section */}
              <div className="mt-12 pt-10 pb-12 px-6 bg-gradient-to-r from-diplomatic-50 to-white rounded-xl border border-diplomatic-100">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h3 className="text-sm font-semibold text-diplomatic-600 tracking-wider uppercase mb-3">TRUSTED BY LEADING ORGANIZATIONS</h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-gold-400 to-amber-400 mx-auto"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 items-center">
                    {[1, 2, 3].map((num) => (
                      <div 
                        key={num}
                        className="h-24 sm:h-28 flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                      >
                        <div className="relative w-full h-full">
                          <img 
                            src={`/logos/logo${num}.png`} 
                            alt={`Trusted Partner ${num}`} 
                            className="h-full w-full object-contain object-center p-1 opacity-90 hover:opacity-100 transition-all duration-200"
                            style={{ filter: 'grayscale(100%)' }}
                            onMouseOver={(e) => e.currentTarget.style.filter = 'grayscale(0%)'}
                            onMouseOut={(e) => e.currentTarget.style.filter = 'grayscale(100%)'}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Feature cards */}
          <motion.div 
            className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {features.map((feature, index) => (
              <div key={index} className="h-full">
                <FeatureCard 
                  {...feature} 
                  variant={index % 2 === 0 ? 'default' : 'filled'}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
