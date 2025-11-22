import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();

    const handleToggle = () => {
        // Only toggle between 'default' (dark) and 'light'
        if (theme === 'light') {
            setTheme('default');
        } else {
            setTheme('light');
        }
    };

    // Show moon when in light mode (click to go dark)
    // Show sun when in dark mode (click to go light)
    const isLightMode = theme === 'light';

    return (
        <button
            onClick={handleToggle}
            className="p-2 rounded-full border border-white/10 text-text-main hover:bg-white/5 transition-colors cursor-pointer"
            aria-label={isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
            {isLightMode ? <FaMoon /> : <FaSun />}
        </button>
    );
};

export default ThemeToggle;
