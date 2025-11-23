import React from 'react';
import { FaBolt } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="py-8 border-t border-border text-center text-text-muted text-sm  ">
            <p>
                © 2025 Jernish. Built with <FaBolt className="inline mx-1 text-yellow-400" /> Voltage & Logic.
            </p>
        </footer>
    );
};

export default Footer;
