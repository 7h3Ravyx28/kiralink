import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Paper,
  Stack,
  IconButton,
  Button,
} from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Tenants = () => {
  const [tenants, setTenants] = useState([
    {
      id: 1,
      name: 'Alice Smith',
      email: 'alice@example.com',
      property: 'Seaside Villa',
      dueDate: '2025-06-25',
      paid: false,
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john@example.com',
      property: 'Downtown Apartment',
      dueDate: '2025-06-28',
      paid: true,
    },
    {
      id: 3,
      name: 'Maria Garcia',
      email: 'maria@example.com',
      property: 'Mountain Cabin',
      dueDate: '2025-07-01',
      paid: false,
    },
  ]);

  const handleTogglePaid = (id) => {
    setTenants((prev) =>
      prev.map((tenant) =>
        tenant.id === id ? { ...tenant, paid: !tenant.paid } : tenant
      )
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {/*  Header with Title and Add Tenant Button */}
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: '#00796B', fontWeight: 'bold', fontFamily: 'Rajdhani' }}
        >
          Tenants
        </Typography>

        <Button
          component={Link}
          to="/dashboard/add-tenant"
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2, px: 3 }}
        >
          + Add Tenant
        </Button>
      </Box>

      {/*  Tenants Table */}
      <Paper sx={{ mb: 4, overflowX: 'auto' }} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E0F2F1' }}>
              <TableCell><b>Tenant Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Property</b></TableCell>
              <TableCell><b>Due Date</b></TableCell>
              <TableCell><b>Paid?</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.id} hover>
                <TableCell>{tenant.name}</TableCell>
                <TableCell>{tenant.email}</TableCell>
                <TableCell>{tenant.property}</TableCell>
                <TableCell>{tenant.dueDate}</TableCell>
                <TableCell>
                  <Checkbox
                    color="primary"
                    checked={tenant.paid}
                    onChange={() => handleTogglePaid(tenant.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/*  Footer */}
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
        <Typography variant="caption">
          &copy; {new Date().getFullYear()} All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Tenants;
