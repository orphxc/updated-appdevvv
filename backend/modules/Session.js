const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  subject: String,
  duration: Number,
  date: { type: Date, default: Date.now },
  notes: String
});

module.exports = mongoose.model('Session', SessionSchema);
