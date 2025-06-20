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
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const AddProperty = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    location: '',
    description: '',
    units: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ Save to backend or local storage here
    console.log('New property:', form);
    navigate('/dashboard/properties'); // back to properties list
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* ✅ Title */}
      <Typography variant="h4" sx={{ mb: 2, fontFamily: 'Rajdhani', fontWeight: 'bold' }} color="#00796B">
        Add New Property
      </Typography>

      {/* ✅ Form */}
      <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Property Name"
              name="name"
              fullWidth
              value={form.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Location"
              name="location"
              fullWidth
              value={form.location}
              onChange={handleChange}
              required
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              minRows={3}
              value={form.description}
              onChange={handleChange}
            />
            <TextField
              label="Number of Units/Tenants"
              name="units"
              fullWidth
              type="number"
              value={form.units}
              onChange={handleChange}
              required
            />

            {/* ✅ Buttons */}
            <Stack direction="row" spacing={2} mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ borderRadius: 2 }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                component={Link}
                to="/dashboard/properties"
                sx={{ borderRadius: 2 }}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
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
        {/* Left: Social */}
        <Stack direction="row" spacing={1}>
          <IconButton href="#"><Facebook fontSize="small" /></IconButton>
          <IconButton href="#"><Twitter fontSize="small" /></IconButton>
          <IconButton href="#"><Instagram fontSize="small" /></IconButton>
        </Stack>
        {/* Right: Rights */}
        <Typography variant="caption">&copy; {new Date().getFullYear()} All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default AddProperty;
