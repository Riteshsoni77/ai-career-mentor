// filepath: src/pages/Home/Home.jsx
import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import robotImg from '../../assets/images/robot.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100vw',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f8fafc',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 1200,
          mx: 'auto',
          px: 4,
        }}
      >
        <Box sx={{ maxWidth: 540 }}>
          <Typography variant="h2" fontWeight={700} color="primary.main" gutterBottom>
            Your AI Career Mentor
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Get personalized AI career guidance, learning paths, and role recommendations — powered by advanced AI models.
          </Typography>
          <Stack direction="row" spacing={2} mt={3}>
            <Button variant="contained" size="large">
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/chat')}
            >
              Try Chat
            </Button>
          </Stack>
        </Box>
        <Box>
          <img src={robotImg} alt="AI Mentor Robot" style={{ width: 340, maxWidth: '100%' }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;