import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ImagePreloader />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/event-updates" element={<EventUpdates />} />
            <Route path="/committees" element={<Committees />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/past-conferences" element={<PastConferences />} />
                        <Route path="/seasons/1" element={<Season1 />} />
            <Route path="/seasons/2" element={<Season2 />} />
            <Route path="/seasons/3" element={<Season3 />} />
            
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/committees" element={<AdminRoute><AdminCommittees /></AdminRoute>} />
            <Route path="/admin/schedule" element={<AdminRoute><AdminSchedule /></AdminRoute>} />
            <Route path="/admin/resources" element={<AdminRoute><AdminResources /></AdminRoute>} />
            <Route path="/admin/applications" element={<AdminRoute><AdminApplications /></AdminRoute>} />
            <Route path="/admin/messages" element={<AdminRoute><AdminMessages /></AdminRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
