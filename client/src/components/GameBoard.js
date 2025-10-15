import React, { useState, useCallback } from 'react';
import { Box, Paper } from '@mui/material';
import GameTile from './GameTile';

const GameBoard = ({ board = [], gameStatus = 'playing', onMove, loading = false }) => {
  // Default empty board if board is undefined
  const defaultBoard = Array(4).fill(null).map(() => Array(4).fill(0));
  const gameBoard = board && board.length > 0 ? board : defaultBoard;
  const boardSize = gameBoard.length;
  const containerSize = Math.min(400, window.innerWidth * 0.8);
  const tileSize = Math.floor((containerSize - (boardSize + 1) * 8) / boardSize);
  const spacing = 8;

  // Touch/drag state
  const [touchStart, setTouchStart] = useState({ x: null, y: null });
  const [touchEnd, setTouchEnd] = useState({ x: null, y: null });

  // Minimum distance for a swipe
  const minSwipeDistance = 50;

  const getTileColor = (value) => {
    const colors = {
      0: '#cdc1b4',
      2: '#eee4da',
      4: '#ede0c8',
      8: '#f2b179',
      16: '#f59563',
      32: '#f67c5f',
      64: '#f65e3b',
      128: '#edcf72',
      256: '#edcc61',
      512: '#edc850',
      1024: '#edc53f',
      2048: '#edc22e',
    };
    return colors[value] || '#3c3a32';
  };

  const getTextColor = (value) => {
    return value <= 4 ? '#776e65' : '#f9f6f2';
  };

  // Handle touch start
  const handleTouchStart = useCallback((e) => {
    if (gameStatus !== 'playing' || loading) return;
    setTouchEnd({ x: null, y: null });
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  }, [gameStatus, loading]);

  // Handle touch move
  const handleTouchMove = useCallback((e) => {
    if (gameStatus !== 'playing' || loading) return;
    setTouchEnd({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  }, [gameStatus, loading]);

  // Handle touch end and determine swipe direction
  const handleTouchEnd = useCallback(() => {
    if (!touchStart.x || !touchEnd.x || gameStatus !== 'playing' || loading) return;
    
    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;
    
    // Determine if it's a horizontal or vertical swipe
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    
    if (isHorizontalSwipe) {
      const isLeftSwipe = deltaX > minSwipeDistance;
      const isRightSwipe = deltaX < -minSwipeDistance;
      
      if (isLeftSwipe || isRightSwipe) {
        onMove(isLeftSwipe ? 'left' : 'right');
      }
    } else {
      const isUpSwipe = deltaY > minSwipeDistance;
      const isDownSwipe = deltaY < -minSwipeDistance;
      
      if (isUpSwipe || isDownSwipe) {
        onMove(isUpSwipe ? 'up' : 'down');
      }
    }
  }, [touchStart, touchEnd, gameStatus, loading, onMove, minSwipeDistance]);

  // Handle mouse events for desktop drag
  const [mouseStart, setMouseStart] = useState({ x: null, y: null });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e) => {
    if (gameStatus !== 'playing' || loading) return;
    setMouseStart({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  }, [gameStatus, loading]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || gameStatus !== 'playing' || loading) return;
    // Prevent default to avoid text selection
    e.preventDefault();
  }, [isDragging, gameStatus, loading]);

  const handleMouseUp = useCallback((e) => {
    if (!isDragging || !mouseStart.x || gameStatus !== 'playing' || loading) return;
    
    const deltaX = mouseStart.x - e.clientX;
    const deltaY = mouseStart.y - e.clientY;
    
    // Determine if it's a horizontal or vertical swipe
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    
    if (isHorizontalSwipe) {
      const isLeftSwipe = deltaX > minSwipeDistance;
      const isRightSwipe = deltaX < -minSwipeDistance;
      
      if (isLeftSwipe || isRightSwipe) {
        onMove(isLeftSwipe ? 'left' : 'right');
      }
    } else {
      const isUpSwipe = deltaY > minSwipeDistance;
      const isDownSwipe = deltaY < -minSwipeDistance;
      
      if (isUpSwipe || isDownSwipe) {
        onMove(isUpSwipe ? 'up' : 'down');
      }
    }
    
    setIsDragging(false);
    setMouseStart({ x: null, y: null });
  }, [isDragging, mouseStart, gameStatus, loading, onMove, minSwipeDistance]);

  return (
    <Paper
      elevation={8}
      sx={{
        p: 2,
        background: '#bbada0',
        borderRadius: 2,
        position: 'relative',
        width: boardSize * (tileSize + spacing) + spacing,
        height: boardSize * (tileSize + spacing) + spacing,
        userSelect: 'none',
        touchAction: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
        border: '1px solid #9a9a9a',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
        }
      }}
      // Touch events for mobile
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      // Mouse events for desktop
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setIsDragging(false);
        setMouseStart({ x: null, y: null });
      }}
    >
      {gameBoard.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <Box
            key={`${rowIndex}-${colIndex}`}
            sx={{
              position: 'absolute',
              left: colIndex * (tileSize + spacing) + spacing,
              top: rowIndex * (tileSize + spacing) + spacing,
              width: tileSize,
              height: tileSize,
            }}
          >
            <GameTile
              value={value}
              color={getTileColor(value)}
              textColor={getTextColor(value)}
              size={tileSize}
              gameStatus={gameStatus}
            />
          </Box>
        ))
      )}
    </Paper>
  );
};

export default GameBoard;
