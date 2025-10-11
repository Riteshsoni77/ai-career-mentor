import React from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';

const Login = () => (
  <Box
    sx={{
      width: '100vw',
      height: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#f8fafc',
    }}
  >
    <Box sx={{ minWidth: 320, p: 4, bgcolor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" gutterBottom>
        Login Page
      </Typography>
      <Stack spacing={3}>
        <TextField
          label="Gmail"
          type="email"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Stack>
    </Box>
  </Box>
);

export default Login;