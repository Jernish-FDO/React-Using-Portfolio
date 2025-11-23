import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if the target or its parent is a link or button or has specific class
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('nav-hover') ||
                target.closest('.nav-hover')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Only render on devices with fine pointer (mouse)
    const [isFinePointer, setIsFinePointer] = useState(() => window.matchMedia('(pointer: fine)').matches);

    useEffect(() => {
        const mql = window.matchMedia('(pointer: fine)');
        const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    if (!isFinePointer) return null;

    return (
        <>
            {/* Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[99999999] shadow-[0_0_10px_var(--primary)] will-change-transform"
                animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
                transition={{ type: 'tween', ease: 'linear', duration: 0 }}
            />

            {/* Outline */}
            <motion.div
                className={`fixed top-0 left-0 border border-primary rounded-full pointer-events-none z-[9999999] transition-colors duration-300 will-change-transform ${isHovering ? 'bg-primary/10 border-transparent mix-blend-screen' : ''
                    }`}
                animate={{
                    x: mousePosition.x - (isHovering ? 35 : 20),
                    y: mousePosition.y - (isHovering ? 35 : 20),
                    width: isHovering ? 70 : 40,
                    height: isHovering ? 70 : 40,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
            />
        </>
    );
};

export default Cursor;
