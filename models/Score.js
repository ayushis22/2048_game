const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
    trim: true
  },
  score: {
    type: Number,
    required: true
  },
  boardSize: {
    type: Number,
    default: 4
  },
  moves: {
    type: Number,
    required: true
  },
  gameDuration: {
    type: Number, // in seconds
    required: true
  },
  reached2048: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying
scoreSchema.index({ score: -1 });
scoreSchema.index({ boardSize: 1, score: -1 });

module.exports = mongoose.model('Score', scoreSchema);
