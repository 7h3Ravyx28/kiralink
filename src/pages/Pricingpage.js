import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/CancelOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WaitlistSection from '../components/Waitlistsection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const kiralinkGreen = '#0B7C6B'
const planData = [
  {
    title: 'Free',
    price: '$0',
    subtitle: 'Free Forever',
    features: [
      { text: 'Track 3 Tenants', included: true },
      { text: 'Rent Reminder Emails', included: true },
      { text: 'Basic Dashboard Access', included: true },
      { text: 'Export as CSV', included: false },
      { text: 'Monthly Summary Reports', included: false },
    ],
    buttonText: 'Sign Up for Free',
    buttonColor: kiralinkGreen,
  },
  {
    title: 'Premium',
    price: '$2.5',
    subtitle: 'Per Month (1st Month Free)',
    badge: 'MOST POPULAR',
    features: [
      { text: 'Track Unlimited Tenants', included: true },
      { text: 'Rent Reminder Emails', included: true },
      { text: 'Full Dashboard Access', included: true },
      { text: 'Export as CSV', included: true },
      { text: 'Monthly Summary Reports', included: true },
    ],
    buttonText: 'Start Free Trial',
    buttonColor: kiralinkGreen,
  },
];

const PricingPage = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ fontFamily: 'Poppins', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
        
        <Box sx={{ textAlign: 'center', py: 10, px: 2 }}>
          <Button
            sx={{
              backgroundColor: '#e8f5e9',
              color: kiralinkGreen,
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 12,
              px: 2,
              py: 0.5,
              borderRadius: 20,
              fontFamily: 'Rajdhani',
            }}
          >
            Start for Free
          </Button>
          <Typography
            variant="h3"
            sx={{ fontWeight: 'bold', mt: 2, fontFamily: 'Rajdhani', color: '#2c3e50' }}
          >
            Simple Pricing, Starting at $0 for first month
          </Typography>
          <Typography variant="body1" sx={{ mt: 1.5, color: '#666' }}>
            Start using Kiralink 100% for free. Upgrade anytime as your rental portfolio grows.
          </Typography>
        </Box>

        
        <Grid container spacing={4} justifyContent="center" sx={{ px: 3, pb: 10 }}>
          {planData.map((plan, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.06)',
                  border: plan.title === 'Premium' ? `2px solid ${kiralinkGreen}` : 'none',
                }}
              >
                <CardContent>
                  {plan.badge && (
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: '#fff',
                        backgroundColor: kiralinkGreen,
                        px: 2,
                        py: 0.5,
                        borderRadius: 20,
                        display: 'inline-block',
                        fontWeight: 'bold',
                        mb: 1,
                        fontFamily: 'Rajdhani',
                      }}
                    >
                      {plan.badge}
                    </Typography>
                  )}
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 'bold', fontFamily: 'Rajdhani', mt: 1 }}
                  >
                    {plan.title}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 'bold', color: '#2c3e50', mt: 1 }}
                  >
                    {plan.price}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
                    {plan.subtitle}
                  </Typography>

                  <Divider sx={{ mb: 2 }} />

                  
                  {plan.features.map((feat, idx) => (
                    <Box
                      key={idx}
                      sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}
                    >
                      {feat.included ? (
                        <CheckIcon sx={{ color: kiralinkGreen, mr: 1 }} />
                      ) : (
                        <CloseIcon sx={{ color: '#ccc', mr: 1 }} />
                      )}
                      <Typography
                        sx={{
                          color: feat.included ? '#333' : '#aaa',
                          fontWeight: feat.included ? 500 : 400,
                        }}
                      >
                        {feat.text}
                      </Typography>
                    </Box>
                  ))}

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 3,
                      py: 1.5,
                      fontWeight: 'bold',
                      backgroundColor: plan.buttonColor,
                      fontFamily: 'Rajdhani',
                      '&:hover': {
                        backgroundColor: '#219653',
                      },
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        
        <Box sx={{ px: 3, pb: 10, maxWidth: 900, mx: 'auto' }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: 'Rajdhani',
              color: kiralinkGreen,
              textTransform: 'uppercase',
              fontWeight: 'bold',
              textAlign: 'center',
              letterSpacing: 1.2,
              mb: 1,
            }}
          >
            Here we have some
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Rajdhani',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#00332E',
              mb: 4,
            }}
          >
            Frequently Asked Questions
          </Typography>

          {[
            {
              question: 'Is Kiralink really free to use?',
              answer:
                'Yes! Our Free Plan lets you track up to 3 tenants with rent reminder emails and basic dashboard access. No credit card needed.',
            },
            {
              question: 'What happens after the free month on Premium?',
              answer:
                'You’ll be charged just $2.50/month to continue using unlimited features. You can cancel anytime — no contracts.',
            },
            {
              question: 'Can I switch between plans?',
              answer:
                'Absolutely. You can upgrade or downgrade your plan at any time in your account settings.',
            },
            {
              question: 'Do you support multi-property landlords?',
              answer:
                'Yes! Our Premium Plan is built to support landlords with multiple properties and tenants with ease.',
            },
          ].map((faq, i) => (
            <Box key={i} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HelpOutlineIcon sx={{ color: kiralinkGreen }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Rajdhani',
                    color: kiralinkGreen,
                  }}
                >
                  {faq.question}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{ mt: 0.5, color: '#444', fontFamily: 'Poppins' }}
              >
                {faq.answer}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <WaitlistSection />
      <Footer />
    </>
  );
};

export default PricingPage;
