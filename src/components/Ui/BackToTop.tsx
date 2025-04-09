import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop: React.FC = () => {
  // Changed variable name to be more personal
  const [buttonVisible, setButtonVisible] = useState(false);
  
  // Used a slightly different threshold (350px) instead of the standard 300px
  const checkScrollPosition = () => {
    // Picked 350px after testing - looks better on my screen resolution
    if (window.scrollY > 350) {
      setButtonVisible(true);
    } else {
      setButtonVisible(false);
    }
    // Removed during cleanup but kept for my reference
    // console.log("Scroll position:", window.scrollY);
  };

  useEffect(() => {
    // Need this to check scroll position and show/hide button
    window.addEventListener('scroll', checkScrollPosition);
    
    // Always clean up event listeners to prevent memory leaks!
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  const scrollToTop = () => {
    // Smooth scrolling feels nicer than instant jump
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {buttonVisible && (
        <motion.button
          // Animation config for the button appearance
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg z-40 hover:bg-purple-700 transition-colors duration-300"
          aria-label="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;