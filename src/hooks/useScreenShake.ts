import { useState, useCallback } from 'react';

export const useScreenShake = () => {
    const [isShaking, setIsShaking] = useState(false);

    const shake = useCallback((intensity: 'subtle' | 'medium' | 'strong' = 'medium') => {
        setIsShaking(true);

        // Apply shake to body
        const body = document.body;
        body.style.animation = `screenShake-${intensity} 0.5s ease-in-out`;

        setTimeout(() => {
            body.style.animation = '';
            setIsShaking(false);
        }, 500);
    }, []);

    return { shake, isShaking };
};

// Add CSS for screen shake animations
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes screenShake-subtle {
            0%, 100% { transform: translate(0, 0); }
            10%, 30%, 50%, 70%, 90% { transform: translate(-2px, 2px); }
            20%, 40%, 60%, 80% { transform: translate(2px, -2px); }
        }
        
        @keyframes screenShake-medium {
            0%, 100% { transform: translate(0, 0); }
            10%, 30%, 50%, 70%, 90% { transform: translate(-5px, 5px); }
            20%, 40%, 60%, 80% { transform: translate(5px, -5px); }
        }
        
        @keyframes screenShake-strong {
            0%, 100% { transform: translate(0, 0); }
            10%, 30%, 50%, 70%, 90% { transform: translate(-10px, 10px); }
            20%, 40%, 60%, 80% { transform: translate(10px, -10px); }
        }
    `;
    if (!document.querySelector('#screen-shake-styles')) {
        style.id = 'screen-shake-styles';
        document.head.appendChild(style);
    }
}
