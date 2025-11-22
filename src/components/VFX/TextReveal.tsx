import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    const words = children.split(' ');

    return (
        <div ref={ref} className={className}>
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    className="inline-block mr-2"
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={isInView ? {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)'
                    } : {}}
                    transition={{
                        duration: 0.5,
                        delay: delay + index * 0.05,
                        ease: [0.25, 0.4, 0.25, 1]
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </div>
    );
};

export default TextReveal;
