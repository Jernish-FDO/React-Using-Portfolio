import React, { useEffect, useState } from 'react';

const NoiseTexture: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Toggle with Ctrl+Shift+N
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.code === 'KeyN') {
                e.preventDefault();
                setIsVisible((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat'
            }}
        />
    );
};

export default NoiseTexture;
