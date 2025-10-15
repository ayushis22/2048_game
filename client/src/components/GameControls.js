import React from 'react';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';

const GameControls = ({ onNewGame, boardSize, onBoardSizeChange, loading, gameInProgress = false }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      gap: 3, 
      mb: 3,
      flexWrap: 'wrap'
    }}>
      <Button
        variant="contained"
        size="large"
        onClick={onNewGame}
        disabled={loading}
        sx={{
          px: 3,
          py: 1,
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none'
        }}
      >
        {loading ? 'Loading...' : 'New Game'}
      </Button>

      <Tooltip 
        title={gameInProgress ? "Board size cannot be changed during gameplay. Start a new game to change board size." : "Select the board size for your game"}
        placement="top"
      >
        <FormControl 
          size="medium" 
          sx={{ 
            minWidth: 140
          }}
        >
          <InputLabel>
            {gameInProgress ? 'Board Size (Locked)' : 'Board Size'}
          </InputLabel>
          <Select
            value={boardSize}
            label="Board Size"
            onChange={onBoardSizeChange}
            disabled={loading || gameInProgress}
          >
            <MenuItem value={3}>3×3 (Easy)</MenuItem>
            <MenuItem value={4}>4×4 (Classic)</MenuItem>
            <MenuItem value={5}>5×5 (Hard)</MenuItem>
            <MenuItem value={6}>6×6 (Expert)</MenuItem>
          </Select>
        </FormControl>
      </Tooltip>
    </Box>
  );
};

export default GameControls;
