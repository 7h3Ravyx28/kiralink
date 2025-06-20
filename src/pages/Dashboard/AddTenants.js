import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  IconButton,
} from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AddTenant = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    property: '',
    dueDate: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // make an API call to save the tenant
    console.log('💾 Save tenant:', form);
    navigate('/dashboard/tenants'); // go back to tenant list after add
  };

  return (
    <Box sx={{ p: 3 }}>
      {/*  Page Title */}
      <Typography
        variant="h4"
        sx={{ mb: 2, color: '#00796B', fontWeight: 'bold', fontFamily: 'Rajdhani' }}
      >
        Add Tenant
      </Typography>

      {/* ✅ Form */}
      <Paper elevation={2} sx={{ p: 3, maxWidth: 500 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Tenant Name"
            name="name"
            fullWidth
            required
            value={form.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            value={form.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone Number"
            name="phone"
            fullWidth
            required
            value={form.phone}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Property Name"
            name="property"
            fullWidth
            required
            value={form.property}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Due Date"
            name="dueDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
            value={form.dueDate}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ borderRadius: 2, px: 4 }}
          >
            Save Tenant
          </Button>
        </form>
      </Paper>

      {/* ✅ Footer */}
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
        <Typography variant="caption">
          &copy; {new Date().getFullYear()} All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default AddTenant;
