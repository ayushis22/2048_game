# 2048 Game - MERN Stack Implementation

A fully functional 2048 game built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring a modern, responsive UI with smooth animations and comprehensive game mechanics.

## 🎮 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Configurable Board Size**: Play on 3x3, 4x4, 5x5, or 6x6 boards
- **Score Tracking**: Real-time score updates and best score persistence
- **Leaderboard**: Global leaderboard with player rankings
- **Game State Management**: Persistent game state with MongoDB
- **Functional Programming**: Clean, modular code following FP principles
- **Touch Support**: Mobile-friendly with swipe gestures
- **Keyboard Controls**: Arrow keys and WASD support

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 2048_project
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/game2048
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env file
   ```

6. **Run the application**
   ```bash
   # Development mode (runs both backend and frontend)
   npm run dev
   
   # Or run separately:
   # Backend only
   npm run server
   
   # Frontend only (in another terminal)
   npm run client
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 How to Play

1. **Objective**: Combine tiles with the same number to reach 2048
2. **Controls**:
   - **Keyboard**: Use arrow keys or WASD
   - **Mobile**: Swipe in the desired direction
3. **Game Mechanics**:
   - Tiles with the same number merge when they collide
   - After each move, a new tile (2 or 4) appears randomly
   - Game ends when you reach 2048 or no moves are possible
4. **Scoring**: Points are awarded for merged tiles (sum of merged values)

## 🏗️ Architecture

### Backend (Node.js + Express + MongoDB)
```
server.js                 # Main server file
├── models/
│   ├── Game.js          # Game state model
│   └── Score.js         # Score/leaderboard model
├── routes/
│   ├── games.js         # Game CRUD operations
│   └── scores.js        # Score management
└── utils/
    └── gameLogic.js     # Core game logic (functional programming)
```

### Frontend (React.js)
```
client/src/
├── components/
│   ├── Game.js          # Main game component
│   ├── GameBoard.js     # Game board rendering
│   ├── GameTile.js      # Individual tile component
│   ├── GameControls.js  # Game controls
│   ├── ScoreDisplay.js  # Score display
│   ├── Leaderboard.js   # Leaderboard component
│   └── Navbar.js        # Navigation
├── services/
│   └── api.js           # API service layer
└── App.js               # Main app component
```

## 🔧 API Endpoints

### Games
- `POST /api/games` - Create new game
- `GET /api/games/:id` - Get game state
- `PUT /api/games/:id/move` - Make a move
- `PUT /api/games/:id/reset` - Reset game

### Scores
- `POST /api/scores` - Submit score
- `GET /api/scores/leaderboard` - Get leaderboard
- `GET /api/scores/board/:boardSize` - Get scores by board size

## 🎨 Technical Highlights

### Functional Programming Principles
- Pure functions for game logic
- Immutable data structures
- Higher-order functions for board operations
- No side effects in core game logic

### Modern React Patterns
- Hooks for state management
- Custom hooks for game logic
- Context API for global state
- Component composition

### Responsive Design
- Material-UI components
- Mobile-first approach
- Touch gesture support
- Smooth animations with Framer Motion

## 🚀 Deployment

### Heroku Deployment
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Connect to GitHub repository
4. Enable automatic deployments

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_production_jwt_secret
```

## 🧪 Testing

```bash
# Run backend tests
npm test

# Run frontend tests
cd client
npm test
```

## 📱 Mobile Support

The game is fully responsive and supports:
- Touch gestures (swipe to move)
- Mobile-optimized UI
- Responsive board sizing
- Touch-friendly controls

## 🎮 Game Features

### Board Sizes
- **3x3**: Quick games, easier to reach 2048
- **4x4**: Classic 2048 experience
- **5x5**: More challenging, longer games
- **6x6**: Expert mode, very challenging

### Scoring System
- Points awarded for merged tiles
- Best score tracking
- Global leaderboard
- Achievement tracking (reaching 2048)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Original 2048 game by Gabriele Cirulli
- Material-UI for the component library
- Framer Motion for animations
- React community for excellent documentation

## 🔗 Live Demo

[Deploy your own version or use the provided deployment link]

---

**Enjoy playing 2048! 🎮**
