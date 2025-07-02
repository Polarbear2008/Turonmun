import React from 'react';
import FeatureCard from './FeatureCard';
import { Users, Award, Globe, PenTool } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Users,
    title: 'Diverse Participation',
    description: 'Connect with students from different backgrounds, cultures, and perspectives from around the world.'
  },
  {
    icon: Award,
    title: 'Professional Development',
    description: 'Enhance your public speaking, negotiation, research, and leadership skills essential for future careers.'
  },
  {
    icon: Globe,
    title: 'Global Issues',
    description: 'Debate pressing international challenges and develop innovative solutions to global problems.'
  },
  {
    icon: PenTool,
    title: 'Diplomatic Experience',
    description: 'Gain hands-on experience with diplomatic procedures, resolution drafting, and consensus building.'
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
                Experience the Art of <span className="text-gold-500">Diplomacy</span>
              </h2>
              <div className="w-20 h-1 bg-gold-400 rounded-full" />
            </div>

            <div className="space-y-6">
              <p className="text-neutral-700 leading-relaxed">
                Our Model United Nations conference provides a unique platform for students to simulate international diplomacy and develop a deep understanding of global issues. Through carefully designed committee sessions, workshops, and social events, participants gain valuable skills while building lifelong connections.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Whether you're a seasoned delegate or new to MUN, our conference offers opportunities for growth, learning, and meaningful engagement with international affairs.
              </p>
            </div>
            
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="bg-white border-neutral-200 shadow-subtle overflow-hidden hover:shadow-elegant transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-diplomatic-600 to-diplomatic-800">12</div>
                    <div className="text-sm text-neutral-600">Regions</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-neutral-200 shadow-subtle overflow-hidden hover:shadow-elegant transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-diplomatic-600 to-diplomatic-800">4</div>
                    <div className="text-sm text-neutral-600">Committees</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-neutral-200 shadow-subtle overflow-hidden hover:shadow-elegant transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-diplomatic-600 to-diplomatic-800">80</div>
                    <div className="text-sm text-neutral-600">Delegates</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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
