import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  IconButton,
} from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const ReminderHistory = () => {
  
  const reminders = [
    {
      id: 1,
      tenant: 'Alice Smith',
      email: 'alice@example.com',
      property: 'Seaside Villa',
      dueDate: '2025-06-25',
      status: 'Sent',
      sentAt: '2025-06-24 10:32 AM',
    },
    {
      id: 2,
      tenant: 'John Doe',
      email: 'john@example.com',
      property: 'Downtown Apartment',
      dueDate: '2025-06-28',
      status: 'Pending',
      sentAt: '--',
    },
    {
      id: 3,
      tenant: 'Maria Garcia',
      email: 'maria@example.com',
      property: 'Mountain Cabin',
      dueDate: '2025-07-01',
      status: 'Sent',
      sentAt: '2025-06-30 08:14 AM',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      
      <Typography
        variant="h4"
        sx={{ mb: 2, color: '#00796B', fontWeight: 'bold', fontFamily: 'Rajdhani' }}
      >
        Reminder History
      </Typography>

      
      <Paper sx={{ mb: 4, overflowX: 'auto' }} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E0F2F1' }}>
              <TableCell>Tenant</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Property</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Sent At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reminders.map((r) => (
              <TableRow key={r.id} hover>
                <TableCell>{r.tenant}</TableCell>
                <TableCell>{r.email}</TableCell>
                <TableCell>{r.property}</TableCell>
                <TableCell>{r.dueDate}</TableCell>
                <TableCell
                  sx={{
                    color: r.status === 'Sent' ? 'green' : 'orange',
                    fontWeight: 'bold',
                  }}
                >
                  {r.status}
                </TableCell>
                <TableCell>{r.sentAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      
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
        <Typography variant="caption">&copy; {new Date().getFullYear()} All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default ReminderHistory;
