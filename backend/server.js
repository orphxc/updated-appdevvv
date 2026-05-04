require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Session = require('./modules/Session');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Could not connect to MongoDB:", err));


app.get('/api/sessions', async (req, res) => {
  const sessions = await Session.find().sort({ date: -1 }); 
});

app.post('/api/sessions', async (req, res) => {
  const session = new Session(req.body);
  await session.save();
  res.send(session);
});


app.delete('/api/sessions/:id', async (req, res) => {
  await Session.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.put('/api/sessions/:id', async (req, res) => {
  try {
    const updated = await Session.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );
    res.send(updated);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
