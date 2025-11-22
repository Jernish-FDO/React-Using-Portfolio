import React, { createContext, useContext, useState, useEffect } from 'react';

interface PerformanceContextType {
    isPerformanceMode: boolean;
    togglePerformanceMode: () => void;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
    const [isPerformanceMode, setIsPerformanceMode] = useState(() => {
        const saved = localStorage.getItem('performance_mode');
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem('performance_mode', JSON.stringify(isPerformanceMode));

        // Add/remove class to body for global CSS adjustments if needed
        if (isPerformanceMode) {
            document.body.classList.add('performance-mode');
        } else {
            document.body.classList.remove('performance-mode');
        }
    }, [isPerformanceMode]);

    const togglePerformanceMode = () => {
        setIsPerformanceMode((prev: boolean) => !prev);
    };

    return (
        <PerformanceContext.Provider value={{ isPerformanceMode, togglePerformanceMode }}>
            {children}
        </PerformanceContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePerformance = () => {
    const context = useContext(PerformanceContext);
    if (context === undefined) {
        throw new Error('usePerformance must be used within a PerformanceProvider');
    }
    return context;
};
