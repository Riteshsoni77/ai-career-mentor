import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ active }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{
      width: 240,
      bgcolor: '#f7f9fb',
      p: 3,
      minHeight: '100vh',
      borderRight: '1px solid #e0e0e0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 4, color: '#1976d2', letterSpacing: 1 }}>
        AI CAREER MENTOR
      </Typography>
      <Stack spacing={3} sx={{ width: '100%' }}>
        <Button
          fullWidth
          startIcon={<DashboardIcon />}
          sx={{
            justifyContent: 'flex-start',
            bgcolor: active === 'dashboard' ? '#3b4d61' : '#3b4d61',
            color: active === 'dashboard' ? '#fff' : '#cfd8dc',
            fontSize: 20,
            fontWeight: 500,
            borderRadius: 3,
            py: 2,
            px: 3,
            textTransform: 'none'
          }}
          onClick={() => navigate('/Dashborard')}
        >
          Dashboard
        </Button>
        <Button
          fullWidth
          startIcon={<DescriptionIcon />}
          sx={{
            justifyContent: 'flex-start',
            bgcolor: active === 'resume' ? '#3b4d61' : '#3b4d61',
            color: active === 'resume' ? '#fff' : '#cfd8dc',
            fontSize: 20,
            fontWeight: 500,
            borderRadius: 3,
            py: 2,
            px: 3,
            textTransform: 'none'
          }}
          onClick={() => navigate('/Dashborard/resume')}
        >
          Resume
        </Button>
        <Button
          fullWidth
          startIcon={<ChatIcon />}
          sx={{
            justifyContent: 'flex-start',
            bgcolor: active === 'chat' ? '#3b4d61' : '#3b4d61',
            color: active === 'chat' ? '#fff' : '#cfd8dc',
            fontSize: 20,
            fontWeight: 500,
            borderRadius: 3,
            py: 2,
            px: 3,
            textTransform: 'none'
          }}
          onClick={() => navigate('/Dashborard/chat')}
        >
          Chat
        </Button>
        <Button
          fullWidth
          startIcon={<SettingsIcon />}
          sx={{
            justifyContent: 'flex-start',
            bgcolor: active === 'settings' ? '#3b4d61' : '#3b4d61',
            color: active === 'settings' ? '#fff' : '#cfd8dc',
            fontSize: 20,
            fontWeight: 500,
            borderRadius: 3,
            py: 2,
            px: 3,
            textTransform: 'none'
          }}
          onClick={() => navigate('/Dashborard/settings')}
        >
          Settings
        </Button>
      </Stack>
    </Box>
  );
};

export default Sidebar;