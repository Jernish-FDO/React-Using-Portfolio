import { createContext } from 'react';

export interface SoundContextType {
    playHover: () => void;
    playClick: () => void;
    isMuted: boolean;
    toggleMute: () => void;
}

export const SoundContext = createContext<SoundContextType | undefined>(undefined);
