import React, { useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';

import LandingPage from './pages/Landingpage';
import FeaturesPage from './pages/Featurespage';
import PricingPage from './pages/Pricingpage';
import ContactPage from './pages/Contactpage';
import Signup from './pages/Signuppage';
import Login from './pages/Loginpage';

import ScrollToTop from './components/Scrolltotop';
import ProtectedRoute from './components/Protectedroute';
import DashboardLayout from './components/Dashboardlayout';

import DashboardHome from './pages/Dashboard/Dashboardhome';
import PropertiesPage from './pages/Dashboard/Propertiespage';
import AddProperties from './pages/Dashboard/AddProperties'; 
import Tenants from './pages/Dashboard/Tenants';
import AddTenants from './pages/Dashboard/AddTenants';
import CalenderPage from './pages/Dashboard/CalenderPage';
import ReminderHistory from './pages/Dashboard/ReminderHistory';
import SettingsPage from './pages/Dashboard/SettingsPage';
import LogouttPage from './pages/Dashboard/LogouttPage';

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out',
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        <Routes>
          
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          

          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="properties" element={<PropertiesPage />} />
             <Route path="add-property" element={<AddProperties />} />
             <Route path="tenants" element={<Tenants />} />
             <Route path="add-tenant" element={<AddTenants />} />
             <Route path="calendar" element={<CalenderPage />} />
             <Route path="history" element={<ReminderHistory />} />
             <Route path="settings" element={<SettingsPage />} />
             <Route path="logout" element={<LogouttPage />} />
            
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
