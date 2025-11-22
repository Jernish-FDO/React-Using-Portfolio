export type Theme = 'default' | 'light' | 'cyberpunk' | 'ocean' | 'forest' | 'sunset' | 'lavender' | 'mint' | 'cherry' | 'royal' | 'solar' | 'monochrome' | 'midnight' | 'nebula' | 'volcano' | 'custom';

export interface ThemeColors {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    card: string;
    nav: string;
    text: string;
    muted: string;
    border: string;
}

export const themes: Record<Theme, ThemeColors> = {
    default: {
        primary: '#8B5CF6', // Violet-500
        secondary: '#EC4899', // Pink-500
        accent: '#6366F1', // Indigo-500
        background: '#0F172A', // Slate-900
        card: 'rgba(30, 41, 59, 0.75)', // Slate-800 with opacity
        nav: 'rgba(15, 23, 42, 0.8)', // Slate-900 with opacity
        text: '#F8FAFC', // Slate-50
        muted: '#94A3B8', // Slate-400
        border: 'rgba(148, 163, 184, 0.1)',
    },
    light: {
        primary: '#8B5CF6', // Violet-500
        secondary: '#EC4899', // Pink-500
        accent: '#6366F1', // Indigo-500
        background: '#FFFFFF', // White
        card: 'rgba(248, 250, 252, 0.9)', // Slate-50 with opacity
        nav: 'rgba(255, 255, 255, 0.95)', // White with opacity
        text: '#0F172A', // Slate-900 (dark text)
        muted: '#64748B', // Slate-500
        border: 'rgba(0, 0, 0, 0.1)',
    },
    cyberpunk: {
        primary: '#00FF9D', // Neon Green
        secondary: '#FF00FF', // Neon Magenta
        accent: '#00FFFF', // Cyan
        background: '#050505', // Black
        card: 'rgba(20, 20, 20, 0.8)', // Dark Gray
        nav: 'rgba(5, 5, 5, 0.9)', // Black
        text: '#E0E0E0', // Light Gray
        muted: '#404040', // Dark Gray
        border: 'rgba(0, 255, 157, 0.2)',
    },
    ocean: {
        primary: '#0EA5E9', // Sky-500
        secondary: '#38BDF8', // Sky-400
        accent: '#0284C7', // Sky-600
        background: '#020617', // Slate-950 (Deep Blueish)
        card: 'rgba(15, 23, 42, 0.8)', // Slate-900
        nav: 'rgba(2, 6, 23, 0.9)', // Slate-950
        text: '#F0F9FF', // Sky-50
        muted: '#7DD3FC', // Sky-300
        border: 'rgba(14, 165, 233, 0.2)',
    },
    forest: {
        primary: '#10B981', // Emerald-500
        secondary: '#34D399', // Emerald-400
        accent: '#059669', // Emerald-600
        background: '#022C22', // Emerald-950
        card: 'rgba(6, 78, 59, 0.8)', // Emerald-900
        nav: 'rgba(2, 44, 34, 0.9)', // Emerald-950
        text: '#ECFDF5', // Emerald-50
        muted: '#6EE7B7', // Emerald-300
        border: 'rgba(16, 185, 129, 0.2)',
    },
    sunset: {
        primary: '#F97316', // Orange-500
        secondary: '#FDBA74', // Orange-300
        accent: '#EA580C', // Orange-600
        background: '#431407', // Orange-950
        card: 'rgba(124, 45, 18, 0.8)', // Orange-900
        nav: 'rgba(67, 20, 7, 0.9)', // Orange-950
        text: '#FFF7ED', // Orange-50
        muted: '#FDBA74', // Orange-300
        border: 'rgba(249, 115, 22, 0.2)',
    },
    lavender: {
        primary: '#A78BFA', // Violet-400
        secondary: '#F472B6', // Pink-400
        accent: '#818CF8', // Indigo-400
        background: '#1E1B4B', // Indigo-950
        card: 'rgba(49, 46, 129, 0.8)', // Indigo-900
        nav: 'rgba(30, 27, 75, 0.9)', // Indigo-950
        text: '#E0E7FF', // Indigo-50
        muted: '#A5B4FC', // Indigo-300
        border: 'rgba(167, 139, 250, 0.2)',
    },
    mint: {
        primary: '#34D399', // Emerald-400
        secondary: '#6EE7B7', // Emerald-300
        accent: '#10B981', // Emerald-500
        background: '#064E3B', // Emerald-900
        card: 'rgba(2, 44, 34, 0.8)', // Emerald-950
        nav: 'rgba(6, 78, 59, 0.9)', // Emerald-900
        text: '#ECFDF5', // Emerald-50
        muted: '#6EE7B7', // Emerald-300
        border: 'rgba(52, 211, 153, 0.2)',
    },
    cherry: {
        primary: '#FB7185', // Rose-400
        secondary: '#FDA4AF', // Rose-300
        accent: '#F43F5E', // Rose-500
        background: '#4C0519', // Rose-950
        card: 'rgba(136, 19, 55, 0.8)', // Rose-900
        nav: 'rgba(76, 5, 25, 0.9)', // Rose-950
        text: '#FFF1F2', // Rose-50
        muted: '#FECDD3', // Rose-200
        border: 'rgba(251, 113, 133, 0.2)',
    },
    royal: {
        primary: '#FBBF24', // Amber-400
        secondary: '#FCD34D', // Amber-300
        accent: '#D97706', // Amber-600
        background: '#172554', // Blue-950
        card: 'rgba(30, 58, 138, 0.8)', // Blue-900
        nav: 'rgba(23, 37, 84, 0.9)', // Blue-950
        text: '#FEF3C7', // Amber-50
        muted: '#93C5FD', // Blue-300
        border: 'rgba(251, 191, 36, 0.2)',
    },
    solar: {
        primary: '#FACC15', // Yellow-400
        secondary: '#FDE047', // Yellow-300
        accent: '#EAB308', // Yellow-500
        background: '#422006', // Yellow-950 (Brownish)
        card: 'rgba(113, 63, 18, 0.8)', // Yellow-900
        nav: 'rgba(66, 32, 6, 0.9)', // Yellow-950
        text: '#FEFCE8', // Yellow-50
        muted: '#FDE047', // Yellow-300
        border: 'rgba(250, 204, 21, 0.2)',
    },
    monochrome: {
        primary: '#FFFFFF', // White
        secondary: '#D4D4D4', // Neutral-300
        accent: '#A3A3A3', // Neutral-400
        background: '#000000', // Black
        card: 'rgba(23, 23, 23, 0.8)', // Neutral-900
        nav: 'rgba(0, 0, 0, 0.9)', // Black
        text: '#FFFFFF', // White
        muted: '#737373', // Neutral-500
        border: 'rgba(255, 255, 255, 0.2)',
    },
    midnight: {
        primary: '#6366F1', // Indigo-500
        secondary: '#818CF8', // Indigo-400
        accent: '#4F46E5', // Indigo-600
        background: '#020617', // Slate-950
        card: 'rgba(15, 23, 42, 0.8)', // Slate-900
        nav: 'rgba(2, 6, 23, 0.9)', // Slate-950
        text: '#E0E7FF', // Indigo-50
        muted: '#6366F1', // Indigo-500
        border: 'rgba(99, 102, 241, 0.2)',
    },
    nebula: {
        primary: '#D946EF', // Fuchsia-500
        secondary: '#E879F9', // Fuchsia-400
        accent: '#C026D3', // Fuchsia-600
        background: '#2A041D', // Fuchsia-950 (Custom dark)
        card: 'rgba(80, 7, 36, 0.8)', // Fuchsia-900
        nav: 'rgba(42, 4, 29, 0.9)', // Fuchsia-950
        text: '#FAE8FF', // Fuchsia-50
        muted: '#D946EF', // Fuchsia-500
        border: 'rgba(217, 70, 239, 0.2)',
    },
    volcano: {
        primary: '#EF4444', // Red-500
        secondary: '#F87171', // Red-400
        accent: '#DC2626', // Red-600
        background: '#450A0A', // Red-950
        card: 'rgba(127, 29, 29, 0.8)', // Red-900
        nav: 'rgba(69, 10, 10, 0.9)', // Red-950
        text: '#FEF2F2', // Red-50
        muted: '#EF4444', // Red-500
        border: 'rgba(239, 68, 68, 0.2)',
    },
    custom: {
        primary: '#8B5CF6',
        secondary: '#EC4899',
        accent: '#6366F1',
        background: '#0F172A',
        card: 'rgba(30, 41, 59, 0.75)',
        nav: 'rgba(15, 23, 42, 0.8)',
        text: '#F8FAFC',
        muted: '#94A3B8',
        border: 'rgba(148, 163, 184, 0.1)',
    }
};

