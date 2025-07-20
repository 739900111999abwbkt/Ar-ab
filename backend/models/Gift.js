const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  name: String,
  icon: String,
  value: Number
});

module.exports = mongoose.model('Gift', giftSchema);
