import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaTimes, FaLock } from 'react-icons/fa';
import { useAchievements } from '../../context/AchievementContext';

const AchievementGallery: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { achievements, unlockedCount, totalCount } = useAchievements();

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleOpen}
                className="fixed bottom-6 left-20 z-[9998] bg-bg-card/80 backdrop-blur-md border border-border text-text-main p-3 rounded-full shadow-lg hover:border-primary transition-colors group ml-2"
                aria-label="Achievements"
            >
                <FaTrophy className="text-xl group-hover:text-yellow-400 transition-colors" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full">
                    {unlockedCount}
                </span>
            </motion.button>

            {/* Gallery Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="fixed inset-0 m-auto z-[9999] w-[90vw] max-w-2xl h-[80vh] bg-bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-border flex items-center justify-between bg-primary/5">
                                <div>
                                    <h2 className="text-2xl font-bold text-text-main flex items-center gap-3">
                                        <FaTrophy className="text-yellow-400" />
                                        Achievements
                                    </h2>
                                    <p className="text-text-muted text-sm mt-1">
                                        Unlocked: {unlockedCount} / {totalCount}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-text-muted hover:text-text-main transition-colors rounded-full hover:bg-white/5"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-2 bg-white/5 w-full">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-primary to-accent"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            </div>

                            {/* Grid */}
                            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {achievements.map((achievement) => (
                                    <motion.div
                                        key={achievement.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-4 rounded-xl border transition-all duration-300 ${achievement.unlocked
                                                ? 'bg-primary/10 border-primary/30 shadow-lg shadow-primary/10'
                                                : 'bg-white/5 border-white/5 opacity-70 grayscale'
                                            }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${achievement.unlocked ? 'bg-primary/20' : 'bg-white/10'
                                                }`}>
                                                {achievement.unlocked ? achievement.icon : <FaLock className="text-sm opacity-50" />}
                                            </div>
                                            <div>
                                                <h3 className={`font-bold ${achievement.unlocked ? 'text-text-main' : 'text-text-muted'}`}>
                                                    {achievement.title}
                                                </h3>
                                                <p className="text-sm text-text-muted mt-1">
                                                    {achievement.description}
                                                </p>
                                                {achievement.unlocked && achievement.unlockedAt && (
                                                    <p className="text-[10px] text-primary mt-2 opacity-70">
                                                        Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default AchievementGallery;
