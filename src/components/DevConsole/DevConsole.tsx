import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTerminal } from 'react-icons/fa';

interface DevConsoleProps {
    isOpen: boolean;
    onClose: () => void;
}

const DevConsole: React.FC<DevConsoleProps> = ({ isOpen, onClose }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([
        '🔧 Developer Console v2.0.0',
        'Type "help" for available commands',
        '---',
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const getSystemInfo = () => {
        const memory = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory;
        const connection = (navigator as unknown as { connection?: { effectiveType: string } }).connection;

        return `OS: ${navigator.platform}
Browser: ${navigator.userAgent.split('(')[0]}
Screen: ${window.screen.width}x${window.screen.height}
Memory: ${memory ? `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB` : 'N/A'}
Connection: ${connection?.effectiveType || 'Unknown'}`;
    };

    const handleCommand = (cmd: string) => {
        const cleanCmd = cmd.trim().toLowerCase();
        let output = '';

        switch (cleanCmd) {
            case 'help':
                output = `Available Commands:
• help - Show this help message
• whoami - Display developer info
• sysinfo - System information
• stats - Portfolio statistics
• easter-egg - Activate easter egg
• matrix - Toggle Matrix effect
• fps - Show FPS counter
• konami - Reveal secret
• clear - Clear console
• exit - Close console`;
                break;

            case 'whoami':
                output = `Developer: Jernish
Role: Full Stack Developer & ECE Engineer
Mission: Building the bridge from Silicon to Screen
Status: Online and Ready 🚀`;
                break;

            case 'sysinfo':
                output = getSystemInfo();
                break;

            case 'stats':
                output = `Portfolio Statistics:
• Projects Completed: 15+
• Technologies Mastered: 20+
• Lines of Code: 50,000+
• Coffee Consumed: ∞
• Bugs Fixed: Too many to count 😄`;
                break;

            case 'easter-egg':
                output = '🎉 Easter egg activated! Look around...';
                // Trigger confetti or special effect
                break;

            case 'matrix':
                output = '🟢 Matrix effect toggled';
                break;

            case 'fps':
                output = '📊 FPS Monitor: Press Ctrl+Shift+F';
                break;

            case 'konami':
                output = '🎮 Try: ↑↑↓↓←→←→BA';
                break;

            case 'secret':
                output = '🔐 "The best code is the code that solves real problems"';
                break;

            case 'coffee':
                output = '☕ Brewing virtual coffee... Done! *sip*';
                break;

            case 'clear':
                setHistory([]);
                return;

            case 'exit':
                onClose();
                return;

            default:
                output = `Command not found: "${cleanCmd}"
Type "help" for available commands`;
        }

        setHistory((prev) => [...prev, `$ ${cmd}`, output]);
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="w-full max-w-3xl bg-[#0a0a0a] rounded-xl shadow-2xl overflow-hidden border border-primary/50 font-mono text-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-[#1a1a1a] px-4 py-3 flex justify-between items-center border-b border-primary/30">
                            <div className="flex items-center gap-3">
                                <FaTerminal className="text-primary" />
                                <span className="text-primary font-bold">DevConsole</span>
                                <span className="text-gray-500 text-xs">jernish@portfolio:~$</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Body */}
                        <div
                            className="p-4 h-[500px] overflow-y-auto bg-[#0a0a0a]"
                            onClick={() => inputRef.current?.focus()}
                        >
                            {history.map((line, i) => (
                                <div
                                    key={i}
                                    className={`whitespace-pre-wrap mb-2 ${line.startsWith('$')
                                            ? 'text-accent font-bold'
                                            : 'text-gray-300'
                                        }`}
                                >
                                    {line}
                                </div>
                            ))}
                            <div ref={bottomRef} />

                            <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
                                <span className="text-primary">$</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-white caret-primary"
                                    autoFocus
                                    spellCheck={false}
                                />
                            </form>
                        </div>

                        {/* Footer hint */}
                        <div className="bg-[#1a1a1a] px-4 py-2 border-t border-primary/30 text-xs text-gray-500 flex justify-between">
                            <span>Press ` three times to toggle</span>
                            <span>Type "exit" or press ESC</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DevConsole;
