import { useForm, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, LogOut } from 'lucide-react';
import React from 'react';

interface SharedAuth {
    impersonator?: {
        id: number;
        name: string;
    } | null;
}

export default function ImpersonationBanner() {
    const { auth } = usePage<{ auth: SharedAuth }>().props;
    const { post, processing } = useForm();

    if (!auth?.impersonator) {
        return null;
    }

    const handleStop = (e: React.FormEvent) => {
        e.preventDefault();
        post('/console/users/stop-impersonating');
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="flex items-center justify-between bg-amber-600 px-4 py-2.5 text-sm font-medium text-white shadow-md"
            >
                <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 animate-pulse" />
                    <span>
                        You are currently impersonating this user. Original
                        admin account: <strong>{auth.impersonator.name}</strong>
                    </span>
                </div>
                <form onSubmit={handleStop}>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-1.5 rounded-md bg-amber-800 px-3 py-1 text-xs font-semibold transition hover:bg-amber-900"
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        Exit Impersonation
                    </button>
                </form>
            </motion.div>
        </AnimatePresence>
    );
}
