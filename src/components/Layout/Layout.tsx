import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ParticleCanvas from '../VFX/ParticleCanvas';
import Cursor from '../VFX/Cursor';
import MatrixRain from '../VFX/MatrixRain';
import ScrollProgress from '../VFX/ScrollProgress';
import CodeRainBackground from '../VFX/CodeRainBackground';
import LaserScroll from '../VFX/LaserScroll';
import MouseTrailer from '../VFX/MouseTrailer';
import NoiseTexture from '../VFX/NoiseTexture';
import DevConsole from '../DevConsole/DevConsole';
import FPSMonitor from '../Debug/FPSMonitor';
import CommandPalette from '../UI/CommandPalette';
import { useKonamiCode } from '../../hooks/useKonamiCode';
import { usePerformance } from '../../context/PerformanceContext';
import KeyboardShortcutsPanel from '../UI/KeyboardShortcutsPanel';
import Confetti from '../VFX/Confetti';
import ScrollToTop from '../UI/ScrollToTop';
import Chatbot from '../Chatbot/Chatbot';
import ThemeSelector from '../UI/ThemeSelector';
import AchievementGallery from '../UI/AchievementGallery';
import WelcomeModal from '../UI/WelcomeModal';
import { useAchievements } from '../../context/AchievementContext';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [matrixMode, setMatrixMode] = useState(false);
    const [devConsoleOpen, setDevConsoleOpen] = useState(false);
    const [backTickCount, setBackTickCount] = useState(0);
    const { isPerformanceMode, togglePerformanceMode } = usePerformance();
    const [showConfetti, setShowConfetti] = useState(false);
    const { unlockAchievement } = useAchievements();

    // Konami code easter egg
    useKonamiCode(() => {
        setMatrixMode((prev) => !prev);
        setShowConfetti(true);
        unlockAchievement('konami_code');

        // Trigger screen shake
        const body = document.body;
        body.style.animation = 'screenShake-strong 0.5s ease-in-out';
        setTimeout(() => { body.style.animation = ''; }, 500);

        // Show celebration message
        const message = document.createElement('div');
        message.innerHTML = '🎉 KONAMI CODE ACTIVATED! 🎉';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem 3rem;
            border-radius: 1rem;
            font-size: 2rem;
            font-weight: bold;
            z-index: 10003;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            animation: celebrationPulse 0.5s ease-in-out;
        `;
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 3000);
    });

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Toggle Dev Console with Backtick (`)
            if (e.key === '`') {
                e.preventDefault(); // Prevent default browser behavior for backtick
                setBackTickCount(prev => {
                    const newCount = prev + 1;
                    if (newCount >= 3) {
                        setDevConsoleOpen(true);
                        return 0;
                    }
                    return newCount;
                });
                // Reset count after 1 second
                setTimeout(() => setBackTickCount(0), 1000);
            } else if (e.key === 'Escape' && devConsoleOpen) {
                setDevConsoleOpen(false);
            } else {
                // Reset backtick count if any other key is pressed
                setBackTickCount(0);
            }

            // Toggle Performance Mode with Alt+P
            if (e.altKey && e.key.toLowerCase() === 'p') {
                e.preventDefault(); // Prevent default browser behavior for Alt+P
                togglePerformanceMode();
                unlockAchievement('speed_demon');
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [backTickCount, devConsoleOpen, togglePerformanceMode, unlockAchievement]);

    return (
        <>
            {/* Background Effects */}
            <NoiseTexture />
            <CodeRainBackground />
            {matrixMode && <MatrixRain />}
            <ParticleCanvas />

            {/* Scroll Effects */}
            <ScrollProgress />
            <LaserScroll />

            {/* Interactive Elements */}
            {!isPerformanceMode && <Cursor />}
            {!isPerformanceMode && <MouseTrailer />}
            {!isPerformanceMode && showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}

            {/* UI Tools */}
            <CommandPalette />
            <KeyboardShortcutsPanel />
            <ThemeSelector />
            <AchievementGallery />
            <WelcomeModal />
            <ScrollToTop />
            <Chatbot />
            <FPSMonitor />
            <DevConsole isOpen={devConsoleOpen} onClose={() => setDevConsoleOpen(false)} />

            {/* Main Layout */}
            <Navbar />
            <main className="relative z-10 flex flex-col min-h-screen">{children}</main>
            <Footer />

            {/* Add celebration animation style */}
            <style>{`
                @keyframes celebrationPulse {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); }
                    50% { transform: translate(-50%, -50%) scale(1.1); }
                }
            `}</style>
        </>
    );
};

export default Layout;
