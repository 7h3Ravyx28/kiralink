import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormControlLabel,
  Switch,
  Stack,
  IconButton,
} from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    username: 'Opitech Team',
    email: 'email-opitechteam@gmail.com',
    notifications: true,
  });

  const handleChange = (e) => {
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleToggle = (e) => {
    setSettings((prev) => ({ ...prev, notifications: e.target.checked }));
  };
  const handleSave = () => {
    console.log('💾 Saved settings:', settings);
    // Implement save API call here
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Title */}
      <Typography
        variant="h4"
        sx={{ mb: 3, color: '#00796B', fontWeight: 'bold', fontFamily: 'Rajdhani' }}
      >
        Settings
      </Typography>

      {/* Form */}
      <Paper sx={{ p: 4, maxWidth: 500 }} elevation={2}>
        <Stack spacing={2}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            name="username"
            value={settings.username}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={settings.email}
            onChange={handleChange}
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.notifications}
                onChange={handleToggle}
                color="primary"
              />
            }
            label="Enable Email Notifications"
          />

          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: '#00796B', borderRadius: 2 }}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Stack>
      </Paper>

      {/* Footer */}
      <Box
        sx={{
          mt: 4,
          p: 2,
          borderTop: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack direction="row" spacing={1}>
          <IconButton href="#"><Facebook fontSize="small" /></IconButton>
          <IconButton href="#"><Twitter fontSize="small" /></IconButton>
          <IconButton href="#"><Instagram fontSize="small" /></IconButton>
        </Stack>
        <Typography variant="caption">&copy; {new Date().getFullYear()} All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default SettingsPage;
