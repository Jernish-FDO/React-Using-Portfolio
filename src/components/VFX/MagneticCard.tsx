import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticCardProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
}

const MagneticCard: React.FC<MagneticCardProps> = ({
    children,
    className = '',
    strength = 30
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const ySpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(ySpring, [-100, 100], [10, -10]);
    const rotateY = useTransform(xSpring, [-100, 100], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Apply magnetic effect when close to center
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        const maxDistance = 200;

        if (distance < maxDistance) {
            const magneticStrength = 1 - distance / maxDistance;
            x.set(distanceX * magneticStrength * (strength / 30));
            y.set(distanceY * magneticStrength * (strength / 30));
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                x: xSpring,
                y: ySpring,
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d'
            }}
            className={`${className} transition-shadow duration-300`}
        >
            {children}
        </motion.div>
    );
};

export default MagneticCard;
