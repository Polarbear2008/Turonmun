import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterForm from './NewsletterForm';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-[#00235c] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter section */}
        <div className="relative z-10 -mt-28 mb-12 md:mb-16">
          <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-elegant">
            <div className="bg-gradient-to-r from-[#002870] to-[#003694] p-6 md:p-8 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-white mb-3 md:mb-4">Stay Updated</h3>
                  <p className="text-blue-100 mb-0 text-sm sm:text-base">
                    Get the latest news and updates about our upcoming conference.
                  </p>
                </div>
                <div>
                  <NewsletterForm variant="dark" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-diplomatic-800 flex items-center justify-center overflow-hidden">
                <img src="/lovable-uploads/58911c41-3ed8-4807-8789-5df7d2fff02c.png" alt="turonmun Logo" className="w-8 h-8 object-contain" />
              </div>
              <div className="font-display">
                <span className="font-bold text-white">FPS</span>
                <span className="text-white">MUN</span>
              </div>
            </div>
            <p className="text-neutral-300 mb-6 text-sm sm:text-base">
              Join us for an enriching diplomatic simulation that brings together students from around the world to discuss pressing global issues.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-300 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-blue-200 hover:text-white transition-colors inline-flex items-center">
                  <ArrowRight size={14} className="mr-2 opacity-70" /> Home
                </Link>
              </li>
              <li>
                <Link to="/committees" className="text-blue-200 hover:text-white transition-colors inline-flex items-center">
                  <ArrowRight size={14} className="mr-2 opacity-70" /> Committees
                </Link>
              </li>
              <li>
                <Link to="/registration" className="text-blue-200 hover:text-white transition-colors inline-flex items-center">
                  <ArrowRight size={14} className="mr-2 opacity-70" /> Registration
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="text-blue-200 hover:text-white transition-colors inline-flex items-center">
                  <ArrowRight size={14} className="mr-2 opacity-70" /> Schedule
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-blue-200 hover:text-white transition-colors inline-flex items-center">
                  <ArrowRight size={14} className="mr-2 opacity-70" /> Resources
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6 text-white">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="mr-3 shrink-0 mt-1 text-blue-300" size={18} />
                <span className="text-blue-200 text-sm sm:text-base">info@turonmun.org</span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-3 shrink-0 mt-1 text-blue-300" size={18} />
                <span className="text-blue-200 text-sm sm:text-base">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-3 shrink-0 mt-1 text-blue-300" size={18} />
                <span className="text-blue-200 text-sm sm:text-base">
                  TuronMUN Conference Center<br />
                  Fergana, Uzbekistan<br />
                </span>
              </li>
            </ul>
          </div>
          
          {/* Important Info */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6 text-white">Important Info</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">Sponsorship</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-blue-800/50 text-center text-blue-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p> {currentYear} TuronMUN. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Coded & created by <a href="https://t.me/samandar_vibe" target="_blank" rel="noopener" className="underline hover:text-white">Numonov Samandar</a> & Asadbek Abdukhalilov • 2025.</p>
          </div>
        </div>
      </div>
    </footer>;
}
