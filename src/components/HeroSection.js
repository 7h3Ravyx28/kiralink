import React from 'react';
import { Box, Typography, Button, Stack, Chip } from '@mui/material';
import { Link } from 'react-router-dom';



const HeroSection = () => {
  return (
    <Box
      sx={{
        pt: 14,
        pb: 10,
        px: 3,
        textAlign: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Badge */}
      <Chip
        label="REAL-TIME RENT TRACKING"
        color="primary"
        variant="outlined"
        sx={{
          fontWeight: 600,
          mb: 2,
          backgroundColor: '#00796B',
          color: '#ffffff',  
        }}
      />

      {/* Headline */}
      <Typography
        variant="h3"
        component="h1"
        sx={{ fontWeight: 700, maxWidth: 800, mx: 'auto', mb: 3 }}
      >
        Track rents and manage your rental portfolio effortlessly.
      </Typography>

      {/* Subtext */}
      <Typography
        variant="body1"
        sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', mb: 5 }}
      >
        View rent prices and comps for any property in the Turkey
        and track your rental portfolio with real-time alerts and market updates.
      </Typography>

      {/* CTA Buttons */}
      <Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={2}
  justifyContent="center"
  alignItems="center"
  sx={{ mt: 4 }}
>
  <Button
    component={Link}
    to="/signup"
    variant="contained"
    size="large"
    sx={{
      backgroundColor: '#00796B',
      color: '#ffffff',
      fontWeight: 'bold',
      fontFamily: 'Rajdhani',
      '&:hover': {
        backgroundColor: '#00695c',
      },
    }}
  >
    Get Started Free
  </Button>

  <Button
    component={Link}
    to="/features"
    variant="outlined"
    size="large"
    sx={{
      color: '#00796B',
      borderColor: '#00796B',
      fontWeight: 'bold',
      fontFamily: 'Rajdhani',
      '&:hover': {
        backgroundColor: '#e0f2f1',
        borderColor: '#00796B',
      },
    }}
  >
    View Features
  </Button>
</Stack>
</Box>
  );
};

export default HeroSection;
