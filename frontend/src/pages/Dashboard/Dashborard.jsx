import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';

const Dashborard = () => (
  <Box sx={{ minHeight: '100vh', width: '100vw', bgcolor: '#f5f7fa', display: 'flex' }}>
    <Sidebar active="dashboard" />
    <Box
      sx={{
        flex: 1,
        p: { xs: 2, md: 6 },
        bgcolor: '#fff',
        minHeight: '100vh',
        maxWidth: 1100,      // Set max width for content
        mx: 'auto',          // Center content horizontally
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top bar code if any */}
      <Outlet />
    </Box>
  </Box>
);

export default Dashborard;