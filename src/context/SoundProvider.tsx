import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SoundContext } from './SoundContextTypes';

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const [isMuted, setIsMuted] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

        const initAudioContext = () => {
            if (!audioContextRef.current) {
                audioContextRef.current = new AudioContextClass();
            }
            if (audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume().then(() => {

                }).catch(e => console.error('Error resuming AudioContext:', e));
            }
            window.removeEventListener('click', initAudioContext);
            window.removeEventListener('keydown', initAudioContext);
        };

        window.addEventListener('click', initAudioContext);
        window.addEventListener('keydown', initAudioContext);

        return () => {
            window.removeEventListener('click', initAudioContext);
            window.removeEventListener('keydown', initAudioContext);
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const playHover = useCallback(() => {
        if (isMuted || !audioContextRef.current) return;
        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    }, [isMuted]);

    const playClick = useCallback(() => {
        if (isMuted || !audioContextRef.current) return;
        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    }, [isMuted]);

    const toggleMute = () => setIsMuted(!isMuted);

    return (
        <SoundContext.Provider value={{ playHover, playClick, isMuted, toggleMute }}>
            {children}
        </SoundContext.Provider>
    );
}
