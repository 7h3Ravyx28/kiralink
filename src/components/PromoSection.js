import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';


const PromoSection = () => {
  return (
    <Box
      sx={{
        bgcolor: 'transparent',
        px: 3,
        py: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(90deg, #00B7A2 0%, #1FC59B 100%)', // Kiralink green tones
      }}
    >
      <Box sx={{ maxWidth: 800, textAlign: 'center', color: '#fff' }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Building a rental management tool?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem' }}>
          Use Kiralink to track tenant payments, get reminders out automatically,
          and stay chill with real-time rent insights.
        </Typography>
        <Button
  component={Link}
  to="/pricing"
  variant="contained"
  sx={{
    backgroundColor: '#fff',
    color: '#00B7A2',
    px: 4,
    py: 1,
    fontWeight: 600,
    borderRadius: '30px',
    fontFamily: 'Rajdhani',
    '&:hover': {
      backgroundColor: '#e0f2f1',
    },
  }}
>
  LEARN MORE
</Button>

      </Box>
    </Box>
  );
};

export default PromoSection;
