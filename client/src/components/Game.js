import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import GameBoard from './GameBoard';
import ScoreDisplay from './ScoreDisplay';
import GameControls from './GameControls';
import { gameAPI, scoreAPI } from '../services/api';

const Game = () => {
  const [game, setGame] = useState(null);
  const [boardSize, setBoardSize] = useState(4);
  const [loading, setLoading] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [showScoreDialog, setShowScoreDialog] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  // Initialize new game
  const startNewGame = useCallback(async (size = boardSize) => {
    // Ensure size is a valid number
    const gameSize = typeof size === 'number' ? size : boardSize;
    console.log('Starting new game with board size:', gameSize);
    setLoading(true);
    try {
      console.log('Calling gameAPI.createGame with size:', gameSize);
      const response = await gameAPI.createGame(gameSize);
      console.log('API Response received:', response);
      console.log('Game data:', response.data);
      console.log('Best score from API:', response.data.bestScore);
      setGame(response.data);
      setGameOver(false);
      setVictory(false);
    } catch (error) {
      console.error('Failed to start new game - Full error:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      console.error('Error status:', error.response?.status);
      setSnackbar({ 
        open: true, 
        message: `Failed to start new game: ${error.message}`, 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  }, [boardSize]);

  // Make a move
  const makeMove = useCallback(async (direction) => {
    if (!game || game.gameStatus !== 'playing' || loading) return;

    setLoading(true);
    try {
      const response = await gameAPI.makeMove(game._id, direction);
      setGame(response.data);

      if (response.data.gameStatus === 'won' && !victory) {
        setVictory(true);
      } else if (response.data.gameStatus === 'lost') {
        setGameOver(true);
        setShowScoreDialog(true);
      }
    } catch (error) {
      console.error('Move failed:', error);
      setSnackbar({ open: true, message: 'Failed to make move', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, [game, loading, victory]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (game && game.gameStatus === 'playing') {
        const keyMap = {
          'ArrowUp': 'up',
          'ArrowDown': 'down',
          'ArrowLeft': 'left',
          'ArrowRight': 'right',
          'w': 'up',
          's': 'down',
          'a': 'left',
          'd': 'right'
        };
        
        const direction = keyMap[event.key];
        if (direction) {
          event.preventDefault();
          makeMove(direction);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [game, makeMove]);


  // Initialize game on component mount
  useEffect(() => {
    const initializeGame = async () => {
      console.log('Component mounted, starting new game...');
      setLoading(true);
      try {
        console.log('Calling gameAPI.createGame...');
        const response = await gameAPI.createGame(4); // Default to 4x4 for initial load
        console.log('API Response received:', response);
        console.log('Game data:', response.data);
        console.log('Best score from API (init):', response.data.bestScore);
        setGame(response.data);
        setGameOver(false);
        setVictory(false);
      } catch (error) {
        console.error('Failed to start new game - Full error:', error);
        console.error('Error response:', error.response);
        console.error('Error message:', error.message);
        console.error('Error status:', error.response?.status);
        setSnackbar({ 
          open: true, 
          message: `Failed to start new game: ${error.message}`, 
          severity: 'error' 
        });
      } finally {
        setLoading(false);
      }
    };
    
    initializeGame();
  }, []); // Empty dependency array - run only once on mount

  // Handle board size change
  const handleBoardSizeChange = (event) => {
    const newBoardSize = parseInt(event.target.value);
    console.log('Board size changed to:', newBoardSize);
    setBoardSize(newBoardSize);
    
    // Start a new game with the new board size
    startNewGame(newBoardSize);
  };

  // Submit score
  const submitScore = async () => {
    if (!playerName.trim()) {
      setSnackbar({ open: true, message: 'Please enter your name', severity: 'warning' });
      return;
    }

    const scoreData = {
      playerName: playerName.trim(),
      score: game?.score || 0,
      boardSize: game?.boardSize || 4,
      moves: game?.moves || 0,
      gameDuration: game?.createdAt ? Math.floor((Date.now() - new Date(game.createdAt)) / 1000) : 0,
      reached2048: game?.gameStatus === 'won'
    };

    console.log('Submitting score:', scoreData);

    try {
      const response = await scoreAPI.submitScore(scoreData);
      console.log('Score submitted successfully:', response);
      
      setShowScoreDialog(false);
      setPlayerName('');
      setSnackbar({ open: true, message: 'Score submitted successfully!', severity: 'success' });
    } catch (error) {
      console.error('Score submission failed:', error);
      console.error('Error response:', error.response);
      setSnackbar({ 
        open: true, 
        message: `Failed to submit score: ${error.message}`, 
        severity: 'error' 
      });
    }
  };

  // Continue playing after victory
  const continuePlaying = () => {
    setVictory(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (!game) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6">Loading game...</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <>
      <Box sx={{ 
        minHeight: '100vh', 
        py: 4,
        background: '#f5f5f5'
      }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper 
              elevation={4} 
              sx={{ 
                p: 4, 
                borderRadius: 2, 
                background: '#ffffff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
            {/* Header */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  color: 'primary.main',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  mb: 2
                }}
              >
                2048
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3, 
                  color: 'text.secondary',
                  maxWidth: '500px',
                  mx: 'auto'
                }}
              >
                Use arrow keys, WASD, or swipe to move tiles. Combine tiles with the same number to reach 2048!
              </Typography>
            </Box>

        {/* Score Display */}
        <ScoreDisplay score={game?.score || 0} bestScore={game?.bestScore || 0} />

        {/* Game Controls */}
        <GameControls
          onNewGame={() => startNewGame()}
          boardSize={boardSize}
          onBoardSizeChange={handleBoardSizeChange}
          loading={loading}
          gameInProgress={game && game.gameStatus === 'playing' && game.moves > 0}
        />
        

        {/* Game Board */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <GameBoard 
            board={game?.board || []} 
            gameStatus={game?.gameStatus || 'playing'}
            onMove={makeMove}
            loading={loading}
          />
        </Box>

        {/* Game Status Messages */}
        <AnimatePresence>
          {gameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Alert severity="error" sx={{ mt: 2, fontSize: '1.1rem' }}>
                Game Over! No more moves possible.
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {victory && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Alert severity="success" sx={{ mt: 2, fontSize: '1.1rem' }}>
                🎉 Congratulations! You reached 2048! 🎉
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
          </Paper>
        </motion.div>
      </Container>
    </Box>

    {/* Victory Dialog */}
    <Dialog open={victory} onClose={continuePlaying} maxWidth="sm" fullWidth>
        <DialogTitle>🎉 Victory! 🎉</DialogTitle>
        <DialogContent>
          <Typography>
            Congratulations! You reached 2048! You can continue playing to get an even higher score.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={continuePlaying} variant="contained">
            Continue Playing
          </Button>
          <Button onClick={startNewGame} variant="outlined">
            New Game
          </Button>
        </DialogActions>
      </Dialog>

      {/* Score Submission Dialog */}
      <Dialog open={showScoreDialog} onClose={() => setShowScoreDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Submit Your Score</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your Name"
            fullWidth
            variant="outlined"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Final Score: {game?.score || 0} | Moves: {game?.moves || 0}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowScoreDialog(false)}>Cancel</Button>
          <Button onClick={submitScore} variant="contained">
            Submit Score
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Game;
