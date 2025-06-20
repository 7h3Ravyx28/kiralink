
import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Dashboard,
  Home,
  Group,
  CalendarMonth,
  History,
  Settings,
  Logout,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/kiralogo.png';
import { useTheme, useMediaQuery } from '@mui/material';

const SidebarContent = ({ onClose }) => {
  const location = useLocation();

  
  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Properties', icon: <Home />, path: '/dashboard/properties' },
    { text: 'Tenants', icon: <Group />, path: '/dashboard/tenants' },
    { text: 'Calendar', icon: <CalendarMonth />, path: '/dashboard/calendar' },
    { text: 'Reminder History', icon: <History />, path: '/dashboard/history' },
    { text: 'Settings', icon: <Settings />, path: '/dashboard/settings' },
    { text: 'Logout', icon: <Logout />, path: '/logout' }, 
  ];

  return (
    <Box sx={{ width: 240, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Logo + Brand */}
      <Toolbar sx={{ flexDirection: 'column', alignItems: 'center', mt: 2 }}>
        <Box
          component="img"
          src={logo}
          alt="Kiralink Logo"
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #00796B',
          }}
        />
        <Typography variant="h6" sx={{ fontFamily: 'Rajdhani', fontWeight: 'bold', mt: 1 }}>
          <Box component="span" sx={{ color: '#00796B' }}>KIRA</Box>
          <Box component="span" sx={{ color: '#000' }}>LINK</Box>
        </Typography>
      </Toolbar>

      {/* Menu Links */}
      <List sx={{ width: '100%' }} onClick={onClose && onClose}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                backgroundColor: isActive ? '#E0F2F1' : 'transparent',
                '&:hover': { backgroundColor: '#B2DFDB' },
              }}
            >
              <ListItemIcon sx={{ color: '#00796B' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ color: '#00796B', fontWeight: isActive ? 'bold' : 'normal' }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {isMobile ? (
        <>
          {/* Hamburger Icon */}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: 'fixed',
              top: theme.spacing(2),
              left: theme.spacing(2),
              zIndex: 1300,
            }}
          >
            <MenuIcon sx={{ color: '#00796B' }} />
          </IconButton>

          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': {
                width: 240,
                backgroundColor: '#fff',
                color: '#00796B',
              },
            }}
          >
            <SidebarContent onClose={handleDrawerToggle} />
          </Drawer>
        </>
      ) : (
        // Desktop permanent sidebar
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            [`& .MuiDrawer-paper`]: {
              width: 240,
              boxSizing: 'border-box',
              backgroundColor: '#fff',
              color: '#00796B',
              borderRight: '1px solid #ddd',
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
