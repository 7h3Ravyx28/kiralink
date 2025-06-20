import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const ToastAlert = ({ open, onClose, severity = 'success', message }) => {
  
  const customStyle = {
    success: {
      backgroundColor: '#00796B',
      color: '#ffffff',
      fontWeight: 'bold',
      fontFamily: 'Rajdhani',
    },
    error: {
      backgroundColor: '#C62828',
      color: '#ffffff',
      fontWeight: 'bold',
      fontFamily: 'Rajdhani',
    },
    info: {
      backgroundColor: '#0288D1',
      color: '#ffffff',
      fontWeight: 'bold',
      fontFamily: 'Rajdhani',
    },
    warning: {
      backgroundColor: '#F9A825',
      color: '#000000',
      fontWeight: 'bold',
      fontFamily: 'Rajdhani',
    },
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: '100%',
          ...customStyle[severity],
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastAlert;
