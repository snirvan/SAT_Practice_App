const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: String,
  question: String,
  options: [String],
  correctAnswer: String,
  explanation: String
});

module.exports = mongoose.model('Problem', ProblemSchema);
