import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <AppBar position="static" color="primary" elevation={0}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
        AI Career Mentor
      </Typography>
      <Box>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/chat">Chat</Button>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/register">Register</Button>
        <Button color="inherit" component={Link} to="/resume-analyzer">Resume Analyzer</Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;