// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const AddUser =require('./models/Adduser')

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://DipeshChavan:Deep456@cluster0.y5urtoo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

app.post('/api/users', async (req, res) => {
    try {
      const { name } = req.body;
      const existingUser = await AddUser.findOne({ name });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this name already exists' });
      }
      const newUser = await AddUser.create({ name });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Error adding user' });
    }
  });
  

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
