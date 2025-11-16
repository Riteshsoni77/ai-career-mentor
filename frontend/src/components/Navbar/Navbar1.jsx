import React from 'react';
import { Box, Typography, InputBase, IconButton, Avatar } from '@mui/material';
import robotLogo from '../../assets/images/robot-avatar.png'; // Import your logo

const Navbar1 = () => (
  <Box sx={{
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    pr: 190,
    py: 2,
    bgcolor: '#f5f7fa',
    borderBottom: '1px solid #e0e0e0',
    position: 'sticky',
    top: 0,
    zIndex: 100
  }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <img src={robotLogo} alt="Logo" style={{ width: 40, height: 40 }} />
      <Typography variant="h5" fontWeight={700} color="primary">
        AI CAREER MENTOR
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <InputBase
        placeholder="Search"
        sx={{
          bgcolor: '#fff',
          px: 2,
          py: 0.5,
          borderRadius: 3,
          border: '1px solid #e0e0e0',
          width: 180
        }}
      />
      <IconButton sx={{ pr: 6 }}>
        <Avatar />
      </IconButton>
    </Box>
  </Box>
);

export default Navbar1;