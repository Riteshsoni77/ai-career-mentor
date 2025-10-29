import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }
    try {
      const res = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      console.log('Response:', data);
      if (res.ok) {
        alert(data.message);
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (err) {
      alert('Network error');
      console.error(err);
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
          Register Page
        </Typography>
        <form onSubmit={handleRegister}>
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
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth type="submit">
              Register
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Register;