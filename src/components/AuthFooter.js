import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const AuthFooter = () => (
  <Box sx={{ backgroundColor: '#f0fdf4', px: 3, py: 2, mt: 6 }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" spacing={1}>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <InstagramIcon fontSize="small" sx={{ color: '#00796B' }} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          <LinkedInIcon fontSize="small" sx={{ color: '#00796B' }} />
        </a>
      </Stack>

      <Typography variant="body2" sx={{ color: '#555' }}>
        © 2025 Kiralink. All rights reserved.
      </Typography>
    </Stack>

    <Stack direction="row" spacing={2} mt={1}>
      <Typography variant="caption" sx={{ color: '#777' }}>Terms</Typography>
      <Typography variant="caption" sx={{ color: '#777' }}>Privacy</Typography>
    </Stack>
  </Box>
);

export default AuthFooter;
