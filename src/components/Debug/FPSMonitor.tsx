import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DraggableComponent from '../UI/DraggableComponent';

const FPSMonitor: React.FC = () => {
    const [fps, setFps] = useState(60);
    const [isVisible, setIsVisible] = useState(false);
    const [frameCount, setFrameCount] = useState(0);
    const [lastTime, setLastTime] = useState(() => performance.now());

    useEffect(() => {
        // Toggle with Ctrl+Shift+F
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.code === 'KeyF') {
                e.preventDefault();
                setIsVisible((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let animationFrameId: number;

        const measureFPS = () => {
            const now = performance.now();
            const delta = now - lastTime;

            setFrameCount((prev) => prev + 1);

            // Update FPS every second
            if (delta >= 1000) {
                setFps(Math.round((frameCount * 1000) / delta));
                setFrameCount(0);
                setLastTime(now);
            }

            animationFrameId = requestAnimationFrame(measureFPS);
        };

        animationFrameId = requestAnimationFrame(measureFPS);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isVisible, frameCount, lastTime]);

    if (!isVisible) return null;

    const getFPSColor = () => {
        if (fps >= 55) return 'text-green-500';
        if (fps >= 30) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getMemoryUsage = () => {
        const memory = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory;
        if (memory) {
            const used = memory.usedJSHeapSize / 1048576;
            return `${used.toFixed(1)} MB`;
        }
        return 'N/A';
    };

    return (
        <DraggableComponent
            initialPosition={{ x: window.innerWidth - 220, y: 80 }}
            className="fixed z-[9999]"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-black/90 backdrop-blur-md border border-primary/50 rounded-lg p-4 font-mono text-xs shadow-2xl"
            >
                <div className="flex flex-col gap-2 min-w-[150px]">
                    <div className="text-primary font-bold border-b border-primary/30 pb-2 mb-2 flex items-center justify-between">
                        <span>Performance Monitor</span>
                        <span className="text-[8px] text-gray-500">Drag to move</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">FPS:</span>
                        <span className={`font-bold text-lg ${getFPSColor()}`}>
                            {fps}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Memory:</span>
                        <span className="text-white">{getMemoryUsage()}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Render:</span>
                        <span className="text-white">{(1000 / fps).toFixed(1)}ms</span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-primary/30 text-gray-500 text-[10px]">
                        Press Ctrl+Shift+F to hide
                    </div>
                </div>
            </motion.div>
        </DraggableComponent>
    );
};

export default FPSMonitor;

