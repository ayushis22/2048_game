import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import { scoreAPI } from '../services/api';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [boardSize, setBoardSize] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchScores();
  }, [boardSize]);

  const fetchScores = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await scoreAPI.getLeaderboard(boardSize);
      console.log('Leaderboard response:', response);
      console.log('Scores data:', response.data);
      // The API returns the array directly in response.data
      setScores(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
      setError('Failed to load leaderboard');
      setScores([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBoardSizeChange = (event) => {
    setBoardSize(event.target.value);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getRankColor = (index) => {
    switch (index) {
      case 0: return '#ffd700'; // Gold
      case 1: return '#c0c0c0'; // Silver
      case 2: return '#cd7f32'; // Bronze
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading leaderboard...</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={8} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              🏆 Leaderboard 🏆
            </Typography>
            
            <FormControl sx={{ minWidth: 150, mt: 2 }}>
              <InputLabel>Board Size</InputLabel>
              <Select
                value={boardSize}
                label="Board Size"
                onChange={handleBoardSizeChange}
              >
                <MenuItem value={3}>3×3</MenuItem>
                <MenuItem value={4}>4×4</MenuItem>
                <MenuItem value={5}>5×5</MenuItem>
                <MenuItem value={6}>6×6</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {scores.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No scores yet for {boardSize}×{boardSize} board
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Be the first to submit a score!
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Rank</TableCell>
                    <TableCell>Player</TableCell>
                    <TableCell align="right">Score</TableCell>
                    <TableCell align="center">Moves</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">2048</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.map((score, index) => (
                    <motion.tr
                      key={score._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TableCell align="center">
                        <Chip
                          label={index + 1}
                          variant={index < 3 ? "filled" : "outlined"}
                          sx={{
                            fontWeight: 'bold',
                            backgroundColor:
                              index === 0 ? '#ffd700' :
                              index === 1 ? '#c0c0c0' :
                              index === 2 ? '#cd7f32' :
                              'transparent',
                            color: index < 3 ? '#000' : 'inherit',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          {score.playerName}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                          {score.score.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {score.moves}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {formatDuration(score.gameDuration)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {score.reached2048 && (
                          <Chip
                            label="✓"
                            color="success"
                            size="small"
                            sx={{ fontWeight: 'bold' }}
                          />
                        )}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Leaderboard;
