import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';

import { type Achievement } from '../utils/types';

const INITIAL_ACHIEVEMENTS: Achievement[] = [
    {
        id: 'first_steps',
        title: 'First Steps',
        description: 'Welcome to the portfolio! You took your first step.',
        icon: '🚀',
        unlocked: false,
    },
    {
        id: 'konami_code',
        title: 'Cheat Code',
        description: 'You found the secret Konami Code!',
        icon: '🎮',
        unlocked: false,
    },
    {
        id: 'theme_master',
        title: 'Chameleon',
        description: 'You changed the color theme.',
        icon: '🎨',
        unlocked: false,
    },
    {
        id: 'speed_demon',
        title: 'Speed Demon',
        description: 'You enabled Performance Mode.',
        icon: '⚡',
        unlocked: false,
    },
    {
        id: 'curious_mind',
        title: 'Curious Mind',
        description: 'You asked the AI assistant a question.',
        icon: '🤖',
        unlocked: false,
    },
    {
        id: 'scroll_master',
        title: 'Deep Diver',
        description: 'You scrolled to the bottom of the page.',
        icon: '⬇️',
        unlocked: false,
    }
];

interface AchievementContextType {
    achievements: Achievement[];
    unlockAchievement: (id: string) => void;
    unlockedCount: number;
    totalCount: number;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export function AchievementProvider({ children }: { children: React.ReactNode }) {
    const [achievements, setAchievements] = useState<Achievement[]>(() => {
        const saved = localStorage.getItem('achievements');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Merge saved state with initial structure to handle new achievements
            return INITIAL_ACHIEVEMENTS.map(init => {
                const found = parsed.find((p: Achievement) => p.id === init.id);
                return found ? { ...init, ...found } : init;
            });
        }
        return INITIAL_ACHIEVEMENTS;
    });

    const { success } = useToast(); // Correctly call useToast at the top level

    useEffect(() => {
        localStorage.setItem('achievements', JSON.stringify(achievements));
    }, [achievements]);

    const unlockAchievement = useCallback((id: string) => {
        setAchievements(prev => {
            const achievement = prev.find(a => a.id === id);
            if (achievement && !achievement.unlocked) {
                success(`Achievement Unlocked: ${achievement.title}! ${achievement.icon}`);
                return prev.map(a =>
                    a.id === id
                        ? { ...a, unlocked: true, unlockedAt: Date.now() }
                        : a
                );
            }
            return prev;
        });
    }, [success]); // 'success' is a dependency

    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;

    return (
        <AchievementContext.Provider value={{ achievements, unlockAchievement, unlockedCount, totalCount }}>
            {children}
        </AchievementContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAchievements = () => {
    const context = useContext(AchievementContext);
    if (context === undefined) {
        throw new Error('useAchievements must be used within an AchievementProvider');
    }
    return context;
};
