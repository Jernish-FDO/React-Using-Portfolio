import React from 'react';
import { FaJs, FaPython, FaReact, FaMemory } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TechStack: React.FC = () => {
    const techs = [
        { icon: <FaJs className="text-[#f7df1e]" />, name: 'JavaScript', desc: 'The new Assembly' },
        { icon: <FaPython className="text-[#3776ab]" />, name: 'Python', desc: 'Automation Scripting' },
        { icon: <FaMemory className="text-accent" />, name: 'Embedded C', desc: 'Hardware Programming' },
        { icon: <FaReact className="text-primary" />, name: 'React.js', desc: 'Dynamic UI Rendering' },
    ];

    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-[8%]">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 px-2">
                My <span className="text-accent">Tech Toolbox</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {techs.map((tech, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-bg-card p-6 sm:p-8 rounded-2xl border border-border text-center hover:-translate-y-2 hover:border-primary transition-all duration-300 backdrop-blur-md group"
                    >
                        <div className="text-5xl mb-4 flex justify-center transition-transform duration-300 group-hover:scale-110">
                            {tech.icon}
                        </div>
                        <h4 className="text-xl font-bold mb-2">{tech.name}</h4>
                        <p className="text-sm text-text-muted">{tech.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TechStack;
