import React from 'react';
import { FaRobot, FaServer, FaCodeBranch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import TiltCard from '../VFX/TiltCard';

const Projects: React.FC = () => {
    const projects = [
        {
            icon: <FaRobot />,
            title: 'Autonomous Line Follower',
            tech: 'C++ | IR Sensors | PID Logic',
            desc: 'Developed logic for an autonomous bot using PID (Proportional-Integral-Derivative) control loops for precision correction, eliminating jitter.',
            link: 'View Logic Flow ->',
        },
        {
            icon: <FaServer />,
            title: 'Home Automation WebServer',
            tech: 'ESP32 | React | WebSockets',
            desc: 'A Full-Stack IoT project. I replaced the standard remote with a React PWA that sends binary signals to an ESP32 via Wi-Fi.',
            link: 'View Architecture ->',
        },
        {
            icon: <FaCodeBranch />,
            title: 'Oscilloscope Data Viz',
            tech: 'Canvas API | D3.js',
            desc: 'Recreated the feel of a CRO (Cathode Ray Oscilloscope) in the browser using JavaScript math functions to visualize Sine/Square waves.',
            link: 'Run Simulation ->',
        },
    ];

    return (
        <section id="projects" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-[8%]">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-8 sm:mb-12 md:mb-16 px-2">
                Systems <span className="text-primary">Engineering</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <TiltCard key={index} className="h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-bg-card rounded-2xl overflow-hidden border border-border hover:border-accent transition-all duration-300 group h-full"
                        >
                            <div className="h-[180px] sm:h-[200px] md:h-[220px] bg-[#1e293b] flex items-center justify-center text-5xl sm:text-6xl text-white/10 group-hover:text-white/20 transition-colors">
                                {project.icon}
                            </div>
                            <div className="p-6 sm:p-8">
                                <h3 className="text-xl sm:text-2xl font-bold mb-2">{project.title}</h3>
                                <p className="text-xs sm:text-sm text-accent font-mono mb-3 sm:mb-4">{project.tech}</p>
                                <p className="text-text-muted mb-4 sm:mb-6 text-sm leading-relaxed">
                                    {project.desc}
                                </p>
                                <a
                                    href="#"
                                    className="text-primary font-bold text-sm hover:underline"
                                >
                                    {project.link}
                                </a>
                            </div>
                        </motion.div>
                    </TiltCard>
                ))}
            </div>
        </section>
    );
};

export default Projects;
