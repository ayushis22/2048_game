const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// Submit a new score
router.post('/', async (req, res) => {
  try {
    const { playerName, score, boardSize, moves, gameDuration, reached2048 } = req.body;
    
    const newScore = new Score({
      playerName,
      score,
      boardSize,
      moves,
      gameDuration,
      reached2048
    });
    
    await newScore.save();
    res.json(newScore);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const { boardSize = 4, limit = 10 } = req.query;
    
    const scores = await Score.find({ boardSize })
      .sort({ score: -1 })
      .limit(parseInt(limit))
      .select('playerName score moves gameDuration reached2048 createdAt');
    
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all scores for a specific board size
router.get('/board/:boardSize', async (req, res) => {
  try {
    const { boardSize } = req.params;
    const { limit = 50 } = req.query;
    
    const scores = await Score.find({ boardSize })
      .sort({ score: -1 })
      .limit(parseInt(limit));
    
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
