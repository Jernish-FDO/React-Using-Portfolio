import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className, onClick, href }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const content = (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x * 0.5, y: position.y * 0.5 }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );

    if (href) {
        return <a href={href} className="inline-block">{content}</a>;
    }

    return content;
};

export default MagneticButton;
