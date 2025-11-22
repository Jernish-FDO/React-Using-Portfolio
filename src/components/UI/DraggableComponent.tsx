import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DraggableComponentProps {
    children: React.ReactNode;
    initialPosition?: { x: number; y: number };
    className?: string;
    dragConstraints?: {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    };
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
    children,
    initialPosition = { x: 0, y: 0 },
    className = '',
    dragConstraints
}) => {
    const [isDragging, setIsDragging] = useState(false);

    return (
        <motion.div
            drag
            dragMomentum={false}
            dragElastic={0.1}
            dragConstraints={dragConstraints || {
                top: -window.innerHeight / 2,
                left: -window.innerWidth / 2,
                right: window.innerWidth / 2,
                bottom: window.innerHeight / 2,
            }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            initial={initialPosition}
            whileDrag={{ scale: 1.05, zIndex: 100000 }}
            className={`${className} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
                cursor: isDragging ? 'grabbing' : 'grab',
                touchAction: 'none',
            }}
        >
            {/* Drag indicator */}
            <div className="absolute top-2 right-2 text-primary opacity-50 hover:opacity-100 transition-opacity pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="4" cy="4" r="1.5" />
                    <circle cx="12" cy="4" r="1.5" />
                    <circle cx="4" cy="12" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="8" cy="8" r="1.5" />
                </svg>
            </div>

            {children}
        </motion.div>
    );
};

export default DraggableComponent;
