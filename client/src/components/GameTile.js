import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const GameTile = ({ value, color, textColor, size, gameStatus }) => {
  const isVisible = value > 0;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ 
        scale: isVisible ? 1 : 0,
        rotate: isVisible ? 0 : 180
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: isVisible ? 1.05 : 1,
        transition: { duration: 0.2 }
      }}
    >
      <Box
        sx={{
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: 0.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isVisible ? '0 2px 4px rgba(0,0,0,0.15)' : 'none',
          border: isVisible ? '1px solid rgba(0,0,0,0.1)' : 'none',
          position: 'relative',
          overflow: 'hidden',
          fontWeight: 'bold',
        }}
      >
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: textColor,
                fontSize: value >= 1000 ? '0.7rem' : value >= 100 ? '0.8rem' : '1rem',
                textAlign: 'center',
                lineHeight: 1,
              }}
            >
              {value}
            </Typography>
          </motion.div>
        )}
        
        {/* Special effect for 2048 tile */}
        {value === 2048 && (
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
              borderRadius: 'inherit',
            }}
          />
        )}
      </Box>
    </motion.div>
  );
};

export default GameTile;
