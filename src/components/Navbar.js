import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Stack, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assets/kiralogo.jpg';
import { Link as RouterLink } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#ffffff',
  color: '#00332E',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
});

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = (open) => () => setMobileOpen(open);

  const menuItems = [
    { title: 'Home', link: '/' },
    { title: 'Features', link: '/features' },
    { title: 'Pricing', link: '/pricing' },
    { title: 'Contact', link: '/contact' },
    { title: 'Login', link: '/login' },
    { title: 'Sign Up', link: '/signup' },
  ];

  return (
    <>
      <StyledAppBar>
        <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
          {/* Left: Logo */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              component="img"
              src={Logo}
              alt="Kiralink Logo"
              sx={{ width: 60, height: 60, borderRadius: '50%' }}
            />
            <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Rajdhani, sans-serif' }}>
              <Box component="span" sx={{ color: '#00796B' }}>KIRA</Box>
              <Box component="span" sx={{ color: '#000000' }}>LINK</Box>
            </Typography>
          </Stack>

          {/* Desktop menu */}
          {!isMobile && (
            <>
              <Stack direction="row" spacing={3}>
                {menuItems.slice(0, 4).map((item) => (
                  <Button color="inherit" component={RouterLink} to={item.link} key={item.title}>
                    {item.title}
                  </Button>
                ))}
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button color="primary" component={RouterLink} to="/login">Login</Button>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/signup"
                  sx={{ borderRadius: 20, px: 3 }}
                >
                  Sign Up
                </Button>
              </Stack>
            </>
          )}

          {/* Mobile menu icon */}
          {isMobile && (
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </StyledAppBar>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer(false)}>
  <Box
    sx={{
      width: 250,
      p: 2,
      backgroundColor: 'rgba(21, 87, 47, 0.71)',
      height: '100%',
      backdropFilter: 'blur(8px)',
    }}
  >
    <Stack direction="column" spacing={1} divider={<Divider flexItem />}>
      {menuItems.map((item) => (
        <ListItem disablePadding key={item.title}>
          <ListItemButton
            component={RouterLink}
            to={item.link}
            onClick={toggleDrawer(false)}
            sx={{
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#ffffff',
              },
              '&:hover .MuiListItemText-primary': {
                color: '#00796B',
                fontWeight: 600,
              },
            }}
          >
            <ListItemText
              primary={item.title}
              primaryTypographyProps={{ color: '#00332E', fontWeight: 500 }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </Stack>
  </Box>
</Drawer>

    </>
  );
};

export default Navbar;
