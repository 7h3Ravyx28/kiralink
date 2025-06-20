import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { styled } from '@mui/system';
import JoinWaitlistModal from '../components/JoinWaitlist'; // adjust path if needed

// Wrapper styling
const SectionWrapper = styled(Box)(() => ({
  backgroundColor: '#00B7A2',
  color: '#ffffff',
  padding: '5rem 1rem',
  textAlign: 'center',
  fontFamily: 'Rajdhani, sans-serif',
}));

const WaitlistSection = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <SectionWrapper>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Be First to Try Kiralink
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 4, fontFamily: 'Rajdhani' }}>
        Join our waitlist to get early access and updates!
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}
          sx={{
            backgroundColor: '#00332E',
            color: '#ffffff',
            px: 4,
            py: 1.5,
            borderRadius: 10,
            fontWeight: 600,
            fontSize: '1rem',
            fontFamily: 'Rajdhani',
            '&:hover': {
              backgroundColor: '#002721',
            },
          }}
        >
          Join Waitlist
        </Button>
      </Stack>

      {/* 🔥 Popup Modal */}
      <JoinWaitlistModal open={openModal} onClose={() => setOpenModal(false)} />
    </SectionWrapper>
  );
};

export default WaitlistSection;
