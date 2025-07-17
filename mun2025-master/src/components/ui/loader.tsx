import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'diplomatic';
  className?: string;
  fullPage?: boolean;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  variant = 'diplomatic',
  className,
  fullPage = false,
  text
}) => {
  // Size mappings
  const sizeMap = {
    sm: { loader: 'w-5 h-10', container: 'py-2' },
    md: { loader: 'w-10 h-20', container: 'py-4' },
    lg: { loader: 'w-16 h-32', container: 'py-6' }
  };

  // Color variants
  const variantMap = {
    primary: { c1: '#000000', c2: '#3b69d4' },
    secondary: { c1: '#1a1a1a', c2: '#6b7280' },
    diplomatic: { c1: '#1a2a4a', c2: '#4a7bde' }
  };

  const { c1, c2 } = variantMap[variant];
  const { loader, container } = sizeMap[size];

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.2,
        duration: 0.4
      }
    }
  };

  const loaderContent = (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        container,
        fullPage ? "min-h-[80vh]" : "",
        className
      )}
    >
      <div 
        className={cn("loader", loader)}
        style={{ 
          '--c1': c1, 
          '--c2': c2 
        } as React.CSSProperties}
      />
      
      {text && (
        <motion.p 
          variants={textVariants}
          className="text-neutral-600 font-medium mt-2 text-center"
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );

  return loaderContent;
};

export { Loader };
