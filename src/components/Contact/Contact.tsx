import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '../UI/MagneticButton';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-[8%] text-center pb-16 sm:pb-24 md:pb-32">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-[clamp(2.5rem,5vw,3rem)] font-bold mb-3 sm:mb-4 hover:text-accent transition-colors duration-300 cursor-default px-2"
            >
                Let's Connect Circuit to Code
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-text-muted max-w-[550px] mx-auto mb-8 sm:mb-10 md:mb-12 text-base sm:text-lg px-4"
            >
                I am an Electronics Engineer ready to deploy full-stack web solutions.
                From troubleshooting logic boards to debugging API endpoints.
            </motion.p>

            <MagneticButton
                href="mailto:jernish@example.com"
                className="inline-block px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold bg-primary text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_40px_rgba(56,189,248,0.7)] transition-all duration-300 text-sm sm:text-base"
            >
                Initiate Transmission
            </MagneticButton>
        </section>
    );
};

export default Contact;
