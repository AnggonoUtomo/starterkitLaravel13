import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, X } from 'lucide-react';
import React from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface ImpersonateUserModalProps {
    impersonatingUser: User | null;
    onClose: () => void;
    onConfirmImpersonate: (user: User) => void;
}

export default function ImpersonateUserModal({
    impersonatingUser,
    onClose,
    onConfirmImpersonate,
}: ImpersonateUserModalProps) {
    return (
        <AnimatePresence>
            {impersonatingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-xs">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
                                    <UserCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-foreground">Konfirmasi Impersonation</h3>
                                    <p className="text-xs text-muted-foreground">Masuk sebagai akun pengguna target.</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-muted-foreground hover:text-foreground cursor-pointer"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mt-4 rounded-lg border border-border bg-muted/30 p-3 text-xs text-foreground">
                            Anda akan beralih sementara untuk bertindak sebagai pengguna <span className="font-bold text-emerald-500">{impersonatingUser.name}</span> ({impersonatingUser.email}).
                            Bilah peringatan impersonasi akan muncul di bagian atas untuk kembali ke akun Admin kapan saja.
                        </div>

                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={() => onConfirmImpersonate(impersonatingUser)}
                                className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 cursor-pointer shadow-2xs"
                            >
                                Mulai Impersonate
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
