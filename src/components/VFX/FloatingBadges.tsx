import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaCode, FaMicrochip, FaRocket, FaStar } from 'react-icons/fa';
import DraggableComponent from '../UI/DraggableComponent';

interface Badge {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}

const badges: Badge[] = [
    {
        id: 'ece-expert',
        icon: <FaMicrochip />,
        title: 'ECE Expert',
        description: 'Electronics & Communication Engineer',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: 'full-stack',
        icon: <FaCode />,
        title: 'Full Stack Master',
        description: 'Frontend + Backend Developer',
        color: 'from-purple-500 to-pink-500'
    },
    {
        id: 'innovator',
        icon: <FaRocket />,
        title: 'Innovator',
        description: 'Creative Problem Solver',
        color: 'from-orange-500 to-red-500'
    },
    {
        id: 'perfectionist',
        icon: <FaStar />,
        title: 'Perfectionist',
        description: 'Attention to Detail',
        color: 'from-yellow-500 to-amber-500'
    },
    {
        id: 'achiever',
        icon: <FaTrophy />,
        title: 'High Achiever',
        description: 'Multiple Projects Completed',
        color: 'from-green-500 to-emerald-500'
    }
];

const FloatingBadges: React.FC = () => {
    const [currentBadge, setCurrentBadge] = useState(0);
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Show first badge after 2 seconds
        const initialTimeout = setTimeout(() => {
            setShow(true);
        }, 2000);

        return () => clearTimeout(initialTimeout);
    }, []);

    useEffect(() => {
        if (!show) return;

        // Show each badge for 4 seconds, then cycle
        const interval = setInterval(() => {
            setShow(false);
            setTimeout(() => {
                setCurrentBadge((prev) => (prev + 1) % badges.length);
                setShow(true);
            }, 500);
        }, 4000);

        return () => clearInterval(interval);
    }, [show]);

    const badge = badges[currentBadge];

    return (
        <AnimatePresence>
            {show && (
                <DraggableComponent
                    initialPosition={{ x: 16, y: window.innerHeight - 150 }}
                    className="fixed z-50"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="relative"
                    >
                        <div className={`bg-gradient-to-br ${badge.color} p-4 rounded-xl shadow-2xl max-w-xs`}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="text-3xl text-white">
                                    {badge.icon}
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">{badge.title}</h3>
                                    <p className="text-white/90 text-sm">{badge.description}</p>
                                </div>
                            </div>
                            <div className="w-full bg-white/30 rounded-full h-1">
                                <motion.div
                                    className="bg-white h-full rounded-full"
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 4, ease: 'linear' }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </DraggableComponent>
            )}
        </AnimatePresence>
    );
};

export default FloatingBadges;
