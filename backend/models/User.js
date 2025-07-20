const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },
  userID: { type: String, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isOnline: { type: Boolean, default: false },
  giftsReceived: { type: Number, default: 0 },
  vipLevel: { type: Number, default: 0 },
  interests: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
