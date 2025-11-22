import React, { useEffect, useRef } from 'react';

const CodeRainBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Characters - ECE themed with binary and circuit symbols
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン∧∨⊕⊗→←↑↓';
        const fontSize = 16;
        const columns = canvas.width / fontSize;

        // Initialize drops
        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }

        // Animation
        const draw = () => {
            // Semi-transparent black to create fade effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const char = chars[Math.floor(Math.random() * chars.length)];

                // Gradient color (cyan to green)
                const gradient = ctx.createLinearGradient(
                    i * fontSize,
                    drops[i] * fontSize,
                    i * fontSize,
                    (drops[i] + 1) * fontSize
                );
                gradient.addColorStop(0, 'rgba(56, 189, 248, 0.8)'); // primary
                gradient.addColorStop(1, 'rgba(34, 197, 94, 0.3)');

                ctx.fillStyle = gradient;
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);

                // Reset drop randomly
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-20"
        />
    );
};

export default CodeRainBackground;
