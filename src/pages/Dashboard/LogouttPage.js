import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import ToastAlert from '../../components/toastalert';

const LogouttPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);           
  const [loading, setLoading] = useState(false);    
  const [toast, setToast] = useState({ open: false, severity: 'success', message: '' });

  const handleConfirm = () => {
    setLoading(true); 
    setTimeout(() => {
      
      localStorage.removeItem('token');
      localStorage.removeItem('kiralinkUser');

      setLoading(false);
      setToast({ open: true, severity: 'success', message: 'Logged out successfully!' });

      
      setTimeout(() => navigate('/login'), 1500);
    }, 1000); 
  };

  const handleCancel = () => {
    setOpen(false);
    navigate('/dashboard'); 
  };

  return (
    <>
      <Dialog open={open} onClose={handleCancel} maxWidth="xs" fullWidth>
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <DialogContentText>
              Are you sure you want to log out? You’ll need to log in again next time.
            </DialogContentText>
          )}
        </DialogContent>
        {!loading && (
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleConfirm} variant="contained" color="error" sx={{ borderRadius: 2 }}>
              Log out
            </Button>
          </DialogActions>
        )}
      </Dialog>

      <ToastAlert
        open={toast.open}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        severity={toast.severity}
        message={toast.message}
      />
    </>
  );
};

export default LogouttPage;
