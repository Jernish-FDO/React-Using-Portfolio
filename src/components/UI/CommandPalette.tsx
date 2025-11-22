import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaHome, FaBrain, FaChartArea, FaLaptopCode, FaProjectDiagram, FaClock, FaEnvelope, FaKeyboard, FaTachometerAlt, FaPalette, FaTrash } from 'react-icons/fa';
import { usePerformance } from '../../context/PerformanceContext';
import { useTheme } from '../../hooks/useTheme';
import { useGeminiChat } from '../../hooks/useGeminiChat';
import { useAchievements } from '../../context/AchievementContext';

interface Command {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    action: () => void;
    shortcut?: string;
}

const CommandPalette: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

    const { isPerformanceMode, togglePerformanceMode } = usePerformance();
    const { setTheme } = useTheme();
    const { deleteHistory } = useGeminiChat();
    const { unlockAchievement } = useAchievements();

    const commands: Command[] = [
        {
            id: 'home',
            title: 'Go to Home',
            description: 'Navigate to home page',
            icon: <FaHome />,
            action: () => navigate('/'),
            shortcut: 'Ctrl+H'
        },
        {
            id: 'toggle-performance',
            title: isPerformanceMode ? 'Disable Performance Mode' : 'Enable Performance Mode',
            description: 'Toggle high performance settings',
            icon: <FaTachometerAlt />,
            action: () => {
                togglePerformanceMode();
                unlockAchievement('speed_demon');
            },
            shortcut: 'Alt+P'
        },
        {
            id: 'theme-default',
            title: 'Theme: Default (Purple)',
            description: 'Switch to default theme',
            icon: <FaPalette />,
            action: () => { setTheme('default'); unlockAchievement('theme_master'); }
        },
        {
            id: 'theme-cyberpunk',
            title: 'Theme: Cyberpunk',
            description: 'Switch to neon theme',
            icon: <FaPalette />,
            action: () => { setTheme('cyberpunk'); unlockAchievement('theme_master'); }
        },
        {
            id: 'theme-ocean',
            title: 'Theme: Ocean',
            description: 'Switch to blue theme',
            icon: <FaPalette />,
            action: () => { setTheme('ocean'); unlockAchievement('theme_master'); }
        },
        {
            id: 'theme-forest',
            title: 'Theme: Forest',
            description: 'Switch to green theme',
            icon: <FaPalette />,
            action: () => { setTheme('forest'); unlockAchievement('theme_master'); }
        },
        {
            id: 'theme-sunset',
            title: 'Theme: Sunset',
            description: 'Switch to orange theme',
            icon: <FaPalette />,
            action: () => { setTheme('sunset'); unlockAchievement('theme_master'); }
        },
        {
            id: 'theme-monochrome',
            title: 'Theme: Monochrome',
            description: 'Switch to grayscale theme',
            icon: <FaPalette />,
            action: () => { setTheme('monochrome'); unlockAchievement('theme_master'); }
        },
        {
            id: 'clear-chat',
            title: 'Clear Chat History',
            description: 'Delete all AI conversation history',
            icon: <FaTrash />,
            action: () => {
                if (window.confirm('Delete all chat history?')) {
                    deleteHistory();
                }
            }
        },
        {
            id: 'knowledge',
            title: 'Go to Knowledge',
            description: 'View knowledge base',
            icon: <FaBrain />,
            action: () => navigate('/knowledge')
        },
        {
            id: 'skills',
            title: 'Go to Skills',
            description: 'View skill radar',
            icon: <FaChartArea />,
            action: () => navigate('/skills')
        },
        {
            id: 'techstack',
            title: 'Go to Tech Stack',
            description: 'View technologies',
            icon: <FaLaptopCode />,
            action: () => navigate('/tech-stack')
        },
        {
            id: 'projects',
            title: 'Go to Projects',
            description: 'View portfolio projects',
            icon: <FaProjectDiagram />,
            action: () => navigate('/projects')
        },
        {
            id: 'timeline',
            title: 'Go to Timeline',
            description: 'View journey timeline',
            icon: <FaClock />,
            action: () => navigate('/timeline')
        },
        {
            id: 'contact',
            title: 'Go to Contact',
            description: 'Get in touch',
            icon: <FaEnvelope />,
            action: () => navigate('/contact')
        },
        {
            id: 'shortcuts',
            title: 'Show Keyboard Shortcuts',
            description: 'View all shortcuts',
            icon: <FaKeyboard />,
            action: () => alert('Shortcuts:\nCtrl+K - Command Palette\nCtrl+Shift+F - FPS Monitor\nCtrl+Shift+M - Mouse Trailer\n``` (3x) - Dev Console\n↑↑↓↓←→←→BA - Konami Code')
        }
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.title.toLowerCase().includes(search.toLowerCase()) ||
        cmd.description.toLowerCase().includes(search.toLowerCase())
    );

    const executeCommand = useCallback((command: Command) => {
        command.action();
        setIsOpen(false);
        setSearch('');
        setSelectedIndex(0);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Open with Ctrl+K or Cmd+K
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen((prev) => !prev);
                return;
            }

            if (!isOpen) return;

            // Close with Escape
            if (e.key === 'Escape') {
                setIsOpen(false);
                setSearch('');
                setSelectedIndex(0);
                return;
            }

            // Navigate with arrow keys
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < filteredCommands.length - 1 ? prev + 1 : 0
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev > 0 ? prev - 1 : filteredCommands.length - 1
                );
            } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
                e.preventDefault();
                executeCommand(filteredCommands[selectedIndex]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredCommands, selectedIndex, executeCommand]);



    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100001] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4"
                    onClick={() => setIsOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: -20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: -20 }}
                        className="w-full max-w-2xl bg-background border-2 border-primary/50 rounded-xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
                            <FaSearch className="text-primary text-xl" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setSelectedIndex(0);
                                }}
                                placeholder="Type a command or search..."
                                className="flex-1 bg-transparent text-text-main outline-none text-lg"
                                autoFocus
                            />
                            <kbd className="px-2 py-1 bg-border rounded text-xs text-text-muted">ESC</kbd>
                        </div>

                        {/* Commands List */}
                        <div className="max-h-[400px] overflow-y-auto">
                            {filteredCommands.length > 0 ? (
                                filteredCommands.map((command, index) => (
                                    <motion.button
                                        key={command.id}
                                        onClick={() => executeCommand(command)}
                                        className={`w-full flex items-center gap-4 px-4 py-3 transition-colors ${index === selectedIndex
                                            ? 'bg-primary/20 border-l-4 border-primary'
                                            : 'hover:bg-primary/10 border-l-4 border-transparent'
                                            }`}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                    >
                                        <div className="text-primary text-xl">{command.icon}</div>
                                        <div className="flex-1 text-left">
                                            <div className="text-text-main font-medium">{command.title}</div>
                                            <div className="text-text-muted text-sm">{command.description}</div>
                                        </div>
                                        {command.shortcut && (
                                            <kbd className="px-2 py-1 bg-border rounded text-xs text-text-muted">
                                                {command.shortcut}
                                            </kbd>
                                        )}
                                    </motion.button>
                                ))
                            ) : (
                                <div className="text-center py-12 text-text-muted">
                                    No commands found
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-3 bg-bg-card border-t border-border flex items-center justify-between text-xs text-text-muted">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-border rounded">↑↓</kbd> Navigate
                                </span>
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-border rounded">Enter</kbd> Select
                                </span>
                            </div>
                            <span>Press <kbd className="px-1.5 py-0.5 bg-border rounded">Ctrl+K</kbd> to toggle</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
