import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, Stack, Avatar, Paper, Divider } from '@mui/material';
import robotAvatar from '../../assets/images/robot-avatar.png';
import ChatIcon from '@mui/icons-material/Chat';

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: 'mentor', text: "Hello! I'm the AI Career Mentor. How can I assist you today?" },
    { sender: 'user', text: "I'm looking for guidance on transitioning from engineering to a career in AI." },
    { sender: 'mentor', text: "Great! Let's explore the steps and skills needed for a successful transition to AI." }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    // TODO: Add backend chat logic here
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', width: '100%', py: 4 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          bgcolor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
          <ChatIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Chat
        </Typography>
        <Divider sx={{ width: '100%', mb: 3 }} />
        <Box sx={{ width: '100%', minHeight: 400, maxHeight: 300, overflowY: 'auto', mb: 2 }}>
          {messages.map((msg, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 1,
              }}
            >
              {msg.sender === 'mentor' && (
                <Avatar
                  src={robotAvatar}
                  alt="Mentor"
                  sx={{ width: 36, height: 36, mr: 2, alignSelf: 'flex-start' }}
                />
              )}
              <Box
                sx={{
                  bgcolor: msg.sender === 'user' ? '#e3f0ff' : '#f1f6fd',
                  color: '#1a2a4a',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: '75%',
                  fontSize: '1rem',
                  ml: msg.sender === 'mentor' ? 0 : 'auto',
                }}
              >
                {msg.text}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <TextField
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
            variant="outlined"
            fullWidth
            size="medium"
            sx={{
              bgcolor: '#fff',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': { fontSize: '1rem' }
            }}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          />
          <Button
            variant="contained"
            onClick={handleSend}
            sx={{
              bgcolor: '#4285f4',
              color: '#fff',
              fontWeight: 600,
              px: 3,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: 0,
              '&:hover': { bgcolor: '#357ae8' }
            }}
          >
            Send
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Chat;