import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaMicrochip, FaRocket } from 'react-icons/fa';

interface TimelineEvent {
    id: string;
    year: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const events: TimelineEvent[] = [
    {
        id: '1',
        year: '2020',
        title: 'Started ECE Journey',
        description: 'Began studying Electronics & Communication Engineering, diving deep into circuit design and digital systems.',
        icon: <FaMicrochip />,
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: '2',
        year: '2021',
        title: 'First IoT Project',
        description: 'Built an autonomous line follower and home automation system using Arduino and ESP32.',
        icon: <FaRocket />,
        color: 'from-purple-500 to-pink-500'
    },
    {
        id: '3',
        year: '2022',
        title: 'Web Development',
        description: 'Discovered passion for web development. Started building full-stack applications with React and Node.js.',
        icon: <FaCode />,
        color: 'from-orange-500 to-red-500'
    },
    {
        id: '4',
        year: '2023',
        title: 'Full Stack Developer',
        description: 'Completed diploma in ECE. Now building the bridge from Silicon to Screen as a Full Stack Developer.',
        icon: <FaGraduationCap />,
        color: 'from-green-500 to-emerald-500'
    }
];

const InteractiveTimeline: React.FC = () => {
    const [activeEvent, setActiveEvent] = useState<string | null>(events[events.length - 1].id);

    return (
        <section id="timeline" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-[8%] relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-center px-2">
                    My Journey
                </h2>
                <p className="text-text-muted text-center mb-10 sm:mb-12 md:mb-16 max-w-2xl mx-auto text-sm sm:text-base px-4">
                    From silicon circuits to software solutions - the evolution of a developer
                </p>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-secondary hidden md:block" />

                    {/* Events */}
                    <div className="space-y-12">
                        {events.map((event, index) => {
                            const isActive = activeEvent === event.id;
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                                        } flex-col gap-8`}
                                >
                                    {/* Content */}
                                    <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} text-center`}>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            onClick={() => setActiveEvent(event.id)}
                                            className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${isActive
                                                ? 'border-primary bg-primary/10 shadow-[0_0_30px_rgba(56,189,248,0.3)]'
                                                : 'border-border bg-background/50 hover:border-primary/50'
                                                }`}
                                        >
                                            <div className={`inline-block bg-gradient-to-r ${event.color} text-white px-4 py-1 rounded-full text-sm font-bold mb-3`}>
                                                {event.year}
                                            </div>
                                            <h3 className="text-xl sm:text-2xl font-bold mb-2">{event.title}</h3>
                                            <p className="text-text-muted text-sm sm:text-base">{event.description}</p>
                                        </motion.div>
                                    </div>

                                    {/* Center icon */}
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 360 }}
                                        transition={{ duration: 0.3 }}
                                        className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center text-white text-2xl shadow-lg cursor-pointer`}
                                        onClick={() => setActiveEvent(event.id)}
                                    >
                                        {event.icon}
                                        {isActive && (
                                            <motion.div
                                                className="absolute inset-0 rounded-full bg-white/30"
                                                initial={{ scale: 1, opacity: 1 }}
                                                animate={{ scale: 1.5, opacity: 0 }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                            />
                                        )}
                                    </motion.div>

                                    {/* Spacer for layout */}
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default InteractiveTimeline;
