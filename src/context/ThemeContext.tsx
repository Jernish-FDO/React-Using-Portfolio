import React, { useEffect, useState } from 'react';
import { themes, type Theme, type ThemeColors, generateThemeFromColor } from '../utils/theme';
import { ThemeContext } from './ThemeContextTypes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('portfolio_theme') as Theme;
        return (savedTheme && (themes[savedTheme] || savedTheme === 'custom')) ? savedTheme : 'default';
    });

    const [customColor, setCustomColorState] = useState<string>(() => {
        return localStorage.getItem('portfolio_custom_color') || '#8B5CF6';
    });

    const [customTheme, setCustomThemeState] = useState<ThemeColors>(() => {
        const savedCustomTheme = localStorage.getItem('portfolio_custom_theme');
        if (savedCustomTheme) {
            try {
                return JSON.parse(savedCustomTheme);
            } catch {
                // If parsing fails, use default custom theme
            }
        }
        return themes.custom;
    });

    const setCustomColor = (color: string) => {
        setCustomColorState(color);
        localStorage.setItem('portfolio_custom_color', color);
        // Auto-generate theme from this color
        const generatedTheme = generateThemeFromColor(color);
        setCustomThemeState(generatedTheme);
        localStorage.setItem('portfolio_custom_theme', JSON.stringify(generatedTheme));
    };

    const setCustomTheme = (colors: Partial<ThemeColors>) => {
        const updatedTheme = { ...customTheme, ...colors };
        setCustomThemeState(updatedTheme);
        localStorage.setItem('portfolio_custom_theme', JSON.stringify(updatedTheme));
        if (theme !== 'custom') {
            setTheme('custom');
        }
    };

    useEffect(() => {
        let colors = themes[theme];

        if (theme === 'custom') {
            colors = customTheme;
        }

        const root = document.documentElement;

        // Apply CSS variables
        root.style.setProperty('--primary', colors.primary);
        root.style.setProperty('--secondary', colors.secondary);
        root.style.setProperty('--accent', colors.accent);
        root.style.setProperty('--bg-body', colors.background);
        root.style.setProperty('--bg-card', colors.card);
        root.style.setProperty('--bg-nav', colors.nav);
        root.style.setProperty('--text-main', colors.text);
        root.style.setProperty('--text-muted', colors.muted);
        root.style.setProperty('--border', colors.border);

        localStorage.setItem('portfolio_theme', theme);
    }, [theme, customTheme]);

    const toggleTheme = () => {
        setTheme(prev => {
            const themeOrder: Theme[] = ['default', 'light', 'cyberpunk', 'ocean', 'forest', 'sunset', 'lavender', 'mint', 'cherry', 'royal', 'solar', 'monochrome', 'midnight', 'nebula', 'volcano', 'custom'];
            const currentIndex = themeOrder.indexOf(prev);
            const nextIndex = (currentIndex + 1) % themeOrder.length;
            return themeOrder[nextIndex];
        });
    };

    return (
        <ThemeContext.Provider value={{
            theme,
            setTheme,
            toggleTheme,
            setCustomColor,
            customColor,
            customTheme,
            setCustomTheme,
            currentColors: theme === 'custom' ? customTheme : themes[theme]
        }}>
            {children}
        </ThemeContext.Provider>
    );
}
