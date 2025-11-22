import { createContext } from 'react';
import { themes, type Theme, type ThemeColors } from '../utils/theme';

export interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    setCustomColor: (color: string) => void;
    customColor: string;
    customTheme: ThemeColors;
    setCustomTheme: (colors: Partial<ThemeColors>) => void;
    currentColors: typeof themes['default'];
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
