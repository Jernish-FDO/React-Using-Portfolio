import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '../UI/MagneticButton';
import GlitchText from '../VFX/GlitchText';
import TypingText from '../VFX/TypingText';

const Hero: React.FC = () => {
    return (
        <header id="home" className="min-h-screen flex items-center relative px-4 sm:px-6 md:px-[8%] pt-20 sm:pt-24">
            {/* Floating Shapes */}
            <motion.div
                className="absolute top-[20%] right-[5%] sm:right-[10%] w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] border-2 border-secondary opacity-20 pointer-events-none -z-10"
                animate={{ rotate: 360, y: [0, -40, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute bottom-[10%] left-[2%] sm:left-[5%] w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] border-2 border-dashed border-primary rounded-full opacity-20 pointer-events-none -z-10"
                animate={{ rotate: 360, y: [0, -40, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
            />

            <div className="max-w-[750px] z-10">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-accent font-mono text-xs sm:text-sm tracking-[2px] sm:tracking-[3px] mb-3 sm:mb-4 bg-accent/10 inline-block px-2 sm:px-3 py-1 rounded"
                >
                    DIPLOMA: ELECTRONICS & COMMUNICATION
                </motion.span>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl sm:text-3xl md:text-[clamp(3rem,6vw,5.5rem)] leading-[1.1] mb-4 sm:mb-6 font-extrabold"
                >
                    The Developer Who<br />
                    <span className="block text-text-main text-sm sm:text-base md:text-xl lg:text-2xl mb-3 sm:mb-4 font-light tracking-wider sm:tracking-widest">
                        SYSTEM ONLINE
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 tracking-tighter">
                        <GlitchText text="JERNISH" className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary" />
                    </h1>
                    <div className="h-6 sm:h-8 md:h-12 text-base sm:text-xl md:text-3xl font-mono text-accent">
                        <TypingText
                            text={["Full Stack Developer", "IoT Enthusiast", "System Architect"]}
                            speed={100}
                            repeatDelay={2000}
                        />
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-sm sm:text-base md:text-lg text-text-muted mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-[600px] px-2"
                >
                    Hi, I'm <b>Jernish</b>. Most developers see code as text; I see it as signals.
                    My background in <b>ECE (Electronics & Communication)</b> gives me a microscopic
                    understanding of how logic gates turn into software architecture.
                    I build the bridge from Silicon to Screen.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-5"
                >
                    <MagneticButton
                        href="#projects"
                        className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-full font-bold bg-primary text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_40px_rgba(56,189,248,0.7)] transition-all duration-300 inline-block text-sm sm:text-base text-center"
                    >
                        My Systems
                    </MagneticButton>
                    <MagneticButton
                        href="#knowledge"
                        className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-full font-bold border-2 border-border text-text-main hover:border-text-main transition-all duration-300 inline-block text-sm sm:text-base text-center"
                    >
                        My Logic
                    </MagneticButton>
                </motion.div>
            </div>
        </header>
    );
};

export default Hero;