// Helper functions for color manipulation

function hexToHSL(hex: string): { h: number; s: number; l: number } {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt("0x" + hex[1] + hex[1]);
        g = parseInt("0x" + hex[2] + hex[2]);
        b = parseInt("0x" + hex[3] + hex[3]);
    } else if (hex.length === 7) {
        r = parseInt("0x" + hex[1] + hex[2]);
        g = parseInt("0x" + hex[3] + hex[4]);
        b = parseInt("0x" + hex[5] + hex[6]);
    }
    r /= 255;
    g /= 255;
    b /= 255;
    const cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin;
    let h = 0, s = 0, l = 0;

    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
}

function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    const toHex = (n: number) => {
        const hex = n.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + toHex(r) + toHex(g) + toHex(b);
}

// Helper to generate theme from a single color
export const generateThemeFromColor = (color: string): ThemeColors => {
    const { h, s, l } = hexToHSL(color);

    // Generate complementary or analogous colors
    const secondaryH = (h + 30) % 360; // Analogous
    const accentH = (h + 180) % 360; // Complementary

    const primary = color;
    const secondary = hslToHex(secondaryH, s, Math.min(l + 10, 90));
    const accent = hslToHex(accentH, s, l);

    // Generate dark background based on primary hue but very dark and desaturated
    const background = hslToHex(h, 30, 5);

    // Card background slightly lighter than body background
    const card = `rgba(${parseInt(hslToHex(h, 20, 10).slice(1, 3), 16)}, ${parseInt(hslToHex(h, 20, 10).slice(3, 5), 16)}, ${parseInt(hslToHex(h, 20, 10).slice(5, 7), 16)}, 0.8)`;

    // Nav background similar to card
    const nav = `rgba(${parseInt(hslToHex(h, 20, 8).slice(1, 3), 16)}, ${parseInt(hslToHex(h, 20, 8).slice(3, 5), 16)}, ${parseInt(hslToHex(h, 20, 8).slice(5, 7), 16)}, 0.9)`;

    const text = '#F8FAFC'; // Keep text light for dark mode
    const muted = hslToHex(h, 20, 60);
    const border = `${color}33`; // 20% opacity

    return {
        primary,
        secondary,
        accent,
        background,
        card,
        nav,
        text,
        muted,
        border,
    };
};


