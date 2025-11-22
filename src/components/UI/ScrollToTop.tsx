import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;

            setScrollProgress(progress);
            setIsVisible(scrollTop > 300);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-6 z-[9998] bg-primary hover:bg-primary/80 text-white rounded-full p-3 sm:p-4 shadow-2xl transition-all duration-300 flex items-center justify-center group"
                    aria-label="Scroll to top"
                >
                    {/* Progress circle */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="4"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="white"
                            strokeWidth="4"
                            strokeDasharray={`${2 * Math.PI * 45}`}
                            strokeDashoffset={`${2 * Math.PI * 45 * (1 - scrollProgress / 100)}`}
                            className="transition-all duration-200"
                        />
                    </svg>

                    {/* Icon */}
                    <FaArrowUp className="text-lg sm:text-xl relative z-10" />

                    {/* Percentage tooltip */}
                    <span className="absolute bottom-full mb-2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        {Math.round(scrollProgress)}% scrolled
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
