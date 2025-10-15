import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const ScoreDisplay = ({ score = 0, bestScore = 0 }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
      <Paper
        elevation={2}
        sx={{
          p: 2,
          minWidth: 120,
          textAlign: 'center',
          background: '#ffffff',
          borderRadius: 1,
          border: '1px solid #e0e0e0'
        }}
      >
        <Typography variant="body2" color="text.secondary" gutterBottom>
          SCORE
        </Typography>
        <motion.div
          key={score}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {score.toLocaleString()}
          </Typography>
        </motion.div>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          p: 2,
          minWidth: 120,
          textAlign: 'center',
          background: '#ffffff',
          borderRadius: 1,
          border: '1px solid #e0e0e0'
        }}
      >
        <Typography variant="body2" color="text.secondary" gutterBottom>
          BEST
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
          {bestScore.toLocaleString()}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ScoreDisplay;
