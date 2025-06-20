import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Home as HomeIcon,
  Group as GroupIcon,
  Build as BuildIcon,
  MonetizationOn as MoneyIcon,
  Facebook,
  Twitter,
  Instagram,
} from '@mui/icons-material';

const Dashboard = () => {
  // Dummy data
  const maintenanceRequests = [
    { tenant: 'Devansh', issue: 'Leaky faucet', date: '2025-06-19', status: 'Pending' },
    { tenant: 'Reacher', issue: 'AC not working', date: '2025-06-18', status: 'Completed' },
  ];
  const recentPayments = [
    { tenant: 'Reacher', amount: 500, status: 'Paid' },
    { tenant: 'Devansh', amount: 450, status: 'Due' },
  ];
  const tenantMessages = [
    { tenant: 'Reacher', message: 'I sent the payment', time: '2 hours ago' },
    { tenant: 'Devansh', message: 'Is the AC fixed yet?', time: '5 hours ago' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* ✅ Stats Boxes */}
      <Grid container spacing={2} mb={2}>
        {[
          { label: 'Properties', icon: <HomeIcon sx={{ fontSize: 32 }} />, value: 10 },
          { label: 'Tenants', icon: <GroupIcon sx={{ fontSize: 32 }} />, value: 25 },
          { label: 'Requests', icon: <BuildIcon sx={{ fontSize: 32 }} />, value: 4 },
          { label: 'Payments Due', icon: <MoneyIcon sx={{ fontSize: 32 }} />, value: '$1,200' },
        ].map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Paper
              elevation={2}
              sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}
            >
              {stat.icon}
              <Typography variant="h6" sx={{ mt: 1 }}>{stat.label}</Typography>
              <Typography variant="h4" sx={{ mt: 1 }}>{stat.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* ✅ View Maintenance Appointments Button */}
      <Box mb={3} textAlign="center">
        <Button variant="contained" color="primary" sx={{ borderRadius: 2, px: 4 }}>
          View Maintenance Appointments
        </Button>
      </Box>

      {/* ✅ Recent Maintenance Requests */}
      <Typography variant="h6" mb={1}>Recent Maintenance Requests</Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tenant Name</TableCell>
              <TableCell>Issue</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maintenanceRequests.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.tenant}</TableCell>
                <TableCell>{row.issue}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ✅ Recent Payments */}
      <Typography variant="h6" mb={1}>Recent Payments</Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tenant Name</TableCell>
              <TableCell>Amount ($)</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentPayments.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.tenant}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ✅ Tenant Messages */}
      <Typography variant="h6" mb={1}>Tenant Messages</Typography>
      <Box mb={3}>
        {tenantMessages.map((m, i) => (
          <Paper
            key={i}
            sx={{ p: 2, mb: 1, borderRadius: 2, display: 'flex', flexDirection: 'column' }}
          >
            <Typography variant="body1" fontWeight="bold">{m.tenant}</Typography>
            <Typography variant="body2">{m.message}</Typography>
            <Typography variant="caption" color="text.secondary">{m.time}</Typography>
          </Paper>
        ))}
      </Box>

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
        {/* Left: Social Icons */}
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

export default Dashboard;
