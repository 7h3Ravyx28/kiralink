import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Properties = () => {
  // Dummy data
  const totalProperties = 5;
  const propertiesList = [
    { name: 'Seaside Villa', location: 'Los Angeles, CA', tenants: 3 },
    { name: 'Downtown Apartment', location: 'New York, NY', tenants: 2 },
    { name: 'Mountain Cabin', location: 'Aspen, CO', tenants: 1 },
    { name: 'Beach House', location: 'Miami, FL', tenants: 4 },
    { name: 'City Loft', location: 'Chicago, IL', tenants: 2 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* ✅ Total Properties */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Total Properties
        </Typography>
        <Typography variant="h3" color="#00796B" sx={{ fontWeight: 'bold' }}>
          {totalProperties}
        </Typography>
      </Paper>

      {/* ✅ Properties Table */}
      <Typography variant="h6" mb={1}>Your Properties</Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Property Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Number of Tenants</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {propertiesList.map((property, index) => (
              <TableRow key={index}>
                <TableCell>{property.name}</TableCell>
                <TableCell>{property.location}</TableCell>
                <TableCell>{property.tenants}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ✅ Add Properties Button */}
      <Box textAlign="center" mb={4}>
        <Button
          component={Link}
          to="/dashboard/add-property"
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2, px: 4 }}
        >
          + Add Properties
        </Button>
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

export default Properties;
