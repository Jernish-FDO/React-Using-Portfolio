export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    unlockedAt?: number;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}
