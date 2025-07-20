const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomID: { type: String, unique: true },
  name: String,
  description: String,
  type: { type: String, enum: ['public', 'private'], default: 'public' },
  password: String,
  maxUsers: { type: Number, default: 10 },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  background: String,
  category: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', roomSchema);
