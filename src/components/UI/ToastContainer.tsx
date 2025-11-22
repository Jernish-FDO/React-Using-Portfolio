import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { useToast } from '../../context/ToastContext';
import { type ToastType } from '../../utils/types';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}


const iconMap: Record<ToastType, React.ComponentType<{ className?: string }>> = {
    success: FaCheckCircle,
    error: FaExclamationCircle,
    info: FaInfoCircle,
    warning: FaExclamationTriangle,
};

const colorMap: Record<ToastType, { bg: string; border: string; text: string; icon: string }> = {
    success: {
        bg: 'bg-green-500/10',
        border: 'border-green-500',
        text: 'text-green-500',
        icon: 'text-green-500',
    },
    error: {
        bg: 'bg-red-500/10',
        border: 'border-red-500',
        text: 'text-red-500',
        icon: 'text-red-500',
    },
    info: {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500',
        text: 'text-blue-500',
        icon: 'text-blue-500',
    },
    warning: {
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500',
        text: 'text-yellow-500',
        icon: 'text-yellow-500',
    },
};

interface ToastItemProps {
    toast: Toast;
    onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
    const Icon = iconMap[toast.type];
    const colors = colorMap[toast.type];

    useEffect(() => {
        if (toast.duration && toast.duration > 0) {
            const timer = setTimeout(onClose, toast.duration);
            return () => clearTimeout(timer);
        }
    }, [toast.duration, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={`${colors.bg} ${colors.border} border-2 rounded-lg px-4 py-3 shadow-2xl backdrop-blur-md max-w-sm w-full flex items-center gap-3`}
        >
            <Icon className={`${colors.icon} text-xl flex-shrink-0`} />
            <p className={`${colors.text} flex-1 text-sm font-medium`}>{toast.message}</p>
            <button
                onClick={onClose}
                className={`${colors.text} hover:opacity-70 transition-opacity flex-shrink-0`}
                aria-label="Close notification"
            >
                <FaTimes />
            </button>
        </motion.div>
    );
};

const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed top-[80px] right-4 z-[100000] flex flex-col gap-2 pointer-events-none">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <div key={toast.id} className="pointer-events-auto">
                        <ToastItem toast={toast} onClose={() => removeToast(toast.id)} />
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ToastContainer;
