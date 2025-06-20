import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  Chip,
} from '@mui/material';

const rentalStats = [
  { label: 'Studio Rentals', price: '$957', change: '+18.1%' },
  { label: '1 BD Rentals', price: '$1,261', change: '+9.4%' },
  { label: '2 BD Rentals', price: '$1,419', change: '+12.2%' },
  { label: '3 BD Rentals', price: '$2,271', change: '+6.6%' },
  { label: '4 BD Rentals', price: '$2,495', change: '+5.3%' },
  { label: '5 BD Rentals', price: '$2,600', change: '+4.8%' },
];

const RentTrends = () => {
  return (
    <Box sx={{ py: 10, backgroundColor: '#f9f9f9', fontFamily: 'Rajdhani, sans-serif' }}>
      <Container>
        <Grid container spacing={6} alignItems="center">
          {/* Left Side Text */}
          <Grid item xs={12} md={6}>
            <Chip
              label="Rental Intelligence"
              sx={{
                backgroundColor: '#E0F2F1',
                color: '#004D40',
                fontWeight: 'bold',
                letterSpacing: 1,
                mb: 2,
              }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', mb: 2, color: '#00332E' }}
            >
              View rental trends for any location.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: '#555' }}>
              Analyze rental property stats, monitor market growth, and make smarter investment decisions with Kiralink’s smart market data.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#00796B',
                '&:hover': { backgroundColor: '#00695C' },
                fontWeight: 'bold',
              }}
            >
              Start Free Trial
            </Button>
          </Grid>

          {/* Right Side Grid */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {rentalStats.map((item, idx) => (
                <Grid item xs={6} key={idx}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      borderRadius: '16px',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      border: '1px solid #e0e0e0',
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', color: '#666' }}
                    >
                      {item.label.toUpperCase()}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {item.price} <Typography variant="body2" component="span">/mo</Typography>
                      </Typography>
                      <Chip
                        label={item.change}
                        size="small"
                        sx={{
                          backgroundColor: '#E0F2F1',
                          color: '#00796B',
                          fontWeight: 'bold',
                        }}
                      />
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RentTrends;
