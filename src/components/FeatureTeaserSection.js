import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const features = [
  {
    title: 'Automatic Rent Reminders',
    icon: <NotificationsActiveIcon sx={{ fontSize: 40, color: '#0D9B6E' }} />,
    desc: 'Tenants get notified automatically before rent is due.',
  },
  {
    title: 'Track Rent Status',
    icon: <CheckCircleOutlineIcon sx={{ fontSize: 40, color: '#0D9B6E' }} />,
    desc: 'Easily check who has paid and who hasn’t in one place.',
  },
  {
    title: 'Manage Tenants Easily',
    icon: <PeopleIcon sx={{ fontSize: 40, color: '#0D9B6E' }} />,
    desc: 'Add tenants, set due dates, and let Kiralink handle the rest.',
  },
  {
    title: 'Monthly Overview',
    icon: <CalendarTodayIcon sx={{ fontSize: 40, color: '#0D9B6E' }} />,
    desc: 'Stay on top of upcoming rents with a clean dashboard.',
  },
];

const FeatureBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: '16px',
  boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
  transition: 'transform 0.2s ease',
  fontFamily: 'Rajdhani, sans-serif',
  '&:hover': {
    transform: 'translateY(-6px)',
  },
}));

const FeatureSection = () => {
  return (
    <Box sx={{ px: 4, py: 8, backgroundColor: '#f7fdfc' }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 6,
          fontWeight: 700,
          fontFamily: 'Rajdhani, sans-serif',
          color: '#00332E',
        }}
      >
        Powerful Features to Make Renting Easy
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <FeatureBox>
              <Box mb={2}>{feature.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#444' }}>
                {feature.desc}
              </Typography>
            </FeatureBox>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeatureSection;
