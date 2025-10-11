import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, Stack, Avatar } from '@mui/material';
import robotAvatar from '../../assets/images/robot-avatar.png'; // Add your robot avatar image here

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
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box
      sx={{
        width: '100vw',
        height: 'calc(100vh - 64px)',
        bgcolor: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 700,
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#fff',
          borderRadius: 3,
          boxShadow: 4,
          p: 0,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ flex: 1, p: 4, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {messages.map((msg, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.sender === 'mentor' && (
                <Avatar
                  src={robotAvatar}
                  alt="Mentor"
                  sx={{ width: 48, height: 48, mr: 2, alignSelf: 'flex-start' }}
                />
              )}
              <Box
                sx={{
                  bgcolor: '#f1f6fd',
                  color: '#1a2a4a',
                  px: 3,
                  py: 2,
                  borderRadius: 3,
                  maxWidth: '80%',
                  fontSize: '1.15rem',
                  boxShadow: 0,
                  ml: msg.sender === 'mentor' ? 0 : 'auto',
                }}
              >
                {msg.text}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <Box sx={{ p: 3, borderTop: '1px solid #e0e7ef', bgcolor: '#f8fafc' }}>
          <Stack direction="row" spacing={2}>
            <TextField
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message..."
              variant="outlined"
              fullWidth
              size="large"
              sx={{
                bgcolor: '#fff',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': { fontSize: '1.1rem' }
              }}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            />
            <Button
              variant="contained"
              onClick={handleSend}
              size="large"
              sx={{
                bgcolor: '#4285f4',
                color: '#fff',
                fontWeight: 600,
                px: 4,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                boxShadow: 0,
                '&:hover': { bgcolor: '#357ae8' }
              }}
            >
              Send
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;