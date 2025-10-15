import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data, error.message);
    return Promise.reject(error);
  }
);

// Game API
export const gameAPI = {
  createGame: (boardSize) => {
    console.log('API: Creating game with board size:', boardSize);
    console.log('API: Board size type:', typeof boardSize);
    console.log('API: Board size value:', boardSize);
    console.log('API: Making request to:', `${API_BASE_URL}/games`);
    
    // Ensure boardSize is a valid number
    const validBoardSize = typeof boardSize === 'number' ? boardSize : 4;
    console.log('API: Using board size:', validBoardSize);
    
    return api.post('/games', { boardSize: validBoardSize });
  },
  getGame: (gameId) => api.get(`/games/${gameId}`),
  makeMove: (gameId, direction) => {
    console.log('API: Making move for game:', gameId, 'direction:', direction);
    return api.put(`/games/${gameId}/move`, { direction });
  },
  resetGame: (gameId) => api.put(`/games/${gameId}/reset`),
};

// Score API
export const scoreAPI = {
  submitScore: (scoreData) => {
    console.log('API: Submitting score:', scoreData);
    return api.post('/scores', scoreData);
  },
  getLeaderboard: (boardSize = 4, limit = 10) => {
    console.log('API: Getting leaderboard for board size:', boardSize);
    return api.get(`/scores/leaderboard?boardSize=${boardSize}&limit=${limit}`);
  },
  getScoresByBoardSize: (boardSize, limit = 50) => 
    api.get(`/scores/board/${boardSize}?limit=${limit}`),
};

export default api;
