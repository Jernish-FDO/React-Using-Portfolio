import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingTextProps {
    text: string | string[];
    speed?: number;
    className?: string;
    repeat?: boolean;
    repeatDelay?: number;
}

const TypingText: React.FC<TypingTextProps> = ({
    text,
    speed = 100,
    className = "",
    repeat = true,
    repeatDelay = 2000
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [textArrayIndex, setTextArrayIndex] = useState(0);

    useEffect(() => {
        const currentString = Array.isArray(text) ? text[textArrayIndex] : text;

        const handleTyping = () => {
            if (!isDeleting) {
                if (currentIndex < currentString.length) {
                    setDisplayedText(prev => prev + currentString[currentIndex]);
                    setCurrentIndex(prev => prev + 1);
                } else if (repeat) {
                    setTimeout(() => setIsDeleting(true), repeatDelay);
                }
            } else {
                if (currentIndex > 0) {
                    setDisplayedText(prev => prev.slice(0, -1));
                    setCurrentIndex(prev => prev - 1);
                } else {
                    setIsDeleting(false);
                    if (Array.isArray(text)) {
                        setTextArrayIndex(prev => (prev + 1) % text.length);
                    }
                }
            }
        };

        const timer = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);

        return () => clearTimeout(timer);
    }, [currentIndex, isDeleting, text, speed, repeat, repeatDelay, textArrayIndex]);

    return (
        <span className={className}>
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"
            />
        </span>
    );
};

export default TypingText;
