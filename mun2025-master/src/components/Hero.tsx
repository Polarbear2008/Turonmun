import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar, Clock, MapPin, Users } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { Link } from 'react-router-dom';
import { CustomButton } from './ui/custom-button';
import { transitionVariants } from '@/lib/transition-utils';

const conferenceDate = new Date('2025-07-18T09:00:00');
const conferenceLocation = 'Fergana Presidential School, Uzbekistan';

const phrases = [
  "Shaping Tomorrow's Leaders",
  "Build Connections",
  "Shape the Future",
  "Join Season 4"
];

const Hero = () => {
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const typingSpeed = 100; // ms per character
  const deletingSpeed = 50; // ms per character when deleting
  const pauseDuration = 1500; // pause between phrases
  const pauseBeforeNew = 800; // pause before starting a new phrase

  useEffect(() => {
    setIsVisible(true);
    
    const handleTyping = () => {
      const currentFullPhrase = phrases[phraseIndex];
      
      if (!isDeleting && currentPhrase !== currentFullPhrase) {
        setCurrentPhrase(currentFullPhrase.substring(0, currentPhrase.length + 1));
        return typingSpeed;
      } 
      else if (!isDeleting && currentPhrase === currentFullPhrase) {
        setIsDeleting(true);
        return pauseDuration;
      } 
      else if (isDeleting && currentPhrase !== '') {
        setCurrentPhrase(currentPhrase.substring(0, currentPhrase.length - 1));
        return deletingSpeed;
      } 
      else if (isDeleting && currentPhrase === '') {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
        return pauseBeforeNew;
      }
      
      return typingSpeed;
    };
    
    const timeout = setTimeout(() => {
      const nextDelay = handleTyping();
      if (nextDelay) clearTimeout(timeout);
      return setTimeout(() => handleTyping(), nextDelay);
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [currentPhrase, isDeleting, phraseIndex]);

  // Background animation variants
  const backgroundVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 0.05, 
      transition: { 
        duration: 2,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  // Subtle floating light particles
  const particles = Array.from({ length: 25 }).map((_, index) => ({
    id: index,
    initialX: Math.random() * window.innerWidth,
    initialY: Math.random() * window.innerHeight,
    size: Math.random() * 2 + 1.5, // Small circles
    opacity: Math.random() * 0.3 + 0.1, // Subtle opacity
    duration: Math.random() * 80 + 60, // Very slow movement
    delay: Math.random() * 10
  }));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-diplomatic-900 via-diplomatic-800 to-diplomatic-700 py-10 sm:py-16">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-world-map bg-no-repeat bg-center opacity-5"
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
        />
        
        {/* Subtle floating light particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gold-400"
            style={{ 
              width: `${particle.size}px`, 
              height: `${particle.size}px`,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size}px rgba(247, 163, 28, 0.15)`
            }}
            initial={{ 
              x: particle.initialX, 
              y: particle.initialY
            }}
            animate={{ 
              y: [
                particle.initialY, 
                particle.initialY - 40 - Math.random() * 30, 
                particle.initialY + 40 + Math.random() * 30,
                particle.initialY
              ],
              x: [
                particle.initialX, 
                particle.initialX + 40 + Math.random() * 30, 
                particle.initialX - 40 - Math.random() * 30,
                particle.initialX
              ]
            }}
            transition={{ 
              duration: particle.duration, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: particle.delay
            }}
          />
        ))}
        
        <motion.div 
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-diplomatic-600 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gold-400 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut" 
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-10 items-center">
          <motion.div
            variants={transitionVariants.containerVariants}
            initial="initial"
            animate="animate"
            className="text-white px-4 sm:px-0 order-2 lg:order-1"
          >
            <motion.span 
              variants={transitionVariants.slideInDown}
              className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-4 md:mb-6"
            >
              Model United Nations
            </motion.span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 md:mb-6">
              <motion.span
                variants={transitionVariants.slideInLeft}
                className="block text-white"
              >
                <span className="text-gradient-gold">turonmun</span> Season 4
              </motion.span>
              <motion.span 
                variants={transitionVariants.fadeVariants}
                className="block text-gold-400 mt-2 min-h-[40px] text-base sm:text-xl md:text-2xl lg:text-3xl"
              >
                {currentPhrase}
                <span className="animate-pulse ml-1">|</span>
              </motion.span>
            </h1>
            
            <motion.p 
              variants={transitionVariants.slideInLeft}
              className="text-sm sm:text-base md:text-lg text-white/80 mb-6 md:mb-8 max-w-xl"
            >
              Join delegates from across Uzbekistan to debate pressing global issues, develop 
              leadership skills, and forge valuable connections at our prestigious Model UN conference.
            </motion.p>
            
            <motion.div 
              variants={transitionVariants.containerVariants}
              className="flex flex-wrap gap-3 md:gap-4 mb-8 lg:mb-0"
            >
              <motion.div
                variants={transitionVariants.itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 10 
                  }
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <CustomButton to="/registration" variant="accent" size="lg" className="group w-full sm:w-auto">
                   Register Now
                  <ChevronRight className="transition-transform group-hover:translate-x-1" size={16} />
                </CustomButton>
              </motion.div>
              
              <motion.div
                variants={transitionVariants.itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 10 
                  }
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <CustomButton 
                  to="/committees" 
                  variant="outline" 
                  size="lg" 
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 w-full sm:w-auto"
                >
                  Explore Committees
                </CustomButton>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="relative mt-0 mb-8 lg:mb-0 lg:mt-0 px-4 sm:px-0 order-1 lg:order-2"
            variants={transitionVariants.scaleVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              className="absolute top-5 left-0 w-32 h-32 border-t-2 border-l-2 border-gold-400/30 -translate-x-8 -translate-y-8 rounded-tl-3xl hidden sm:block"
              variants={transitionVariants.slideInUp}
            />
            <motion.div 
              className="absolute bottom-5 right-0 w-32 h-32 border-b-2 border-r-2 border-gold-400/30 translate-x-8 translate-y-8 rounded-br-3xl hidden sm:block"
              variants={transitionVariants.slideInDown}
            />
            
            <motion.div
              className="relative z-10 bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/10 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-diplomatic-800/50 to-diplomatic-900/50 rounded-xl"></div>
              <div className="absolute inset-0 bg-noise opacity-10 mix-blend-soft-light rounded-xl"></div>
              
              <div className="absolute -top-6 -left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-diplomatic-800 border-4 border-diplomatic-700 flex items-center justify-center">
                <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 animate-pulse"></div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-diplomatic-800 border-4 border-diplomatic-700 flex items-center justify-center">
                <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 animate-pulse"></div>
              </div>
              
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 w-2 h-16 bg-diplomatic-700 rounded-r-full hidden sm:block"></div>
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 w-2 h-16 bg-diplomatic-700 rounded-l-full hidden sm:block"></div>
              
              <div className="relative z-10 bg-diplomatic-800/80 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-white/5 shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 rounded-lg"></div>
                <div className="absolute inset-0 bg-noise opacity-10 mix-blend-soft-light rounded-lg"></div>
                
                <motion.div 
                  className="text-center mb-4 sm:mb-6 relative z-10"
                  variants={transitionVariants.fadeVariants}
                >
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-1 sm:mb-2">TIME LEFT TO APPLY</h2>
                  <p className="text-sm sm:text-base text-white/70">This is your moment. Don't miss it</p>
                </motion.div>
                
                <motion.div
                  variants={transitionVariants.fadeVariants}
                  className="relative z-10"
                >
                  <CountdownTimer targetDate={conferenceDate} />
                </motion.div>
                
                <motion.div
                  variants={transitionVariants.staggerContainerVariants}
                  className="mt-6 space-y-3 relative z-10"
                >
                  <motion.div 
                    variants={transitionVariants.staggerItemVariants}
                    className="flex items-center text-sm sm:text-base text-white"
                  >
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 mr-2.5" />
                    <span>July 18, 2025</span>
                  </motion.div>
                  
                  <motion.div 
                    variants={transitionVariants.staggerItemVariants}
                    className="flex items-center text-sm sm:text-base text-white"
                  >
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 mr-2.5" />
                    <span>9:00 AM - 4:00 PM</span>
                  </motion.div>
                  
                  <motion.div 
                    variants={transitionVariants.staggerItemVariants}
                    className="flex items-center text-sm sm:text-base text-white"
                  >
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 mr-2.5" />
                    <span>Fergana Presidential School, Uzbekistan</span>
                  </motion.div>
                  
                  <motion.div 
                    variants={transitionVariants.staggerItemVariants}
                    className="flex items-center text-sm sm:text-base text-white"
                  >
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 mr-2.5" />
                    <span>150+ Expected Delegates</span>
                  </motion.div>
                </motion.div>
              
                <motion.div 
                  className="mt-6 pt-6 border-t border-white/10 text-center relative z-10"
                  variants={transitionVariants.fadeVariants}
                >
                  <Link 
                    to="/schedule" 
                    className="text-gold-400 hover:text-gold-500 text-sm font-medium inline-flex items-center gap-1"
                  >
                    View Full Schedule
                    <ChevronRight size={14} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
