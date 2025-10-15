const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const { initializeBoard, addRandomTile, moveTiles, checkGameStatus } = require('../utils/gameLogic');

// Create a new game
router.post('/', async (req, res) => {
  try {
    const { boardSize = 4 } = req.body;
    
    const board = initializeBoard(boardSize);
    addRandomTile(board);
    addRandomTile(board);
    
    // Get the current global best score for this board size
    const globalBestScore = await Game.findOne({ boardSize })
      .sort({ bestScore: -1 })
      .select('bestScore');
    
    const game = new Game({
      board,
      boardSize,
      score: 0,
      bestScore: globalBestScore ? globalBestScore.bestScore : 0,
      gameStatus: 'playing',
      moves: 0
    });
    
    await game.save();
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific game
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Make a move
router.put('/:id/move', async (req, res) => {
  try {
    const { direction } = req.body;
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    if (game.gameStatus !== 'playing') {
      return res.status(400).json({ message: 'Game is not in playing state' });
    }
    
    const result = moveTiles(game.board, direction);
    
    if (result.moved) {
      game.board = result.board;
      game.score += result.scoreGained;
      game.moves += 1;
      
      // Update best score
      if (game.score > game.bestScore) {
        game.bestScore = game.score;
        
        // Check if this is a new global best score for this board size
        const globalBest = await Game.findOne({ boardSize: game.boardSize })
          .sort({ bestScore: -1 })
          .select('bestScore');
        
        if (game.score > (globalBest ? globalBest.bestScore : 0)) {
          // Update all games with the same board size to have this new best score
          await Game.updateMany(
            { boardSize: game.boardSize },
            { bestScore: game.score }
          );
        }
      }
      
      // Add new random tile
      addRandomTile(game.board);
      
      // Check game status
      game.gameStatus = checkGameStatus(game.board);
      
      await game.save();
    }
    
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reset game
router.put('/:id/reset', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    const board = initializeBoard(game.boardSize);
    addRandomTile(board);
    addRandomTile(board);
    
    game.board = board;
    game.score = 0;
    game.gameStatus = 'playing';
    game.moves = 0;
    
    await game.save();
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
