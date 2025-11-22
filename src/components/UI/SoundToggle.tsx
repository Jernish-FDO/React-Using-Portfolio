import React from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

interface SoundToggleProps {
    isMuted: boolean;
    toggleMute: () => void;
}

const SoundToggle: React.FC<SoundToggleProps> = ({ isMuted, toggleMute }) => {
    return (
        <button
            onClick={toggleMute}
            className="p-2 rounded-full border border-white/10 text-text-main hover:bg-white/5 transition-colors cursor-pointer ml-2"
            aria-label="Toggle Sound"
        >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
    );
};

export default SoundToggle;
