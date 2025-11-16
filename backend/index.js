require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
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

const upload = multer({ dest: 'uploads/' });

// choose the venv python you created
const pythonBin = process.env.PYTHON_BIN || '/Users/riteshsoni/.ai-career-mentor-venv/bin/python';

app.post('/api/analyze-resume', upload.single('resume'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const filePath = req.file.path;
    const jobDesc = req.body.jobDesc || '';

    const scriptPath = path.join(__dirname, 'analyze_resume.py');
    const args = [scriptPath, filePath, jobDesc];

    // inherit existing env (including GEMINI_API_KEY from .env or shell)
    const child = spawn(pythonBin, args, { env: { ...process.env } });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => { stdout += data.toString(); });
    child.stderr.on('data', (d) => {
      const s = d.toString();
      stderr += s;
      console.error('Python stderr:', s);
    });

    child.on('error', (err) => {
      console.error('Failed to start python process:', err);
      return res.status(500).json({ error: 'Failed to start python process', detail: err.message });
    });

    child.on('close', (code) => {
      // no stdout -> surface stderr
      if (!stdout || stdout.trim().length === 0) {
        const msg = stderr || `Python exited with code ${code} and no output`;
        return res.status(500).json({ error: msg, code });
      }

      try {
        const parsed = JSON.parse(stdout);
        return res.json(parsed);
      } catch (e) {
        console.error('JSON parse error:', e.message);
        return res.status(500).json({
          error: 'Invalid JSON from analyzer',
          parseError: e.message,
          rawStdout: stdout,
          rawStderr: stderr,
          code
        });
      }
    });
});

// lightweight health endpoint to validate python + spaCy + model
app.get('/python-health', (req, res) => {
  const checkCmd = [
    '-c',
    `
import sys
try:
    import spacy
    try:
        nlp = spacy.load("en_core_web_sm")
        print("OK: spaCy " + spacy.__version__ + " - model loaded")
    except Exception as me:
        print("ERR_MODEL:" + str(me))
        sys.exit(2)
except Exception as e:
    print("ERR_SPACY:" + str(e))
    sys.exit(1)
`
  ];
  const child = spawn(pythonBin, checkCmd, { env: { ...process.env } });
  let out = '';
  let err = '';
  child.stdout.on('data', d => out += d.toString());
  child.stderr.on('data', d => err += d.toString());
  child.on('close', code => {
    if (code === 0) return res.json({ ok: true, message: out.trim() });
    return res.status(500).json({ ok: false, code, stdout: out.trim(), stderr: err.trim() });
  });
});

app.listen(8080, () => console.log('Backend running on port 8080'));