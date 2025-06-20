import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00796B', // Teal green
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#00332E',
    },
  },
  typography: {
    fontFamily: 'Rajdhani, sans-serif',
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h5: {
      fontWeight: 400,
      fontSize: '1.25rem',
    },
  },
});

export default theme;
