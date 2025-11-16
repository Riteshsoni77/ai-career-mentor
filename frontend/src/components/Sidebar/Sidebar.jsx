import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ active }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{
      width: 240,
      bgcolor: '#f7f9fb',
      pt: 4,
      pl:4, // Top padding for space below Navbar1
      minHeight: '100vh',
      borderRight: '1px solid #e0e0e0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Stack spacing={3} sx={{ width: '100%', mt: 2 }}>
        <Button
          fullWidth
          startIcon={<DashboardIcon />}
          sx={{
            justifyContent: 'flex-start',
            bgcolor: active === 'dashboard' ? '#e3f0ff' : 'transparent',
            color: active === 'dashboard' ? '#1976d2' : '#1a2a4a',
            fontSize: 20,
            fontWeight: 500,
            borderRadius: 3,
            py: 2,
            px: 3,
            textTransform: 'none'
          }}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </Button>
        <Button
          fullWidth
          startIcon={<DescriptionIcon />}
          sx={{
            justifyContent: 'flex-start',
            bgcolor: active === 'resume' ? '#e3f0ff' : 'transparent',
            color: active === 'resume' ? '#1976d2' : '#1a2a4a',
            fontSize: 20,
            fontWeight: 500,
            borderRadius: 3,
            py: 2,
            px: 3,
            textTransform: 'none'
          }}
          onClick={() => navigate('/dashboard/resume')}
        >
          Resume
        </Button>
        <Button
          fullWidth
          startIcon={<ChatIcon />}
          sx={{
            justifyContent: 'flex-start',
            bgcolor: active === 'chat' ? '#e3f0ff' : 'transparent',
            color: active === 'chat' ? '#1976d2' : '#1a2a4a',
            fontSize: 20,
            fontWeight: 500,
            borderRadius: 3,
            py: 2,
            px: 3,
            textTransform: 'none'
          }}
          onClick={() => navigate('/dashboard/chat')}
        >
          Chat
        </Button>
        <Button
          fullWidth
          startIcon={<SettingsIcon />}
          sx={{
            justifyContent: 'flex-start',
            bgcolor: active === 'settings' ? '#e3f0ff' : 'transparent',
            color: active === 'settings' ? '#1976d2' : '#1a2a4a',
            fontSize: 20,
            fontWeight: 500,
            borderRadius: 3,
            py: 2,
            px: 3,
            textTransform: 'none'
          }}
          onClick={() => navigate('/dashboard/settings')}
        >
          Settings
        </Button>
        <Button
          fullWidth
          startIcon={<LogoutIcon />}
          sx={{
            justifyContent: 'flex-start',
            bgcolor: 'transparent',
            color: '#1a2a4a',
            fontSize: 20,
            fontWeight: 500,
            borderRadius: 3,
            py: 2,
            px: 3,
            textTransform: 'none'
          }}
          onClick={() => {
            localStorage.setItem('isLoggedIn', 'false');
            navigate('/');
          }}
        >
          Logout
        </Button>
      </Stack>
    </Box>
  );
};

export default Sidebar;