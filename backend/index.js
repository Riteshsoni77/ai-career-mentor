const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();

app.use(cors());
app.use(express.json());

const users = []; // In-memory user store

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed });
  res.json({ message: 'Registered successfully' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: 'User not found' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid password' });
  res.json({ message: 'Login successful' });
});

app.listen(8080, () => console.log('Backend running on port 8080'));