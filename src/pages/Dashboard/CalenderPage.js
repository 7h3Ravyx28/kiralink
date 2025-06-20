import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Stack,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const CalendarPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(dayjs());

  // Get total days in current month
  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf('month').day();

  const handlePreviousMonth = () => setCurrentDate((prev) => prev.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate((prev) => prev.add(1, 'month'));

  const handleDateClick = (date) => {
    const fullDate = currentDate.date(date).format('YYYY-MM-DD');
    navigate(`/dashboard/tenants?dueDate=${fullDate}`); // navigate with dueDate param
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" sx={{ color: '#00796B', fontWeight: 'bold', fontFamily: 'Rajdhani' }}>
          {currentDate.format('MMMM YYYY')}
        </Typography>
        <Box>
          <IconButton onClick={handlePreviousMonth}><ChevronLeft /></IconButton>
          <IconButton onClick={handleNextMonth}><ChevronRight /></IconButton>
        </Box>
      </Stack>

      {/* Days of the week */}
      <Grid container spacing={1} mb={1}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Grid item xs={12/7} key={day}>
            <Typography variant="subtitle2" align="center" fontWeight="bold" color="#00796B">
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Empty grid to align first day */}
      <Grid container spacing={1} mb={1}>
        {[...Array(firstDayOfMonth)].map((_, index) => (
          <Grid item xs={12/7} key={`empty-${index}`}></Grid>
        ))}

        {/* Month days */}
        {[...Array(daysInMonth)].map((_, index) => {
          const dateNum = index + 1;
          return (
            <Grid item xs={12/7} key={dateNum}>
              <Paper
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: '#E0F2F1',
                  '&:hover': { backgroundColor: '#B2DFDB' },
                }}
                onClick={() => handleDateClick(dateNum)}
              >
                <Typography fontWeight="bold">{dateNum}</Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CalendarPage;
