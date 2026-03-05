import React, { memo, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

interface NavbarDesktopProps {
  scrolled: boolean;
  isHomePage: boolean;
  navLinks: any[];
}

// Memoize the dropdown item to prevent unnecessary re-renders
const DropdownItem = memo(({ 
  item, 
  location, 
  onClick 
}: { 
  item: any, 
  location: any, 
  onClick?: (path: string) => void 
}) => {
  // Check if the current path matches this item's path
  const isActive = (() => {
    // For season pages
    if (item.path.startsWith('/seasons/')) {
      return location.pathname === item.path;
    }
    return location.pathname === item.path;
  })();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent immediate navigation
    if (onClick) {
      onClick(item.path);
    }
  };

  return (
    <li key={item.name}>
      <a 
        href={item.path}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-diplomatic-50",
          isActive 
            ? "bg-diplomatic-50 text-diplomatic-700 font-medium" 
            : "text-neutral-700"
        )}
        onClick={handleClick}
      >
        <div className="text-sm font-medium">{item.name}</div>
        <div className="line-clamp-2 text-xs text-neutral-500">
          {item.name.includes("Season 1") ? "Global Health Emergencies" : 
           item.name.includes("Season 2") ? "Climate Action & Development" : 
           "Digital Transformation & Governance"}
        </div>
      </a>
    </li>
  );
});

DropdownItem.displayName = 'DropdownItem';

const NavbarDesktop: React.FC<NavbarDesktopProps> = ({ scrolled, isHomePage, navLinks }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  // Handle delayed navigation with transition
  const handleNavigation = useCallback((path: string) => {
    if (isNavigating) return; // Prevent multiple clicks
    
    setIsNavigating(true);
    
    // Add a small delay before navigation to allow for transition
    setTimeout(() => {
      navigate(path);
      setIsNavigating(false);
    }, 300); // Increased delay for smoother transition
  }, [navigate, isNavigating]);

  return (
    <div className="hidden md:flex md:items-center md:space-x-6">
      {navLinks.map((link) => {
        // Handle dropdown navigation items
        if (link.hasDropdown && link.dropdownItems) {
          return (
            <NavigationMenu key={link.name} className="z-50">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`nav-link text-sm font-medium px-3 rounded-md transition-colors ${
                      location.pathname === link.path || location.pathname.startsWith(link.path) || location.pathname.startsWith('/seasons/')
                        ? scrolled 
                          ? 'text-white font-semibold bg-diplomatic-800' 
                          : isHomePage
                            ? 'text-gold-400 font-semibold bg-white/10'
                            : 'text-gold-400 font-semibold bg-diplomatic-700' 
                        : scrolled 
                          ? 'text-white hover:text-gold-400 hover:bg-diplomatic-800' 
                          : isHomePage
                            ? 'text-white/90 hover:text-white hover:bg-white/10'
                            : 'text-white/90 hover:text-white hover:bg-diplomatic-700/80'
                    }`}
                    style={{ 
                      backgroundColor: 'transparent',
                      border: 'none',
                      boxShadow: 'none'
                    }}
                  >
                    {link.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="shadow-gold">
                    <ul className="grid w-[240px] gap-1 p-2 bg-white">
                      {link.dropdownItems.map((item: any) => (
                        <DropdownItem 
                          key={item.name} 
                          item={item} 
                          location={location}
                          onClick={handleNavigation}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          );
        }
        
        // Regular navigation links (non-dropdown)
        return (
          <div key={link.name} className="relative group">
            <Link 
              to={link.path} 
              className={`nav-link text-sm font-medium block py-2 px-3 rounded-md transition-colors ${
                location.pathname === link.path || 
                (link.path === '/resources' && location.pathname.startsWith('/resources'))
                  ? scrolled 
                    ? 'text-white font-semibold bg-diplomatic-800' 
                    : isHomePage
                      ? 'text-gold-400 font-semibold bg-white/10'
                      : 'text-gold-400 font-semibold bg-diplomatic-700' 
                  : scrolled 
                    ? 'text-white hover:text-gold-400 hover:bg-diplomatic-800' 
                    : isHomePage
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : 'text-white/90 hover:text-white hover:bg-diplomatic-700/80'
              }`}
            >
              {link.name}
            </Link>
          </div>
        );
      })}
      
      {/* Register Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link 
          to="/registration" 
          className="bg-gold-400 hover:bg-gold-400/90 text-diplomatic-900 font-medium py-2 px-4 rounded-md transition-all duration-300 flex items-center gap-2 shadow-gold"
        >
          <Globe size={16} />
          <span>Register</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default memo(NavbarDesktop);
