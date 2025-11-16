require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const { extractText } = require('./extract_text');
// const { generateText } = require('./gemini_client'); // Comment out or remove Gemini
const { generateGroqText } = require('./groq_client'); // Use the new Groq client
const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ritiksoni', // <-- replace with your password
  database: 'ai_career_mentor'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Register route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.query(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, hashed],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Registered successfully' });
    }
  );
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) return res.status(400).json({ error: 'User not found' });
      const user = results[0];
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(400).json({ error: 'Invalid password' });
      res.json({ message: 'Login successful' });
    }
  );
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Resume analysis route - UPDATED FOR GROQ
app.post('/api/analyze-resume', upload.single('resume'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No resume file uploaded.' });
  }

  try {
    const filePath = req.file.path;
    const jobDesc = req.body.jobDesc || 'No job description provided.';

    const resumeText = await extractText(filePath);

    console.log("Extracted resume text:", resumeText);

    if (!resumeText || resumeText.length < 50) {
      console.error("Resume extraction failed or text too short:", resumeText);
      return res.status(400).json({
        error: 'Failed to extract sufficient text from resume. Please upload a valid text-based PDF or DOCX file.'
      });
    }

    const MAX_RESUME_LENGTH = 4000;
    let truncatedResumeText = resumeText;
    if (resumeText.length > MAX_RESUME_LENGTH) {
      truncatedResumeText = resumeText.slice(0, MAX_RESUME_LENGTH) + '\n...[truncated]';
    }

    const messages = [
      {
        role: 'system',
        content: `
You are an ATS resume analyzer. Your ONLY task is to return a single, valid JSON object with the following fields:

{
  "ats_score": "",
  "skill_match": { "matched_skills": [], "missing_skills": [] },
  "missing_sections": { "missing": [], "present": [] },
  "resume_quality_score": "",
  "keyword_optimization": { "found_keywords": [], "missing_keywords": [] },
  "experience_fit_summary": ""
}

IMPORTANT:
- Output ONLY valid JSON, nothing else.
- Do NOT include any explanation, reasoning, or commentary.
- If you cannot calculate a field, use null or an empty array.
`
      },
      {
        role: 'user',
        content: `Resume:\n${truncatedResumeText}\n\nJob Description:\n${jobDesc}`
      }
    ];

    const model = 'openai/gpt-oss-20b'; // Use a Groq-supported model
    const maxTokens = 1000; // Increase token limit

    const { raw } = await generateGroqText(messages, { model, maxTokens });

    let result;
    try {
      result = JSON.parse(raw);
    } catch (err) {
      const match = raw.match(/\{[^}]+\}/);
      if (match) {
        try {
          result = JSON.parse(match[0]);
        } catch {
          result = { error: "AI model returned invalid JSON.", raw_response: raw };
        }
      } else {
        result = { error: "AI model returned invalid JSON.", raw_response: raw };
      }
    }

    res.json({ result });
  } catch (err) {
    console.error('Resume analysis failed:', err.stack || err);
    res.status(500).json({ error: 'Resume analysis failed on the server.' });
  }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));