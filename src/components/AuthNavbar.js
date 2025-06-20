import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/kiralogo.png';

const AuthNavbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#ffffff',
        boxShadow: 'none',
        py: 1,
        px: 2,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: Back to Home */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button
            variant="text"
            size="small"
            sx={{
              color: '#00796B',
              fontWeight: 'bold',
              fontFamily: 'Rajdhani',
              textTransform: 'none',
            }}
          >
            ⬅ Back to Home
          </Button>
        </Link>

        {/* Right: Logo + Text */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Box
            component="img"
            src={logo}
            alt="Kiralink Logo"
            sx={{
              height: 40,
              width: 40,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #00796B',
            }}
          />
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Rajdhani',
                fontWeight: 'bold',
                color: '#00796B',
                lineHeight: 1.2,
              }}
            >
              KIRA
              <Box
                component="span"
                sx={{ color: '#000000', fontWeight: 'bold' }}
              >
                LINK
              </Box>
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontFamily: 'Rajdhani', color: '#555', mt: -1 }}
            >
              Smart Rent Reminder
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AuthNavbar;
