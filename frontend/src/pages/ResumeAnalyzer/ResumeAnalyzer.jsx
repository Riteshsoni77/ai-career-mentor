// filepath: /Users/riteshsoni/Desktop/ai-career-mentor/frontend/src/pages/ResumeAnalyzer/ResumeAnalyzer.jsx
import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Paper, Divider, TextField, CircularProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a resume file.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDesc', jobDesc);

    try {
      const response = await fetch('http://localhost:8080/api/analyze-resume', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      setResult(data.result);
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err.message || 'Upload failed. Is the backend server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight="bold">
          AI Resume Analyzer
        </Typography>
        <Stack spacing={3} mt={3}>
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadFileIcon />}
          >
            Upload Resume
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
            />
          </Button>
          {file && (
            <Typography variant="body2" align="center">
              Selected: {file.name}
            </Typography>
          )}
          <TextField
            label="Job Description (Optional)"
            multiline
            rows={6}
            variant="outlined"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            placeholder="Paste the job description here for a more accurate analysis."
          />
          <Button
            onClick={handleUpload}
            variant="contained"
            disabled={!file || loading}
            size="large"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Analyze Now'}
          </Button>
          {error && (
            <Typography color="error" align="center">
              Error: {error}
            </Typography>
          )}
          {result && (
            <Box mt={4}>
              <Typography variant="h6">ATS Score</Typography>
              <Typography>{result.ats_score}</Typography>
              <Divider sx={{ my: 2 }} />

              <Typography variant="h6">Skill Match</Typography>
              <Typography>✔ Matched Skills: {result.skill_match?.matched_skills?.join(', ') || 'None'}</Typography>
              <Typography>❌ Missing Skills: {result.skill_match?.missing_skills?.join(', ') || 'None'}</Typography>
              <Divider sx={{ my: 2 }} />

              <Typography variant="h6">Missing Sections</Typography>
              <Typography>❌ Missing: {result.missing_sections?.missing?.join(', ') || 'None'}</Typography>
              <Typography>✔ Present: {result.missing_sections?.present?.join(', ') || 'None'}</Typography>
              <Divider sx={{ my: 2 }} />

              <Typography variant="h6">Resume Quality Score</Typography>
              <Typography>{result.resume_quality_score}</Typography>
              <Divider sx={{ my: 2 }} />

              <Typography variant="h6">Keyword Optimization</Typography>
              <Typography>
                Keywords Found: {result.keyword_optimization?.found_keywords?.map(k => `${k.keyword} (${k.frequency})`).join(', ') || 'None'}
              </Typography>
              <Typography>
                Keywords Missing: {result.keyword_optimization?.missing_keywords?.join(', ') || 'None'}
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Typography variant="h6">Experience Fit Summary</Typography>
              <Typography>{result.experience_fit_summary}</Typography>
            </Box>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default ResumeAnalyzer;
