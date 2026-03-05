import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FloatingCta: React.FC = () => {
  return (
    <Link
      to="/register"
      className="floating-cta group"
    >
      <span className="text-sm font-semibold tracking-wide">Apply Now</span>
      <ArrowRight
        size={16}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
};

export default FloatingCta;
