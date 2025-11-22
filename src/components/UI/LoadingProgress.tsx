import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingProgress: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                // Accelerate towards the end
                const increment = prev < 60 ? 15 : prev < 90 ? 10 : 5;
                return Math.min(prev + increment, 100);
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[10002] bg-background flex items-center justify-center"
                >
                    <div className="max-w-md w-full px-8">
                        {/* Logo/Title */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-8"
                        >
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2">
                                JERNISH.OS
                            </h1>
                            <p className="text-text-muted font-mono text-sm">
                                Initializing System...
                            </p>
                        </motion.div>

                        {/* Progress Bar */}
                        <div className="relative">
                            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-primary via-accent to-secondary"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                />
                            </div>

                            {/* Glow effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: progress > 0 ? 1 : 0 }}
                            />
                        </div>

                        {/* Percentage */}
                        <motion.div
                            className="text-center mt-4 text-2xl font-bold text-primary font-mono"
                            key={progress}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.15 }}
                        >
                            {progress}%
                        </motion.div>

                        {/* Loading messages */}
                        <div className="mt-8 text-center text-text-muted text-sm font-mono">
                            {progress < 30 && '⚡ Loading components...'}
                            {progress >= 30 && progress < 60 && '🎨 Rendering interface...'}
                            {progress >= 60 && progress < 90 && '🚀 Optimizing performance...'}
                            {progress >= 90 && '✨ Almost ready...'}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingProgress;
