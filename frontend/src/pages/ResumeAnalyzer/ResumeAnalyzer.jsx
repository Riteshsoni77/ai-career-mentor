// filepath: /Users/riteshsoni/Desktop/ai-career-mentor/frontend/src/pages/ResumeAnalyzer/ResumeAnalyzer.jsx
import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Paper, Divider } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a resume to upload.');
      return;
    }
    // TODO: Add upload logic here
    alert(`Uploaded: ${file.name}`);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', width: '100%', py: 4 }}>
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
          Resume Analyzer
        </Typography>
        <Divider sx={{ width: '100%', mb: 3 }} />
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            {file ? 'Change Resume' : 'Select Resume'}
            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </Button>
          {file && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Selected file: <b>{file.name}</b>
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, fontWeight: 600 }}
            onClick={handleUpload}
          >
            Upload Resume
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ResumeAnalyzer;