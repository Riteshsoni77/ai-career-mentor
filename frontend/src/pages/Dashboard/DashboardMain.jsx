import React from 'react';
import { Typography, Grid, Paper, Avatar, Box, Stack } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ChatIcon from '@mui/icons-material/Chat';

const DashboardMain = () => (
  <>
    <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
      Welcome back! How can I assist you today?
    </Typography>
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} md={6}>
        <Paper elevation={0} sx={{
          p: 3,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          bgcolor: '#f7f9fb',
          border: '1px solid #e0e0e0'
        }}>
          <Avatar sx={{ bgcolor: '#e3f0ff', color: '#1976d2', width: 48, height: 48 }}>
            <ArrowUpwardIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700} color="text.primary">Resume Analysis</Typography>
            <Typography variant="body2" color="text.secondary">
              Upload and analyze your resume
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={0} sx={{
          p: 3,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          bgcolor: '#f7f9fb',
          border: '1px solid #e0e0e0'
        }}>
          <Avatar sx={{ bgcolor: '#e3f0ff', color: '#1976d2', width: 48, height: 48 }}>
            <ChatIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700} color="text.primary">Chat</Typography>
            <Typography variant="body2" color="text.secondary">
              Ask a career-related question
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
    <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }} color="text.primary">
      Upcoming Tasks
    </Typography>
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar sx={{ width: 24, height: 24, bgcolor: '#f7f9fb', color: '#1976d2', fontSize: 16 }}>○</Avatar>
        <Typography variant="body1" color="text.primary">Research job opportunities</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar sx={{ width: 24, height: 24, bgcolor: '#f7f9fb', color: '#1976d2', fontSize: 16 }}>○</Avatar>
        <Typography variant="body1" color="text.primary">Develop skills for desired roles</Typography>
      </Box>
    </Stack>
  </>
);

export default DashboardMain;