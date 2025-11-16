// filepath: /Users/riteshsoni/Desktop/ai-career-mentor/frontend/src/pages/ResumeAnalyzer/ResumeAnalyzer.jsx
import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Paper, Divider, TextField } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a resume to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDesc', jobDesc);

    try {
      const res = await fetch('http://localhost:8080/api/analyze-resume', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.result);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      alert('Network error');
    }
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
          <TextField
            label="Job Description"
            multiline
            rows={4}
            value={jobDesc}
            onChange={e => setJobDesc(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            placeholder="Paste the job description here"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, fontWeight: 600 }}
            onClick={handleUpload}
          >
            Upload Resume
          </Button>
          {result && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" color="primary">Resume Summary:</Typography>
              <Typography variant="body2">{result.summary}</Typography>
              <Typography variant="h6" color="primary" sx={{ mt: 2 }}>ATS Score:</Typography>
              <Typography variant="body2">{result.ats_score}</Typography>
              <Typography variant="h6" color="primary" sx={{ mt: 2 }}>Feedback:</Typography>
              <Typography variant="body2">{result.feedback}</Typography>
              <Typography variant="h6" color="primary" sx={{ mt: 2 }}>Mentor Recommendation:</Typography>
              <Typography variant="body2">{result.mentor_recommendation}</Typography>
            </Box>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default ResumeAnalyzer;