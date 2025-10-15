// Game logic utilities following functional programming principles

// Initialize an empty board
const initializeBoard = (size) => {
  return Array(size).fill(null).map(() => Array(size).fill(0));
};

// Get empty cells
const getEmptyCells = (board) => {
  const emptyCells = [];
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }
  return emptyCells;
};

// Add a random tile (2 or 4) to the board
const addRandomTile = (board) => {
  const emptyCells = getEmptyCells(board);
  if (emptyCells.length === 0) return false;
  
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const value = Math.random() < 0.9 ? 2 : 4; // 90% chance for 2, 10% for 4
  board[randomCell.row][randomCell.col] = value;
  return true;
};

// Deep clone a 2D array
const cloneBoard = (board) => {
  return board.map(row => [...row]);
};

// Rotate board 90 degrees clockwise
const rotateBoard = (board) => {
  const size = board.length;
  const rotated = Array(size).fill(null).map(() => Array(size).fill(0));
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      rotated[col][size - 1 - row] = board[row][col];
    }
  }
  
  return rotated;
};

// Move tiles left and merge
const moveLeft = (board) => {
  const newBoard = cloneBoard(board);
  let scoreGained = 0;
  let moved = false;
  
  for (let row = 0; row < newBoard.length; row++) {
    const filteredRow = newBoard[row].filter(cell => cell !== 0);
    const mergedRow = [];
    let i = 0;
    
    while (i < filteredRow.length) {
      if (i < filteredRow.length - 1 && filteredRow[i] === filteredRow[i + 1]) {
        // Merge tiles
        const mergedValue = filteredRow[i] * 2;
        mergedRow.push(mergedValue);
        scoreGained += mergedValue;
        moved = true;
        i += 2;
      } else {
        mergedRow.push(filteredRow[i]);
        i += 1;
      }
    }
    
    // Pad with zeros
    while (mergedRow.length < newBoard[row].length) {
      mergedRow.push(0);
    }
    
    // Check if row changed
    if (JSON.stringify(newBoard[row]) !== JSON.stringify(mergedRow)) {
      moved = true;
    }
    
    newBoard[row] = mergedRow;
  }
  
  return { board: newBoard, scoreGained, moved };
};

// Move tiles in any direction
const moveTiles = (board, direction) => {
  let rotatedBoard = cloneBoard(board);
  let rotations = 0;
  
  // Rotate board to make all moves equivalent to moving left
  switch (direction) {
    case 'up':
      rotations = 3;
      break;
    case 'right':
      rotations = 2;
      break;
    case 'down':
      rotations = 1;
      break;
    case 'left':
    default:
      rotations = 0;
      break;
  }
  
  // Apply rotations
  for (let i = 0; i < rotations; i++) {
    rotatedBoard = rotateBoard(rotatedBoard);
  }
  
  // Move left
  const result = moveLeft(rotatedBoard);
  
  // Rotate back
  for (let i = 0; i < (4 - rotations) % 4; i++) {
    result.board = rotateBoard(result.board);
  }
  
  return result;
};

// Check if game is won (reached 2048)
const hasWon = (board) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === 2048) {
        return true;
      }
    }
  }
  return false;
};

// Check if game is lost (no moves possible)
const hasLost = (board) => {
  // Check for empty cells
  if (getEmptyCells(board).length > 0) {
    return false;
  }
  
  // Check for possible merges
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const current = board[row][col];
      
      // Check right neighbor
      if (col < board[row].length - 1 && board[row][col + 1] === current) {
        return false;
      }
      
      // Check bottom neighbor
      if (row < board.length - 1 && board[row + 1][col] === current) {
        return false;
      }
    }
  }
  
  return true;
};

// Check game status
const checkGameStatus = (board) => {
  if (hasWon(board)) {
    return 'won';
  } else if (hasLost(board)) {
    return 'lost';
  } else {
    return 'playing';
  }
};

// Calculate maximum possible score for a board size
const calculateMaxScore = (boardSize) => {
  // Theoretical maximum is when all tiles are 2048
  return 2048 * boardSize * boardSize;
};

// Get statistics about the current board
const getBoardStats = (board) => {
  const stats = {
    emptyCells: getEmptyCells(board).length,
    totalCells: board.length * board[0].length,
    maxTile: 0,
    tileCounts: {}
  };
  
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const value = board[row][col];
      if (value > 0) {
        stats.maxTile = Math.max(stats.maxTile, value);
        stats.tileCounts[value] = (stats.tileCounts[value] || 0) + 1;
      }
    }
  }
  
  return stats;
};

module.exports = {
  initializeBoard,
  addRandomTile,
  moveTiles,
  checkGameStatus,
  hasWon,
  hasLost,
  getEmptyCells,
  getBoardStats,
  calculateMaxScore,
  cloneBoard
};
