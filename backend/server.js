require('dotenv').config(); // 👈 1. Load the .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Session = require('./modules/Session');

const app = express();
app.use(cors());
app.use(express.json());

// 👈 3. Use the cloud URI from your .env file instead of the local address
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Could not connect to MongoDB:", err));

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
