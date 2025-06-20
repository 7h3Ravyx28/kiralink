
import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PromoSection from '../components/PromoSection';
import FeatureTeaserSection from '../components/FeatureTeaserSection';
import HowItWorksSection from '../components/HowItWorks';
import TestimonialsSection from '../components/Testimonials';
import WaitlistSection from '../components/Waitlistsection';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <Box sx={{ fontFamily: 'Rajdhani, sans-serif' }}>
      <Navbar />
      <HeroSection />
      <PromoSection />
      <FeatureTeaserSection /> 
      <HowItWorksSection />
      <TestimonialsSection />
      <WaitlistSection />
      <Footer />
    </Box>
  );
};

export default LandingPage;
