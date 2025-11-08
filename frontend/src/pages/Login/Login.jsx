import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        localStorage.setItem('isLoggedIn', 'true'); // <-- Add this line
        navigate('/dashboard');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  return (
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
        <form onSubmit={handleLogin}>
          <Stack spacing={3}>
            <TextField
              label="Gmail"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth type="submit">
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;