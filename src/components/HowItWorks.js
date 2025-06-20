import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PaymentIcon from '@mui/icons-material/Payment';
import EmailIcon from '@mui/icons-material/Email';

const steps = [
  {
    title: 'Add Your Tenants',
    icon: <PersonAddIcon sx={{ fontSize: 40, color: '#ffffff' }} />,
    desc: 'Create a profile for each tenant with rent amount and due date.',
  },
  {
    title: 'Track Payments',
    icon: <PaymentIcon sx={{ fontSize: 40, color: '#ffffff' }} />,
    desc: 'Mark when tenants pay and get real-time updates.',
  },
  {
    title: 'Send Auto Reminders',
    icon: <EmailIcon sx={{ fontSize: 40, color: '#ffffff' }} />,
    desc: 'Kiralink sends email reminders before and after due dates.',
  },
];

const StepBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: '16px',
  backgroundColor: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255,255,255,0.2)',
  color: '#fff',
  fontFamily: 'Rajdhani, sans-serif',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
  },
}));

const HowItWorksSection = () => {
  return (
    <Box
      sx={{
        px: 4,
        py: 10,
        background: 'linear-gradient(90deg, #00B7A2 0%, #1FC59B 100%)',
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 6,
          fontWeight: 700,
          fontFamily: 'Rajdhani, sans-serif',
          color: '#ffffff',
        }}
      >
        How Kiralink Works
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {steps.map((step, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <StepBox>
              <Box mb={2}>{step.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {step.title}
              </Typography>
              <Typography variant="body2">
                {step.desc}
              </Typography>
            </StepBox>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorksSection;
