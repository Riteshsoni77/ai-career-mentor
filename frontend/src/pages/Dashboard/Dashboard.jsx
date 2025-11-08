import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar1 from '../../components/Navbar/Navbar1';
import { Outlet } from 'react-router-dom';

const Dashboard = () => (
  <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: '#f5f7fa', overflow: 'hidden' }}>
    {/* Navbar1 at the very top, full width */}
    <Navbar1 />
    {/* Flex container for sidebar and content */}
    <Box sx={{ display: 'flex', width: '100%', minHeight: 'calc(100vh - 72px)' }}>
      <Sidebar active="dashboard" />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Box sx={{ p: 4, width: '100%' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  </Box>
);

export default Dashboard;