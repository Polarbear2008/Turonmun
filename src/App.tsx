import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useEffect, useState } from 'react';
import { SecretMessage, useSecretMessage } from "@/components/easter-egg/SecretMessage";
import { Sparkles } from 'lucide-react';

// Import animations
import '@/styles/animations.css';
import Index from "./pages/Index";
import About from "./pages/About";
import Committees from "./pages/Committees";
import Registration from "./pages/Registration";
import Schedule from "./pages/Schedule";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import PastConferences from "./pages/PastConferences";
import EventUpdates from "./pages/EventUpdates";
import Season1 from "./pages/seasons/Season1";
import Season2 from "./pages/seasons/Season2";
import Season3 from "./pages/seasons/Season3";
import Season4 from "./pages/seasons/Season4";
import Season5 from "./pages/seasons/Season5";
import SeasonCAMU from "./pages/seasons/SeasonCAMU";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordChange from "./pages/ResetPasswordChange";
import AuthCallback from "./pages/AuthCallback";
import RegistrationSelection from "./pages/RegistrationSelection";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCommittees from "./pages/admin/AdminCommittees";
import AdminSchedule from "./pages/admin/AdminSchedule";
import AdminResources from "./pages/admin/AdminResources";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminRoute from "./components/admin/AdminRoute";
import ImagePreloader from "./components/ImagePreloader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const { openMessage } = useSecretMessage();

  // Add keyboard event listener for question mark key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?' && (e.ctrlKey || e.metaKey)) {
        openMessage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openMessage]);

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo(0, 0);
    
    // Log page view for analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'YOUR_GA_MEASUREMENT_ID', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
};

const App = () => {
  const { isOpen, closeMessage } = useSecretMessage();
  
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <ImagePreloader />
            
            {/* Secret Message Easter Egg */}
            <SecretMessage isOpen={isOpen} onClose={closeMessage} />
            
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/event-updates" element={<EventUpdates />} />
              <Route path="/committees" element={<Committees />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/registration" element={<RegistrationSelection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/reset-password-change" element={<ResetPasswordChange />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/past-conferences" element={<PastConferences />} />
                            <Route path="/seasons/1" element={<Season1 />} />
              <Route path="/seasons/2" element={<Season2 />} />
              <Route path="/seasons/3" element={<Season3 />} />
              <Route path="/seasons/4" element={<Season4 />} />
              <Route path="/seasons/Season5" element={<Season5 />} />
              <Route path="/seasons/camu" element={<SeasonCAMU />} />
              
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/committees" element={<AdminRoute><AdminCommittees /></AdminRoute>} />
              <Route path="/admin/schedule" element={<AdminRoute><AdminSchedule /></AdminRoute>} />
              <Route path="/admin/resources" element={<AdminRoute><AdminResources /></AdminRoute>} />
              <Route path="/admin/applications" element={<AdminRoute><AdminApplications /></AdminRoute>} />
              <Route path="/admin/messages" element={<AdminRoute><AdminMessages /></AdminRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Sparkles className="fixed bottom-4 right-4 h-6 w-6 text-yellow-400 animate-pulse" />
            <Analytics />
            <SpeedInsights />
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
