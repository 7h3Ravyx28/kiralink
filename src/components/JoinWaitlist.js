
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';

const JoinWaitlistModal = ({ open, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Waitlist Form:', form);
    setSubmitted(true);

    // TODO: Send to backend or external form
    setTimeout(() => {
      setForm({ name: '', email: '' });
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontFamily: 'Rajdhani', fontWeight: 'bold' }}>
        Join the Waitlist
      </DialogTitle>

      <DialogContent>
        {submitted ? (
          <Typography sx={{ fontFamily: 'Rajdhani', fontWeight: 'bold', color: '#00796B' }}>
            ✅ You’ve been added to the waitlist!
          </Typography>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              required
            />
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#00796B',
                  fontWeight: 'bold',
                  fontFamily: 'Rajdhani',
                }}
              >
                Submit
              </Button>
            </DialogActions>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JoinWaitlistModal;
