import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAchievements } from '../../context/AchievementContext';
import { useSound } from '../../hooks/useSound';

const WelcomeModal: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { unlockAchievement } = useAchievements();
    const { playHover, playClick } = useSound();

    useEffect(() => {
        const hasVisited = localStorage.getItem('has_visited_portfolio');
        if (!hasVisited) {
            // Small delay to ensure everything is loaded
            const timer = setTimeout(() => setIsVisible(true), 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleEnter = () => {
        playClick();
        setIsVisible(false);
        localStorage.setItem('has_visited_portfolio', 'true');

        // Unlock achievement after a short delay for effect
        setTimeout(() => {
            unlockAchievement('first_steps');
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.8 }}
                        className="relative max-w-lg w-[90%] bg-bg-card border border-primary/30 rounded-3xl p-8 shadow-2xl shadow-primary/20 text-center overflow-hidden"
                    >
                        {/* Background Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
                                Welcome
                            </h1>
                            <p className="text-xl text-text-main mb-2">
                                to Jernish's Portfolio
                            </p>
                            <p className="text-text-muted mb-8 text-sm leading-relaxed">
                                Experience a developer portfolio built with passion,
                                featuring interactive elements, hidden secrets, and
                                advanced customization.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col gap-4"
                        >
                            <button
                                onClick={handleEnter}
                                onMouseEnter={() => playHover()}
                                className="group relative px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/40"
                            >
                                <span className="relative z-10">Enter Portfolio</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>

                            <p className="text-[10px] text-text-muted opacity-50">
                                Tip: Try typing the Konami Code...
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WelcomeModal;
