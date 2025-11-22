import { useToast } from '../context/ToastContext';

export const useCopyToClipboard = () => {
    const { success, error } = useToast();

    const copyToClipboard = async (text: string, successMessage: string = 'Copied to clipboard! 📋') => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                success(successMessage);
                return true;
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                try {
                    const successful = document.execCommand('copy');
                    document.body.removeChild(textArea);

                    if (successful) {
                        success(successMessage);
                        return true;
                    } else {
                        throw new Error('Copy command failed');
                    }
                } catch (err) {
                    document.body.removeChild(textArea);
                    throw err;
                }
            }
        } catch (err) {
            console.error('Failed to copy:', err);
            error('Failed to copy to clipboard');
            return false;
        }
    };

    return { copyToClipboard };
};
