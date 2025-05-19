const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: String,
  email: String,
  image: String,

  progress: [
    {
      problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
      status: {
        type: String,
        enum: ['Not Started', 'Completed'],
        default: 'Not Started'
      }
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
