import React from 'react';
import { FaMicrochip, FaBroadcastTower, FaNetworkWired, FaExchangeAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Knowledge: React.FC = () => {
    const cards = [
        {
            icon: <FaMicrochip className="text-4xl text-accent mb-4" />,
            title: 'Microprocessor Logic',
            subject: 'Microcontrollers (8051/8086)',
            desc: 'Learning Assembly language and Memory Mapping taught me the value of a single byte. I apply this "low-level efficiency" to write JavaScript that is optimized, preventing memory leaks in complex Single Page Applications.',
        },
        {
            icon: <FaBroadcastTower className="text-4xl text-primary mb-4" />,
            title: 'Signal & Communication',
            subject: 'Analog/Digital Communication',
            desc: 'I studied Modulation, Bandwidth, and Noise. This makes me an expert at handling APIs. I treat Websockets like real-time signal streams, ensuring data integrity just like a radio transmission protocol.',
        },
        {
            icon: <FaNetworkWired className="text-4xl text-secondary mb-4" />,
            title: 'Embedded Control (IoT)',
            subject: 'Sensors & Transducers',
            desc: 'I understand how data is generated physically. Whether it\'s a React Dashboard for temperature sensors or a Node.js backend processing GPS data, I know the hardware source of the JSON.',
        },
    ];

    return (
        <section id="knowledge" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-[8%] bg-bg-body/40 border-y border-border backdrop-blur-sm">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
                    Hardware <FaExchangeAlt className="inline mx-2 text-xl sm:text-2xl text-text-muted" /> Software
                </h2>
                <p className="text-text-muted max-w-[600px] mx-auto text-sm sm:text-base px-4">
                    Applying Diploma-level Electronics Principles to Modern Web Development.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-bg-card p-6 sm:p-8 md:p-10 rounded-2xl border border-border relative overflow-hidden group hover:-translate-y-2 hover:border-primary transition-all duration-400 backdrop-blur-md"
                    >
                        {/* Circuit Line Effect */}
                        <div className="absolute top-0 left-[-100%] w-full h-[3px] bg-gradient-to-r from-transparent to-accent transition-all duration-500 group-hover:left-[100%]" />

                        {card.icon}
                        <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                        <p className="text-sm text-text-muted leading-relaxed">
                            <b className="text-text-main">Subject:</b> {card.subject}<br />
                            <b className="text-text-main">Web Application:</b> {card.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Knowledge;
