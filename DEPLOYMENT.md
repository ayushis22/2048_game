# Deployment Guide

## 🚀 Heroku Deployment

### Prerequisites
- Heroku CLI installed
- Git repository
- MongoDB Atlas account (recommended)

### Steps

1. **Create Heroku App**
   ```bash
   heroku create your-2048-game-app
   ```

2. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   heroku config:set JWT_SECRET=your_production_jwt_secret
   ```

3. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy 2048 game"
   git push heroku main
   ```

4. **Open App**
   ```bash
   heroku open
   ```

## 🌐 Vercel Deployment (Frontend Only)

### Steps

1. **Build the React app**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npx vercel --prod
   ```

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/

# Install dependencies
RUN npm install
RUN cd client && npm install

# Copy source code
COPY . .

# Build React app
RUN cd client && npm run build

# Expose port
EXPOSE 5000

# Start application
CMD ["npm", "start"]
```

### Docker Commands
```bash
# Build image
docker build -t 2048-game .

# Run container
docker run -p 5000:5000 -e MONGODB_URI=your_mongodb_uri 2048-game
```

## ☁️ MongoDB Atlas Setup

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to your users

3. **Get Connection String**
   - Go to "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

4. **Update Environment Variables**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/game2048?retryWrites=true&w=majority
   ```

## 🔧 Environment Variables

### Development
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/game2048
JWT_SECRET=your_development_secret
```

### Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/game2048
JWT_SECRET=your_strong_production_secret
```

## 📱 Mobile App Deployment

### React Native (Future Enhancement)
- Use Expo or React Native CLI
- Convert React components to React Native
- Add native mobile features

### PWA (Progressive Web App)
- Add service worker
- Enable offline functionality
- Add app manifest

## 🔍 Monitoring and Analytics

### Recommended Tools
- **Heroku**: Built-in metrics and logs
- **MongoDB Atlas**: Database monitoring
- **Google Analytics**: User analytics
- **Sentry**: Error tracking

### Health Checks
```javascript
// Add to server.js
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check MONGODB_URI format
   - Verify network access in MongoDB Atlas
   - Check firewall settings

2. **Build Failures**
   - Ensure all dependencies are installed
   - Check Node.js version compatibility
   - Verify environment variables

3. **CORS Issues**
   - Update CORS settings in server.js
   - Check allowed origins

### Debug Commands
```bash
# Check logs
heroku logs --tail

# Check environment variables
heroku config

# Restart app
heroku restart
```

## 📊 Performance Optimization

### Backend
- Enable gzip compression
- Add Redis for caching
- Optimize database queries
- Add rate limiting

### Frontend
- Enable code splitting
- Add service worker caching
- Optimize images
- Minify CSS/JS

## 🔒 Security Considerations

- Use HTTPS in production
- Validate all inputs
- Implement rate limiting
- Use secure JWT secrets
- Enable CORS properly
- Sanitize user inputs
