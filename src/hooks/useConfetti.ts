import { useState, useCallback } from 'react';

export const useConfetti = () => {
    const [showConfetti, setShowConfetti] = useState(false);

    const triggerConfetti = useCallback(() => {
        setShowConfetti(true);
    }, []);

    const stopConfetti = useCallback(() => {
        setShowConfetti(false);
    }, []);

    return {
        showConfetti,
        triggerConfetti,
        stopConfetti,
    };
};
