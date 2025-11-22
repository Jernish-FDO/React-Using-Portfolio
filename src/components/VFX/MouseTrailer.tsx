import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
}

const MouseTrailer: React.FC = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isEnabled, setIsEnabled] = useState(true);

    useEffect(() => {
        // Toggle with Ctrl+Shift+M
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.code === 'KeyM') {
                e.preventDefault();
                setIsEnabled((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (!isEnabled) return;

        let animationFrameId: number;
        let lastTime = Date.now();

        const handleMouseMove = (e: MouseEvent) => {
            const currentTime = Date.now();

            // Throttle particle creation (every 50ms)
            if (currentTime - lastTime > 50) {
                const colors = ['#0ea5e9', '#6366f1', '#f472b6', '#10b981'];
                const newParticle: Particle = {
                    id: Date.now() + Math.random(),
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 6 + 3,
                    color: colors[Math.floor(Math.random() * colors.length)]
                };

                setParticles((prev) => [...prev.slice(-15), newParticle]);
                lastTime = currentTime;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isEnabled]);

    if (!isEnabled) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[99998]">
            <AnimatePresence>
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full"
                        style={{
                            left: particle.x,
                            top: particle.y,
                            width: particle.size,
                            height: particle.size,
                            backgroundColor: particle.color,
                            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
                        }}
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 0, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        onAnimationComplete={() => {
                            setParticles((prev) => prev.filter((p) => p.id !== particle.id));
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default MouseTrailer;
