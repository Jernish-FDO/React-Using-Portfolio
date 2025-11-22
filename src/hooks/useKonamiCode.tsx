import { useEffect, useState } from 'react';

const KONAMI_CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'KeyB',
    'KeyA'
];

export const useKonamiCode = (callback: () => void) => {
    const [keys, setKeys] = useState<string[]>([]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setKeys((prevKeys) => {
                const newKeys = [...prevKeys, e.code].slice(-KONAMI_CODE.length);

                // Check if sequence matches
                const matches = KONAMI_CODE.every((key, index) => key === newKeys[index]);

                if (matches) {
                    callback();
                    return []; // Reset
                }

                return newKeys;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [callback]);

    return keys;
};

export default useKonamiCode;
