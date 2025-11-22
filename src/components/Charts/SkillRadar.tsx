import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Skill {
    name: string;
    level: number; // 0-100
}

const skills: Skill[] = [
    { name: 'Frontend', level: 90 },
    { name: 'Backend', level: 80 },
    { name: 'ECE/Hardware', level: 85 },
    { name: 'IoT', level: 75 },
    { name: 'Database', level: 80 },
    { name: 'DevOps', level: 65 }
];

const SkillRadar: React.FC = () => {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [animated, setAnimated] = useState(false);

    const centerX = 200;
    const centerY = 200;
    const radius = 150;
    const levels = 5;

    useEffect(() => {
        // Trigger animation on mount
        const timer = setTimeout(() => setAnimated(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Calculate polygon points
    const getPolygonPoints = (skillLevels: number[]) => {
        return skillLevels
            .map((level, i) => {
                const angle = (Math.PI * 2 * i) / skills.length - Math.PI / 2;
                const r = (radius * level) / 100;
                const x = centerX + r * Math.cos(angle);
                const y = centerY + r * Math.sin(angle);
                return `${x},${y}`;
            })
            .join(' ');
    };

    // Calculate axis line endpoints
    const getAxisPoints = (index: number) => {
        const angle = (Math.PI * 2 * index) / skills.length - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return { x, y, angle };
    };

    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-[8%]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-center px-2">
                    Skill Distribution
                </h2>
                <p className="text-text-muted text-center mb-10 sm:mb-12 md:mb-16 text-sm sm:text-base px-4">
                    A comprehensive view of my technical expertise
                </p>

                <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 md:gap-12">
                    {/* Radar Chart */}
                    <div className="flex-1 flex justify-center">
                        <svg
                            width="400"
                            height="400"
                            viewBox="0 0 400 400"
                            className="max-w-full h-auto"
                        >
                            {/* Background circles */}
                            {[...Array(levels)].map((_, i) => {
                                const r = (radius / levels) * (i + 1);
                                return (
                                    <circle
                                        key={i}
                                        cx={centerX}
                                        cy={centerY}
                                        r={r}
                                        fill="none"
                                        stroke="rgba(56, 189, 248, 0.1)"
                                        strokeWidth="1"
                                    />
                                );
                            })}

                            {/* Axis lines */}
                            {skills.map((skill, i) => {
                                const { x, y } = getAxisPoints(i);
                                return (
                                    <line
                                        key={i}
                                        x1={centerX}
                                        y1={centerY}
                                        x2={x}
                                        y2={y}
                                        stroke="rgba(56, 189, 248, 0.2)"
                                        strokeWidth="1"
                                    />
                                );
                            })}

                            {/* Skill polygon */}
                            <motion.polygon
                                points={getPolygonPoints(animated ? skills.map(s => s.level) : skills.map(() => 0))}
                                fill="rgba(56, 189, 248, 0.2)"
                                stroke="rgb(56, 189, 248)"
                                strokeWidth="2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />

                            {/* Skill points */}
                            {skills.map((skill, i) => {
                                const { x, y } = getAxisPoints(i);
                                const angle = (Math.PI * 2 * i) / skills.length - Math.PI / 2;
                                const level = animated ? skill.level : 0;
                                const r = (radius * level) / 100;
                                const pointX = centerX + r * Math.cos(angle);
                                const pointY = centerY + r * Math.sin(angle);

                                return (
                                    <g key={i}>
                                        <motion.circle
                                            cx={pointX}
                                            cy={pointY}
                                            r={hoveredSkill === skill.name ? 8 : 5}
                                            fill="rgb(56, 189, 248)"
                                            stroke="white"
                                            strokeWidth="2"
                                            className="cursor-pointer"
                                            onMouseEnter={() => setHoveredSkill(skill.name)}
                                            onMouseLeave={() => setHoveredSkill(null)}
                                            whileHover={{ scale: 1.5 }}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                                        />

                                        {/* Labels */}
                                        <text
                                            x={x + (x - centerX) * 0.2}
                                            y={y + (y - centerY) * 0.2}
                                            textAnchor="middle"
                                            className="fill-text-main text-sm font-bold cursor-pointer"
                                            onMouseEnter={() => setHoveredSkill(skill.name)}
                                            onMouseLeave={() => setHoveredSkill(null)}
                                        >
                                            {skill.name}
                                        </text>
                                    </g>
                                );
                            })}
                        </svg>
                    </div>

                    {/* Legend */}
                    <div className="flex-1 space-y-4">
                        {skills.map((skill, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${hoveredSkill === skill.name
                                    ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                                    : 'border-border bg-background/50'
                                    }`}
                                onMouseEnter={() => setHoveredSkill(skill.name)}
                                onMouseLeave={() => setHoveredSkill(null)}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold">{skill.name}</span>
                                    <span className="text-primary font-mono">{skill.level}%</span>
                                </div>
                                <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-primary to-accent"
                                        initial={{ width: '0%' }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default SkillRadar;
