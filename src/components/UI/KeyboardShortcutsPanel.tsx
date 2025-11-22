import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaKeyboard, FaTimes } from 'react-icons/fa';

interface Shortcut {
    keys: string;
    description: string;
    category: string;
}

const shortcuts: Shortcut[] = [
    { keys: 'Ctrl+K', description: 'Open Command Palette', category: 'Navigation' },
    { keys: 'Ctrl+H', description: 'Go to Home', category: 'Navigation' },
    { keys: '?', description: 'Show this help panel', category: 'Tools' },
    { keys: 'Ctrl+Shift+F', description: 'Toggle FPS Monitor', category: 'Tools' },
    { keys: 'Ctrl+T', description: 'Open Terminal', category: 'Tools' },
    { keys: '``` (3x)', description: 'Open Dev Console', category: 'Tools' },
    { keys: '↑↓', description: 'Navigate Command Palette', category: 'Command Palette' },
    { keys: 'Enter', description: 'Select in Command Palette', category: 'Command Palette' },
    { keys: 'ESC', description: 'Close modals/overlays', category: 'General' },
    { keys: '↑↑↓↓←→←→BA', description: 'Konami Code easter egg', category: 'Easter Eggs' },
];

const categories = Array.from(new Set(shortcuts.map(s => s.category)));

const KeyboardShortcutsPanel: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Open with ? or Ctrl+/
            if (e.key === '?' || (e.ctrlKey && e.key === '/')) {
                e.preventDefault();
                setIsOpen(true);
                return;
            }

            // Close with Escape
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100002] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
                    onClick={() => setIsOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-background border-2 border-primary/50 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-bg-card">
                            <div className="flex items-center gap-3">
                                <FaKeyboard className="text-primary text-2xl sm:text-3xl" />
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-text-main">Keyboard Shortcuts</h2>
                                    <p className="text-xs sm:text-sm text-text-muted">Master these shortcuts for faster navigation</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-text-muted hover:text-text-main transition-colors p-2"
                                aria-label="Close"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                            {categories.map((category) => (
                                <div key={category} className="mb-6 last:mb-0">
                                    <h3 className="text-accent font-bold mb-3 text-sm sm:text-base">{category}</h3>
                                    <div className="space-y-2">
                                        {shortcuts
                                            .filter((s) => s.category === category)
                                            .map((shortcut, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className="flex items-center justify-between p-3 bg-bg-card/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
                                                >
                                                    <span className="text-text-main text-sm sm:text-base">{shortcut.description}</span>
                                                    <kbd className="px-2 sm:px-3 py-1 sm:py-1.5 bg-border rounded text-xs sm:text-sm text-text-muted font-mono whitespace-nowrap">
                                                        {shortcut.keys}
                                                    </kbd>
                                                </motion.div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-bg-card border-t border-border text-center">
                            <p className="text-xs sm:text-sm text-text-muted">
                                Press <kbd className="px-2 py-1 bg-border rounded text-xs font-mono">?</kbd> or{' '}
                                <kbd className="px-2 py-1 bg-border rounded text-xs font-mono">ESC</kbd> to toggle this panel
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default KeyboardShortcutsPanel;
