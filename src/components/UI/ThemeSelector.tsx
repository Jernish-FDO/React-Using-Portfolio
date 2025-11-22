import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPalette, FaTimes, FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';
import { themes, type Theme } from '../../utils/theme';

import { useAchievements } from '../../context/AchievementContext';

const ThemeSelector: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const { theme, setTheme, customColor, setCustomColor, customTheme, setCustomTheme } = useTheme();
    const { unlockAchievement } = useAchievements();

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleThemeChange = (t: Theme) => {
        setTheme(t);
        if (t !== 'default') {
            unlockAchievement('theme_master');
        }
    };

    const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const color = e.target.value;
        setCustomColor(color);
        if (theme !== 'custom') {
            setTheme('custom');
        }
    };

    const handleAdvancedColorChange = (key: keyof typeof customTheme, value: string) => {
        setCustomTheme({ [key]: value });
    };

    const ColorInput = ({ label, value, colorKey }: { label: string; value: string; colorKey: keyof typeof customTheme }) => (
        <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3">
            <label className="text-xs text-text-muted flex-shrink-0 w-20 sm:w-24">{label}</label>
            <div className="flex items-center gap-2 flex-1">
                <div className="relative w-full h-8 rounded-lg overflow-hidden border border-border cursor-pointer">
                    <input
                        type="color"
                        value={value}
                        onChange={(e) => handleAdvancedColorChange(colorKey, e.target.value)}
                        className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-0"
                    />
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => handleAdvancedColorChange(colorKey, e.target.value)}
                    className="text-xs font-mono text-text-main bg-black/20 px-2 py-1 rounded w-20 sm:w-28 border border-border focus:border-primary outline-none"
                />
            </div>
        </div>
    );

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleOpen}
                className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[9998] bg-bg-card/80 backdrop-blur-md border border-border text-text-main p-2.5 sm:p-3 rounded-full shadow-lg hover:border-primary transition-colors group min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Change Theme"
            >
                <FaPalette className="text-lg sm:text-xl group-hover:text-primary transition-colors" />
            </motion.button>

            {/* Theme Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
                        />

                        {/* Panel - Responsive positioning */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.9 }}
                            className="fixed bottom-0 left-0 right-0 sm:bottom-20 sm:left-4 sm:right-auto z-[9999] w-full sm:w-[380px] max-w-full bg-bg-card border-t sm:border border-border sm:rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-3 sm:p-4 border-b border-border flex items-center justify-between bg-primary/5">
                                <h3 className="font-bold text-sm sm:text-base text-text-main flex items-center gap-2">
                                    <FaPalette className="text-primary" />
                                    Select Theme
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-text-muted hover:text-text-main transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                                    aria-label="Close"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="p-3 sm:p-4 max-h-[70vh] sm:max-h-[75vh] overflow-y-auto custom-scrollbar">
                                {/* Predefined Themes Grid */}
                                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                                    {(Object.keys(themes) as Theme[]).filter(t => t !== 'custom').map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => handleThemeChange(t)}
                                            className={`relative p-2.5 sm:p-3 rounded-xl border transition-all duration-200 flex flex-col gap-2 group min-h-[70px] ${theme === t
                                                ? 'border-primary bg-primary/10'
                                                : 'border-border hover:border-primary/50 hover:bg-white/5'
                                                }`}
                                        >
                                            <div className="flex items-center gap-1 sm:gap-2 mb-1">
                                                <div
                                                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-sm"
                                                    style={{ backgroundColor: themes[t].primary }}
                                                />
                                                <div
                                                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-sm -ml-1 sm:-ml-2"
                                                    style={{ backgroundColor: themes[t].secondary }}
                                                />
                                                <div
                                                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-sm -ml-1 sm:-ml-2"
                                                    style={{ backgroundColor: themes[t].background }}
                                                />
                                            </div>
                                            <span className={`text-xs sm:text-sm font-medium capitalize ${theme === t ? 'text-primary' : 'text-text-muted group-hover:text-text-main'
                                                }`}>
                                                {t}
                                            </span>
                                            {theme === t && (
                                                <div className="absolute top-2 right-2 text-primary">
                                                    <FaCheck size={10} className="sm:hidden" />
                                                    <FaCheck size={12} className="hidden sm:block" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Custom Color Section */}
                                <div className={`p-3 sm:p-4 rounded-xl border transition-all duration-200 ${theme === 'custom' ? 'border-primary bg-primary/10' : 'border-border'}`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={`text-xs sm:text-sm font-medium ${theme === 'custom' ? 'text-primary' : 'text-text-main'}`}>Custom Theme</span>
                                        {theme === 'custom' && <FaCheck size={12} className="text-primary" />}
                                    </div>

                                    {/* Quick Color Picker */}
                                    <div className="mb-3">
                                        <label className="text-xs text-text-muted mb-2 block">Quick Generate from Color</label>
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div className="relative flex-1 h-10 rounded-lg overflow-hidden border border-border cursor-pointer">
                                                <input
                                                    type="color"
                                                    value={customColor}
                                                    onChange={handleCustomColorChange}
                                                    className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-0"
                                                />
                                            </div>
                                            <div className="text-xs font-mono text-text-muted bg-black/20 px-2 py-1 rounded whitespace-nowrap">
                                                {customColor}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Advanced Editor Toggle */}
                                    <button
                                        onClick={() => setShowAdvanced(!showAdvanced)}
                                        className="w-full flex items-center justify-between text-xs text-text-muted hover:text-primary transition-colors py-2 border-t border-border/50 mt-2 min-h-[44px]"
                                    >
                                        <span>Advanced Color Editor</span>
                                        {showAdvanced ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
                                    </button>

                                    {/* Advanced Color Controls */}
                                    <AnimatePresence>
                                        {showAdvanced && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-3 border-t border-border/50 mt-2">
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-semibold text-text-main mb-2">Main Colors</p>
                                                        <ColorInput label="Primary" value={customTheme.primary} colorKey="primary" />
                                                        <ColorInput label="Secondary" value={customTheme.secondary} colorKey="secondary" />
                                                        <ColorInput label="Accent" value={customTheme.accent} colorKey="accent" />

                                                        <p className="text-xs font-semibold text-text-main mb-2 mt-4">Backgrounds</p>
                                                        <ColorInput label="Body BG" value={customTheme.background} colorKey="background" />
                                                        <ColorInput label="Card BG" value={customTheme.card} colorKey="card" />
                                                        <ColorInput label="Nav BG" value={customTheme.nav} colorKey="nav" />

                                                        <p className="text-xs font-semibold text-text-main mb-2 mt-4">Text & Border</p>
                                                        <ColorInput label="Text Main" value={customTheme.text} colorKey="text" />
                                                        <ColorInput label="Text Muted" value={customTheme.muted} colorKey="muted" />
                                                        <ColorInput label="Border" value={customTheme.border} colorKey="border" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default ThemeSelector;
