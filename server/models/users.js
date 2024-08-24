const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateofbirth: {
    type: Date,
    required: true,
  },
  media: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
