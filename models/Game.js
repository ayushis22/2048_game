const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  board: {
    type: [[Number]],
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  bestScore: {
    type: Number,
    default: 0
  },
  boardSize: {
    type: Number,
    default: 4
  },
  gameStatus: {
    type: String,
    enum: ['playing', 'won', 'lost'],
    default: 'playing'
  },
  moves: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
gameSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Game', gameSchema);
