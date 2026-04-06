import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import DashboardHome from "./pages/admin/DashboardHome";
import WebsiteSettings from "./pages/admin/WebsiteSettings";
import TeamManagement from "./pages/admin/TeamManagement";
import InquiryManagement from "./pages/admin/InquiryManagement";
import NewsroomManagement from "./pages/admin/NewsroomManagement";
import CareersManagement from "./pages/admin/CareersManagement";
import ApplicationsManagement from "./pages/admin/ApplicationsManagement";
import Newsroom from "./pages/Newsroom";
import NewsArticle from "./pages/NewsArticle";
import Careers from "./pages/Careers";
import JobDetail from "./pages/JobDetail";
import MedicalMobility from "./pages/MedicalMobility";
import CargoLogistics from "./pages/CargoLogistics";
import TourismMobility from "./pages/TourismMobility";
import GroundPort from "./pages/GroundPort";
import VertiportPage from "./pages/Vertiport";
import SkyPort from "./pages/SkyPort";
import HubNetwork from "./pages/HubNetwork";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/medical-mobility" element={<MedicalMobility />} />
            <Route path="/cargo-logistics" element={<CargoLogistics />} />
            <Route path="/tourism-mobility" element={<TourismMobility />} />
            <Route path="/ground-port" element={<GroundPort />} />
            <Route path="/vertiport" element={<VertiportPage />} />
            <Route path="/sky-port" element={<SkyPort />} />
            <Route path="/hub-network" element={<HubNetwork />} />
            <Route path="/newsroom" element={<Newsroom />} />
            <Route path="/newsroom/:id" element={<NewsArticle />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:id" element={<JobDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="settings" element={<WebsiteSettings />} />
              <Route path="team" element={<TeamManagement />} />
              <Route path="inquiries" element={<InquiryManagement />} />
              <Route path="newsroom" element={<NewsroomManagement />} />
              <Route path="careers" element={<CareersManagement />} />
              <Route path="applications" element={<ApplicationsManagement />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
