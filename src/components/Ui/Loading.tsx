// src/Components/Ui/Loading.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
}

const Loading: React.FC<LoadingProps> = ({ size = 'medium' }) => {
  const sizeClass = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  };

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`relative ${sizeClass[size]}`}>
        <motion.div
          className="absolute inset-0 border-4 border-transparent border-t-purple-600 border-r-purple-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-2 border-4 border-transparent border-b-purple-400 border-l-purple-400 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-purple-500 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
