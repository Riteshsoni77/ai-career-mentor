import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, Stack, Avatar, Paper, Divider } from '@mui/material';
import robotAvatar from '../../assets/images/robot-avatar.png';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: `
Hello! 👋 I'm your coding mentor bot. I'm here to:
- Help you with programming questions.
- Provide code examples.
- Guide you through coding challenges.

Feel free to ask me anything related to coding, and I'll do my best to assist you! 🚀
      `,
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const maxTokens = 2000; // Increase token limit

  const handleSend = async () => {
    if (input.trim() === '') return;
    const userMessage = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');

    try {
      const res = await axios.post('/api/chatbot', { message: input });
      const botMessage = { role: 'system', content: res.data.response };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (err) {
      console.error('Error sending message:', err.response || err.message);
      const errorMessage = { role: 'system', content: 'Failed to get a response. Please try again.' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
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
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                mb: 1,
              }}
            >
              {msg.role === 'system' && (
                <Avatar
                  src={robotAvatar}
                  alt="Mentor"
                  sx={{ width: 36, height: 36, mr: 2, alignSelf: 'flex-start' }}
                />
              )}
              <Box
                sx={{
                  bgcolor: msg.role === 'user' ? '#e3f0ff' : '#f1f6fd',
                  color: '#1a2a4a',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: '75%',
                  fontSize: '1rem',
                  ml: msg.role === 'system' ? 0 : 'auto',
                  '& ul': {
                    paddingLeft: '20px',
                    margin: '10px 0',
                    listStyleType: 'disc',
                  },
                  '& ol': {
                    paddingLeft: '20px',
                    margin: '10px 0',
                    listStyleType: 'decimal',
                  },
                  '& h1, & h2, & h3': {
                    margin: '10px 0',
                    fontWeight: 'bold',
                  },
                  '& p': {
                    margin: '10px 0',
                  },
                }}
              >
                {msg.role === 'system' ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content
                )}
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

