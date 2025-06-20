import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import { styled } from '@mui/system';

const testimonials = [
  {
    name: 'Mehmet K.',
    title: 'Landlord from Izmir',
    quote:
      'Kiralink makes rent collection so easy. I don’t even have to remind anyone anymore.',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
  {
    name: 'Ayla D.',
    title: 'Small Property Owner',
    quote:
      'The auto-reminder emails are a game changer. Clean, simple, and it just works.',
    avatar: 'https://i.pravatar.cc/150?img=45',
  },
  {
    name: 'Emre Y.',
    title: 'Apartment Manager',
    quote:
      'I used to manage everything with Excel. Kiralink saves me hours every month.',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    name: 'Mehmet K.',
    title: 'Landlord from Izmir',
    quote:
      'Kiralink makes rent collection so easy. I don’t even have to remind anyone anymore.',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
  {
    name: 'Ayla D.',
    title: 'Small Property Owner',
    quote:
      'The auto-reminder emails are a game changer. Clean, simple, and it just works.',
    avatar: 'https://i.pravatar.cc/150?img=45',
  },
  {
    name: 'Emre Y.',
    title: 'Apartment Manager',
    quote:
      'I used to manage everything with Excel. Kiralink saves me hours every month.',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
];

const TestimonialCard = styled(Paper)(({ theme }) => ({
  minWidth: 300,
  maxWidth: 300,
  height: '100%',
  marginRight: theme.spacing(4),
  scrollSnapAlign: 'center',
  padding: theme.spacing(4),
  borderRadius: '16px',
  backgroundColor: '#ffffff',
  boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  fontFamily: 'Rajdhani, sans-serif',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 12px 32px rgba(0, 183, 162, 0.3)',
  },
}));

const ScrollWrapper = styled(Box)(() => ({
  display: 'flex',
  overflowX: 'auto',
  scrollSnapType: 'x mandatory',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  paddingLeft: '1rem',
}));

const TestimonialsSection = () => {
  return (
    <Box sx={{ px: 2, py: 10, backgroundColor: '#f7fdfc' }}>
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
        What Our Users Say
      </Typography>

      <ScrollWrapper>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index}>
            <Avatar
              src={testimonial.avatar}
              alt={testimonial.name}
              sx={{ width: 64, height: 64, mx: 'auto', mb: 2 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center' }}>
              {testimonial.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2, textAlign: 'center' }}>
              {testimonial.title}
            </Typography>
            <Typography variant="body1" sx={{ color: '#444', textAlign: 'center' }}>
              “{testimonial.quote}”
            </Typography>
          </TestimonialCard>
        ))}
      </ScrollWrapper>
    </Box>
  );
};

export default TestimonialsSection;
