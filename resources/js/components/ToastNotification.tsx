import { usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface SharedFlashProps {
    [key: string]: unknown;
    flash?: {
        success?: string | null;
        error?: string | null;
    };
}

export default function ToastNotification() {
    const { flash } = usePage<SharedFlashProps>().props;
    const [toast, setToast] = useState<{
        id: number;
        message: string;
        type: 'success' | 'error';
    } | null>(null);
    const prevFlashRef = useRef(flash);

    useEffect(() => {
        if (flash !== prevFlashRef.current) {
            prevFlashRef.current = flash;

            if (flash?.success) {
                const timer = setTimeout(() => {
                    setToast({
                        id: Date.now(),
                        message: flash.success!,
                        type: 'success',
                    });
                }, 0);

                return () => clearTimeout(timer);
            } else if (flash?.error) {
                const timer = setTimeout(() => {
                    setToast({
                        id: Date.now(),
                        message: flash.error!,
                        type: 'error',
                    });
                }, 0);

                return () => clearTimeout(timer);
            }
        }
    }, [flash]);

    useEffect(() => {
        if (!toast) {
            return;
        }

        const timer = setTimeout(() => {
            setToast(null);
        }, 4000);

        return () => clearTimeout(timer);
    }, [toast]);

    if (!toast) {
        return null;
    }

    return (
        <AnimatePresence>
            <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
                <motion.div
                    key={toast.id}
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className={`flex items-center gap-3 rounded-xl border p-4 shadow-2xl backdrop-blur-md ${
                        toast.type === 'success'
                            ? 'border-emerald-500/30 bg-slate-900/90 text-emerald-400'
                            : 'border-rose-500/30 bg-slate-900/90 text-rose-400'
                    }`}
                >
                    {toast.type === 'success' ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                    ) : (
                        <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
                    )}

                    <div className="text-sm font-medium text-slate-100">
                        {toast.message}
                    </div>

                    <button
                        onClick={() => setToast(null)}
                        className="ml-2 text-slate-400 transition hover:text-slate-200"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
