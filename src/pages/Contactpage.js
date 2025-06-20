import React from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  return (
    <>
      <Navbar />

      <Box
        sx={{
          fontFamily: 'Poppins',
          px: { xs: 2, md: 10 },
          py: 10,
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontFamily: 'Rajdhani',
            fontWeight: 'bold',
            mb: 1,
            color: '#2C693E',
          }}
        >
          Get In Touch
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            maxWidth: 700,
            mx: 'auto',
            color: '#666',
            mb: 6,
          }}
        >
          Have questions or ideas? Drop us a message and we’ll respond quickly.
        </Typography>

        <Box
          sx={{
            maxWidth: '100%',
            mx: 'auto',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 5,
              borderRadius: 4,
              width: '95vw',
              maxWidth: '1400px',
              backgroundColor: '#fff',
            }}
          >
            <Grid container spacing={6}>
              {/* Contact Info */}
              <Grid item xs={12} md={4}>
                <Stack spacing={4}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <EmailIcon sx={{ color: '#2C693E' }} />
                    <Typography>Email: support@kiralink.com</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <LocationOnIcon sx={{ color: '#2C693E' }} />
                    <Typography>Location: Remote, Worldwide</Typography>
                  </Stack>
                </Stack>
              </Grid>

              
              <Grid item xs={12} md={8}>
                <form
                  action="https://formspree.io/f/YOUR_FORM_ID_HERE"
                  method="POST"
                >
                  <Stack spacing={4}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      required
                      InputProps={{
                        sx: {
                          fontSize: '1.15rem',
                          py: 2, 
                          px: 2,
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Your Email"
                      type="email"
                      name="email"
                      required
                      InputProps={{
                        sx: {
                          fontSize: '1.15rem',
                          py: 2,
                          px: 2,
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Your Message"
                      multiline
                      rows={6}
                      name="message"
                      required
                      InputProps={{
                        sx: {
                          fontSize: '1.15rem',
                          px: 2,
                          pt: 2,
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: '#2C693E',
                        fontWeight: 'bold',
                        fontFamily: 'Rajdhani',
                        fontSize: '1.1rem',
                        '&:hover': {
                          backgroundColor: '#24663F',
                        },
                        px: 5,
                        py: 1.5,
                        borderRadius: 2,
                        alignSelf: 'flex-start',
                      }}
                    >
                      Send Message
                    </Button>
                  </Stack>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default ContactPage;
