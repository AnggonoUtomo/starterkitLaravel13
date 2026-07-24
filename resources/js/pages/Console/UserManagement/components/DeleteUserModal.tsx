import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import React from 'react';
import type { UserData } from './UserWorkspaceCard';

interface DeleteUserModalProps {
    deletingUser: UserData | null;
    onClose: () => void;
    onConfirmDelete: (user: UserData) => void;
}

export default function DeleteUserModal({
    deletingUser,
    onClose,
    onConfirmDelete,
}: DeleteUserModalProps) {
    return (
        <AnimatePresence>
            {deletingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-xs">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-lg border border-rose-500/20 bg-rose-500/10 text-rose-500">
                                    <AlertTriangle className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-foreground">Konfirmasi Hapus Akun</h3>
                                    <p className="text-xs text-muted-foreground">Tindakan ini akan menghapus akun pengguna.</p>
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
                            Apakah Anda yakin ingin menghapus akun <span className="font-bold text-rose-500">{deletingUser.name}</span> ({deletingUser.email})?
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
                                onClick={() => onConfirmDelete(deletingUser)}
                                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-700 cursor-pointer shadow-2xs"
                            >
                                Hapus Pengguna
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
