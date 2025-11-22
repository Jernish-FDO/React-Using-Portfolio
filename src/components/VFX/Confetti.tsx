import React, { useEffect, useState } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    color: string;
    size: number;
}

interface ConfettiProps {
    onComplete?: () => void;
    duration?: number;
    particleCount?: number;
}

const colors = ['#0ea5e9', '#6366f1', '#f472b6', '#10b981', '#f59e0b', '#ef4444'];

const Confetti: React.FC<ConfettiProps> = ({
    onComplete,
    duration = 3000,
    particleCount = 150
}) => {
    const [particles, setParticles] = useState<Particle[]>(() => {
        const initParticles: Particle[] = [];
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * window.innerWidth;
            const y = -20 - Math.random() * 100;
            const vx = (Math.random() - 0.5) * 4;
            const vy = Math.random() * 3 + 2;
            const rotation = Math.random() * 360;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 10 + 5;

            initParticles.push({ id: i, x, y, vx, vy, rotation, color, size });
        }
        return initParticles;
    });
    const [isAnimating, setIsAnimating] = useState(true);

    // Animation loop
    useEffect(() => {
        if (!isAnimating) return;

        let animationFrameId: number;
        const gravity = 0.3;

        const animate = () => {
            setParticles((prevParticles) =>
                prevParticles.map((particle) => ({
                    ...particle,
                    x: particle.x + particle.vx,
                    y: particle.y + particle.vy,
                    vy: particle.vy + gravity,
                    rotation: particle.rotation + particle.vx * 2,
                }))
            );

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isAnimating]);

    // Stop animation and call onComplete after duration
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false);
            if (onComplete) {
                onComplete();
            }
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onComplete]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999]" aria-hidden="true">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute"
                    style={{
                        left: `${particle.x}px`,
                        top: `${particle.y}px`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: particle.color,
                        transform: `rotate(${particle.rotation}deg)`,
                        opacity: particle.y > window.innerHeight ? 0 : 1,
                        transition: 'opacity 0.3s',
                    }}
                />
            ))}
        </div>
    );
};

export default Confetti;
