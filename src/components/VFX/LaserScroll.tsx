import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const LaserScroll: React.FC = () => {
    const { scrollYProgress } = useScroll();

    // Transform scroll progress to vertical position (0-100%)
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <>
            {/* Main laser beam */}
            <motion.div
                className="fixed left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent z-40 pointer-events-none"
                style={{ top: y }}
            />

            {/* Glow effect */}
            <motion.div
                className="fixed left-0 right-0 h-2 bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-md z-39 pointer-events-none"
                style={{ top: y }}
            />

            {/* Scan lines */}
            <motion.div
                className="fixed left-0 right-0 pointer-events-none z-38"
                style={{ top: y }}
            >
                <div className="relative h-20">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute left-0 right-0 h-px bg-accent/20"
                            style={{ top: `${i * 20}px` }}
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.1
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Left indicator */}
            <motion.div
                className="fixed left-0 w-8 h-8 border-l-2 border-t-2 border-accent z-40 pointer-events-none"
                style={{ top: y, marginTop: '-16px' }}
            />

            {/* Right indicator */}
            <motion.div
                className="fixed right-0 w-8 h-8 border-r-2 border-t-2 border-accent z-40 pointer-events-none"
                style={{ top: y, marginTop: '-16px' }}
            />
        </>
    );
};

export default LaserScroll;
