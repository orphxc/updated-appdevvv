// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Session = require('./models/Session');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/studytracker');

// GET
app.get('/api/sessions', async (req, res) => {
  const sessions = await Session.find();
  res.send(sessions);
});

// POST
app.post('/api/sessions', async (req, res) => {
  const session = new Session(req.body);
  await session.save();
  res.send(session);
});

// DELETE
app.delete('/api/sessions/:id', async (req, res) => {
  await Session.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// UPDATE
app.put('/api/sessions/:id', async (req, res) => {
  const updated = await Session.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.send(updated);
});

app.listen(3000, () => console.log("Server running on port 3000"));