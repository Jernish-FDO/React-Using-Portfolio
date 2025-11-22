import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useAchievements } from '../../context/AchievementContext';

const ScrollProgress: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const { unlockAchievement } = useAchievements();

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            if (latest > 0.99) {
                unlockAchievement('scroll_master');
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, unlockAchievement]);

    const [particles, setParticles] = useState<{ id: number; x: number }[]>([]);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            // Create particles occasionally
            if (Math.random() > 0.95) {
                const newParticle = {
                    id: Date.now(),
                    x: latest * 100
                };
                setParticles((prev) => [...prev, newParticle].slice(-5));
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <>
            {/* Main progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary origin-left z-[9999]"
                style={{ scaleX }}
            />

            {/* Glow effect */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-accent/50 to-secondary/50 origin-left z-[9998] blur-sm"
                style={{ scaleX }}
            />

            {/* Particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="fixed top-0 w-2 h-2 bg-accent rounded-full z-[10000]"
                    initial={{ x: `${particle.x}%`, y: 0, opacity: 1, scale: 1 }}
                    animate={{ y: 20, opacity: 0, scale: 0 }}
                    transition={{ duration: 1 }}
                    onAnimationComplete={() => {
                        setParticles((prev) => prev.filter((p) => p.id !== particle.id));
                    }}
                />
            ))}
        </>
    );
};

export default ScrollProgress;
