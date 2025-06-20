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
import loginbg from '../assets/background.jpg';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ open: false, severity: 'success', message: '' });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const correctEmail = 'opitechteam@gmail.com';  //untill we design backend
    const correctPassword = 'opitech@1234@turkey';

    if (form.email === correctEmail && form.password === correctPassword) {
      localStorage.setItem('token', 'dummy-token'); 
      localStorage.setItem(
        'kiralinkUser',
        JSON.stringify({ username: 'Opitech Team', email: correctEmail })
      );

      setToast({ open: true, severity: 'success', message: `Welcome back, Opitech Team!` });

      setTimeout(() => navigate('/dashboard'), 1000);
    } else {
      setToast({ open: true, severity: 'error', message: 'Invalid email or password' });
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
          backgroundImage: `url(${loginbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          px: 2,
          py: 4,
        }}
      >
        
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
          <Typography variant={isMobile ? 'h4' : 'h3'} sx={{ fontFamily: 'Rajdhani', fontWeight: 'bold', letterSpacing: 1 }}>
            <Box component="span" sx={{ color: '#00796B' }}>KIRA</Box>
            <Box component="span" sx={{ color: '#000000' }}>LINK</Box>
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ mt: 1, color: '#000000', fontFamily: 'Rajdhani', fontWeight: 500, letterSpacing: 1 }}
          >
            TAM VAKTINDE, TAM HUZUR
          </Typography>
        </Box>

        
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
          <Paper elevation={4} sx={{ p: 4, width: '100%', maxWidth: 420 }}>
            <Typography variant="h4" sx={{ fontFamily: 'Rajdhani', mb: 3, color: '#00796B', fontWeight: 'bold', textAlign: 'center' }}>
              Log In to Kiralink
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={form.email}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={form.password}
                onChange={handleChange}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, backgroundColor: '#00796B', fontWeight: 'bold', fontFamily: 'Rajdhani' }}>
                Log In
              </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', fontFamily: 'Poppins' }}>
              Don’t have an account?{' '}
              <Link href="/signup" underline="hover" sx={{ color: '#00796B', fontWeight: 'bold' }}>Sign Up</Link>
            </Typography>
          </Paper>
        </Box>
      </Box>

      <AuthFooter />
    </>
  );
};

export default Login;
