import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTerminal } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

interface TerminalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([
        'Welcome to Jernish.OS v1.0.0',
        'Type "help" for a list of commands.',
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const { toggleTheme } = useTheme();

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (cmd: string) => {
        const cleanCmd = cmd.trim().toLowerCase();
        let output = '';

        switch (cleanCmd) {
            case 'help':
                output = 'Available commands: help, whoami, projects, contact, clear, theme, exit';
                break;
            case 'whoami':
                output = 'Jernish | Electronics Engineer & Web Developer. I bridge the gap between hardware signals and software logic.';
                break;
            case 'projects':
                output = '1. Autonomous Line Follower (C++)\n2. Home Automation WebServer (IoT)\n3. Oscilloscope Data Viz (D3.js)';
                break;
            case 'contact':
                output = 'Email: jernish@example.com';
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'theme':
                toggleTheme();
                output = 'Theme toggled.';
                break;
            case 'exit':
                onClose();
                return;
            default:
                output = `Command not found: ${cleanCmd}. Type "help" for valid commands.`;
        }

        setHistory((prev) => [...prev, `> ${cmd}`, output]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        handleCommand(input);
        setInput('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        className="w-full max-w-2xl bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden border border-gray-700 font-mono text-sm md:text-base"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-[#2d2d2d] px-4 py-2 flex justify-between items-center border-b border-gray-700">
                            <div className="flex items-center gap-2 text-gray-400">
                                <FaTerminal />
                                <span>jernish@system:~</span>
                            </div>
                            <button onClick={onClose} className="text-gray-400 hover:text-white">
                                <FaTimes />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-4 h-[400px] overflow-y-auto text-green-400" onClick={() => inputRef.current?.focus()}>
                            {history.map((line, i) => (
                                <div key={i} className="whitespace-pre-wrap mb-1">{line}</div>
                            ))}
                            <div ref={bottomRef} />

                            <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
                                <span className="text-blue-400">➜</span>
                                <span className="text-pink-400">~</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-white"
                                    autoFocus
                                />
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Terminal;
