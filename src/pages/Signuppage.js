import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Link,
  useMediaQuery,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthNavbar from '../components/AuthNavbar';
import AuthFooter from '../components/AuthFooter';
import ToastAlert from '../components/toastalert';
import logo from '../assets/kiralogo.png';
import signupbg from '../assets/background.jpg';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      console.log('✅ Signup success:', res.data);

      // Save token and user to localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      setToast({
        open: true,
        severity: 'success',
        message: 'Signup successful! Redirecting...',
      });
      setTimeout(() => navigate('/dashboard'), 1500);  // Redirect to dashboard directly
    } catch (err) {
      console.error('❌ Signup error:', err.response?.data || err.message);
      setToast({
        open: true,
        severity: 'error',
        message: err.response?.data?.msg || 'Signup failed',
      });
    }
  };

  return (
    <>
      <AuthNavbar />

      <ToastAlert
        open={toast.open}
        onClose={() => setToast({ ...toast, open: false })}
        severity={toast.severity}
        message={toast.message}
      />

      <Box
        sx={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          backgroundImage: `url(${signupbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          px: 2,
          py: 4,
        }}
      >
        {/* Left Side - Branding */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            textAlign: 'center',
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Kiralink Logo"
            sx={{
              width: isMobile ? 100 : 180,
              height: isMobile ? 100 : 180,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid #ffffff',
              mb: 2,
            }}
          />

          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            sx={{
              fontFamily: 'Rajdhani',
              fontWeight: 'bold',
              letterSpacing: 1,
            }}
          >
            <Box component="span" sx={{ color: '#00796B' }}>KIRA</Box>
            <Box component="span" sx={{ color: '#000000' }}>LINK</Box>
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              mt: 1,
              color: '#000000',
              fontFamily: 'Rajdhani',
              fontWeight: 500,
              letterSpacing: 1,
            }}
          >
            TAM VAKTINDE, TAM HUZUR
          </Typography>
        </Box>

        {/* Right Side - Signup Form */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Paper elevation={4} sx={{ p: 4, width: '100%', maxWidth: 420 }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Rajdhani',
                mb: 3,
                color: '#00796B',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Create Your Account
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                name="name"
                fullWidth
                value={form.name}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                label="Username"
                name="username"
                fullWidth
                value={form.username}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={form.email}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={form.password}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: '#00796B',
                  fontWeight: 'bold',
                  fontFamily: 'Rajdhani',
                }}
              >
                Sign Up
              </Button>
            </form>

            <Typography
              variant="body2"
              sx={{ mt: 2, textAlign: 'center', fontFamily: 'Poppins' }}
            >
              Already have an account?{' '}
              <Link
                href="/login"
                underline="hover"
                sx={{ color: '#00796B', fontWeight: 'bold' }}
              >
                Log In
              </Link>
            </Typography>
          </Paper>
        </Box>
      </Box>

      <AuthFooter />
    </>
  );
};

export default Signup;
