import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import {
  AttachMoney,
  Email,
  Person,
  Assessment,
  Dashboard,
} from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

// 🔹 Features Data
const features = [
  {
    title: 'Track Rent Payments',
    description: 'Stay updated on who paid and who hasn’t in real time.',
    icon: <AttachMoney sx={{ fontSize: 40, color: '#ffffff' }} />,
  },
  {
    title: 'Auto Email Reminders',
    description: 'Send timely reminders to tenants for due rent.',
    icon: <Email sx={{ fontSize: 40, color: '#ffffff' }} />,
  },
  {
    title: 'Tenant Profiles',
    description: 'Manage tenant info, lease terms, and notes easily.',
    icon: <Person sx={{ fontSize: 40, color: '#ffffff' }} />,
  },
  {
    title: 'Monthly Reports',
    description: 'Get quick reports on rent status each month.',
    icon: <Assessment sx={{ fontSize: 40, color: '#ffffff' }} />,
  },
  {
    title: 'Simple UI',
    description: 'Minimal UI made for landlords who hate clutter.',
    icon: <Dashboard sx={{ fontSize: 40, color: '#ffffff' }} />,
  },
];

const FeaturesPage = () => {
  return (
    <>
      <Navbar />

      {/* 🔹 Feature Cards Section */}
      <Box sx={{ py: 8, backgroundColor: '#f5f5f5', fontFamily: 'Rajdhani, sans-serif' }}>
        <Container>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#00332E' }}>
            Features
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 6, color: '#666' }}>
            Everything you need to manage rent without the headache
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    height: '180px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    p: 3,
                    borderRadius: '16px',
                    backgroundColor: '#00796B',
                    color: '#fff',
                    textAlign: 'left',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    {feature.icon}
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 🔹 Rent Trends Section */}
      <Box sx={{ py: 8, backgroundColor: '#ffffff' }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" sx={{ color: '#00796B' }}>
                Nationwide Rental Data
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#00332E', mb: 2 }}>
                View rental trends for any zip code.
              </Typography>
              <Typography variant="body1" sx={{ color: '#666666', mb: 3 }}>
                Analyze rental property markets and find new investment opportunities with detailed market reports and trends.
              </Typography>
              <Button
                       component={Link}
                  to="/signup"
                  variant="contained"
                  sx={{ backgroundColor: '#00796B', fontWeight: 'bold' }}
                >
                Start Free Trial
             </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {[
                  { title: 'Studio Rentals', price: '$957', change: '+18.1%' },
                  { title: '1 BD Rentals', price: '$1,261', change: '+9.4%' },
                  { title: '2 BD Rentals', price: '$1,419', change: '+12.2%' },
                  { title: '3 BD Rentals', price: '$2,271', change: '+6.6%' },
                  { title: '4 BD Rentals', price: '$2,495', change: '+5.3%' },
                  { title: '5 BD Rentals', price: '$2,600', change: '+4.8%' },
                ].map((trend, idx) => (
                  <Grid item xs={6} key={idx}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 2,
                        borderRadius: '12px',
                        backgroundColor: '#F1FDFD',
                        textAlign: 'left',
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ color: '#00796B', fontWeight: 'bold' }}>
                        {trend.title}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="h6">{trend.price} <span style={{ fontSize: '0.8rem' }}>/mo</span></Typography>
                        <Typography variant="body2" sx={{ color: 'green', fontWeight: 'bold' }}>
                          {trend.change}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      
{/* 🔹 Rent Portfolio Confidence Section */}
<Box sx={{ py: 10, backgroundColor: '#F8FFFE' }}>
  <Container>
    <Grid
      container
      spacing={4}
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
      }}
    >
      {/* 📸 Image Left */}
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          src="/assets/illustration.jpg"
          alt="Manage portfolio"
          sx={{
            width: '100%',
            maxWidth: 500,
            mx: 'auto',
            display: 'block',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(255, 255, 255, 1)',
          }}
        />
      </Grid>

      {/* 🧠 Text Right */}
      <Grid item xs={12} md={6}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: '#00332E',
            fontFamily: 'Rajdhani, sans-serif',
          }}
        >
          Manage your rental property <br />
          portfolio with confidence.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 3,
            color: '#555',
            fontSize: '18px',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Stay on top of local trends with <br/>instant access to rental CMA reports. 
          Get market updates, <br/>rent estimates, and recent listings <br/>delivered straight to your inbox.
        </Typography>

        <Button
  component={Link}
  to="/signup"
  variant="outlined"
  sx={{
    color: '#00796B',
    borderColor: '#00796B',
    px: 3,
    py: 1,
    fontWeight: 'bold',
    fontFamily: 'Rajdhani',
    '&:hover': {
      backgroundColor: '#E0F2F1',
      borderColor: '#00796B',
    },
  }}
>
  SET UP PORTFOLIO
</Button>
      </Grid>
    </Grid>
  </Container>
</Box>

{/* 🔹 Call-to-Action Hero Section */}
<Box
  sx={{
    py: 12,
    background: '#00796B',
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'Rajdhani, sans-serif',
  }}
>
  <Container maxWidth="md">
    <Typography
      variant="overline"
      sx={{
        backgroundColor: 'rgba(255,255,255,0.2)',
        px: 2,
        py: 0.5,
        borderRadius: '8px',
        fontWeight: 'bold',
        display: 'inline-block',
        mb: 2,
        letterSpacing: '1px',
      }}
    >
      Turkey Rental Data
    </Typography>

    <Typography
      variant="h4"
      component="h2"
      sx={{
        fontWeight: 800,
        mb: 2,
        fontSize: { xs: '2rem', md: '2.5rem' },
        color: '#fff',
        fontFamily: 'Rajdhani, sans-serif',
      }}
    >
      Grow your rental portfolio and <br /> maximize your cash flow.
    </Typography>

    <Typography
      variant="body1"
      sx={{
        color: '#E0F7FA',
        mb: 4,
        fontSize: '18px',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      Look up rent prices and comps for any property in the Turkey and track your <br />
      rental portfolio with real-time alerts and market updates.
    </Typography>

    <Button
  component={Link}
  to="/signup"
  variant="contained"
  sx={{
    backgroundColor: '#ffffff',
    color: '#00796B',
    fontWeight: 'bold',
    px: 4,
    py: 1.5,
    borderRadius: '30px',
    fontFamily: 'Rajdhani',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  }}
>
  GET STARTED FREE
</Button>
  </Container>
</Box>




      <Footer />
    </>
  );
};

export default FeaturesPage;
