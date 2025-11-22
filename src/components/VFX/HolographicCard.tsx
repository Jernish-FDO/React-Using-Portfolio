import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface HolographicCardProps {
    children: React.ReactNode;
    className?: string;
}

const HolographicCard: React.FC<HolographicCardProps> = ({ children, className = '' }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        setRotation({ x: rotateX, y: rotateY });
        setGlarePosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setGlarePosition({ x: 50, y: 50 });
    };

    return (
        <motion.div
            ref={cardRef}
            className={`relative overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transition: 'transform 0.1s ease-out'
            }}
        >
            {/* Holographic gradient overlay */}
            <div
                className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(
                            circle at ${glarePosition.x}% ${glarePosition.y}%,
                            rgba(255, 255, 255, 0.8) 0%,
                            rgba(56, 189, 248, 0.4) 25%,
                            rgba(168, 85, 247, 0.4) 50%,
                            rgba(236, 72, 153, 0.4) 75%,
                            transparent 100%
                        )
                    `
                }}
            />

            {/* Rainbow edge glow */}
            <div className="absolute inset-0 opacity-0 hover:opacity-50 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary blur-xl" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default HolographicCard;
