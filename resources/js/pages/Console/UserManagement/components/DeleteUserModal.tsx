import { AlertTriangle } from 'lucide-react';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
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
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirm = () => {
        if (!deletingUser) {
            return;
        }

        setIsDeleting(true);
        onConfirmDelete(deletingUser);
    };

    const handleOpenChange = (open: boolean) => {
        if (!open && !isDeleting) {
            onClose();
        }
    };

    return (
        <Dialog open={!!deletingUser} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg border border-rose-500/20 bg-rose-500/10 text-rose-500">
                            <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div>
                            <DialogTitle className="text-base font-bold">
                                Konfirmasi Hapus Akun
                            </DialogTitle>
                            <DialogDescription>
                                Tindakan ini akan menghapus akun pengguna secara
                                permanen.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {deletingUser && (
                    <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs text-foreground">
                        Apakah Anda yakin ingin menghapus akun{' '}
                        <span className="font-bold text-rose-500">
                            {deletingUser.name}
                        </span>{' '}
                        ({deletingUser.email})?
                    </div>
                )}

                <DialogFooter>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="cursor-pointer px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={isDeleting}
                        className="cursor-pointer rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isDeleting ? 'Menghapus...' : 'Hapus Pengguna'}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
