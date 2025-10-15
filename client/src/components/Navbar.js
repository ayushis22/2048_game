import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar 
      position="static" 
      sx={{ 
        mb: 4,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.8rem'
            }}
          >
            🎮 2048 Game
          </Typography>
        </motion.div>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              component={Link}
              to="/"
              sx={{ 
                mr: 2,
                px: 3,
                py: 1,
                borderRadius: 3,
                fontWeight: 600,
                fontSize: '1rem',
                background: location.pathname === '/' 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                  : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                textTransform: 'none',
                '&:hover': {
                  background: location.pathname === '/' 
                    ? 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)' 
                    : 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                }
              }}
            >
              🎯 Game
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              component={Link}
              to="/leaderboard"
              sx={{
                px: 3,
                py: 1,
                borderRadius: 3,
                fontWeight: 600,
                fontSize: '1rem',
                background: location.pathname === '/leaderboard' 
                  ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' 
                  : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                textTransform: 'none',
                '&:hover': {
                  background: location.pathname === '/leaderboard' 
                    ? 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)' 
                    : 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                }
              }}
            >
              🏆 Leaderboard
            </Button>
          </motion.div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
