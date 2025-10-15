#!/bin/bash

# 2048 Game MERN Stack Startup Script

echo "🎮 Starting 2048 Game - MERN Stack Implementation"
echo "=================================================="

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   mongod"
    echo ""
    echo "   Or use MongoDB Atlas (cloud) and update MONGODB_URI in .env"
    echo ""
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOL
PORT=5000
MONGODB_URI=mongodb://localhost:27017/game2048
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
EOL
    echo "✅ .env file created. You can modify it as needed."
    echo ""
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd client && npm install && cd ..
fi

echo "🚀 Starting the application..."
echo "   Backend: http://localhost:5000"
echo "   Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the application"
echo ""

# Start the application
npm run dev
