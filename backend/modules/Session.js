const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  subject: { type: String, required: true }, 
  duration: { type: Number, required: true }, 
  date: { type: Date, default: Date.now },
  notes: String
});


module.exports = mongoose.model('Session', SessionSchema);
