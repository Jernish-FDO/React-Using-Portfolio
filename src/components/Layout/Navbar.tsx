import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from '../UI/ThemeToggle';
import SoundToggle from '../UI/SoundToggle';
import { useSound } from '../../hooks/useSound';

const Terminal = React.lazy(() => import('../Terminal/Terminal'));

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isMuted, toggleMute, playHover, playClick } = useSound();
    const location = useLocation();

    const toggleMenu = () => {
        playClick();
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Knowledge', path: '/knowledge' },
        { name: 'Skills', path: '/skills' },
        { name: 'Tech Stack', path: '/tech-stack' },
        { name: 'Projects', path: '/projects' },
        { name: 'Timeline', path: '/timeline' },
        { name: 'Contact', path: '/contact' },
    ];

    const [isTerminalOpen, setIsTerminalOpen] = useState(false);

    // Keyboard shortcut for terminal (disabled - now uses backtick x3)
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 't') {
                e.preventDefault();
                setIsTerminalOpen((prev) => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <nav className="fixed w-full px-4 sm:px-6 md:px-[8%] py-4 sm:py-5 md:py-6 z-50 flex justify-between items-center bg-bg-nav backdrop-blur-md border-b border-border transition-all duration-300">
                <Link
                    to="/"
                    className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text  hover:animate-pulse"
                    onClick={playClick}
                >
                    Jernish<span className="text-accent">.ECE</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-text-main font-medium relative text-sm tracking-wide transition-colors group ${location.pathname === link.path ? 'text-accent' : 'hover:text-accent'
                                }`}
                            onMouseEnter={playHover}
                            onClick={playClick}
                        >
                            {link.name}
                            <span className={`absolute bottom-[-5px] left-0 h-[2px] bg-accent transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></span>
                        </Link>
                    ))}
                    <div className="flex items-center gap-2 ml-2">
                        <ThemeToggle />
                        <SoundToggle isMuted={isMuted} toggleMute={toggleMute} />
                        <button
                            onClick={() => {
                                playClick();
                                setIsTerminalOpen(true);
                            }}
                            className="text-text-main hover:text-accent transition-colors p-2 border border-border rounded-lg hover:border-accent"
                            title="Open Terminal (Ctrl+T)"
                        >
                            <span className="text-xs font-mono p-2">$_Terminal</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex gap-2 sm:gap-4 items-center">
                    <ThemeToggle />
                    <button onClick={toggleMenu} className="text-text-main text-xl p-3 border border-border rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <div className="absolute top-full left-0 w-full bg-bg-nav border-b border-border p-6 sm:p-8 flex flex-col gap-4 sm:gap-6 md:hidden shadow-2xl">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => {
                                    playClick();
                                    setIsOpen(false);
                                }}
                                className={`text-text-main text-base sm:text-lg font-medium transition-colors py-2 ${location.pathname === link.path ? 'text-accent' : 'hover:text-accent'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => {
                                playClick();
                                setIsTerminalOpen(true);
                                setIsOpen(false);
                            }}
                            className="text-text-main text-base sm:text-lg font-medium hover:text-accent text-left py-2"
                        >
                            Terminal
                        </button>
                    </div>
                )}
            </nav>

            {/* Lazy load terminal */}
            {isTerminalOpen && (
                <React.Suspense fallback={null}>
                    <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
                </React.Suspense>
            )}
        </>
    );
};

export default Navbar;

