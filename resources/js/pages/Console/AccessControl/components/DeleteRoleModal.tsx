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

interface Role {
    id: number;
    name: string;
    guard_name?: string;
    is_protected?: boolean;
    permissions?: string[];
}

interface DeleteRoleModalProps {
    deletingRole: Role | null;
    onClose: () => void;
    onConfirmDelete: (role: Role) => void;
}

export default function DeleteRoleModal({
    deletingRole,
    onClose,
    onConfirmDelete,
}: DeleteRoleModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirm = () => {
        if (!deletingRole) {
            return;
        }

        setIsDeleting(true);
        onConfirmDelete(deletingRole);
    };

    const handleOpenChange = (open: boolean) => {
        if (!open && !isDeleting) {
            onClose();
        }
    };

    return (
        <Dialog open={!!deletingRole} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg border border-rose-500/20 bg-rose-500/10 text-rose-500">
                            <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div>
                            <DialogTitle className="text-base font-bold">Konfirmasi Hapus Role</DialogTitle>
                            <DialogDescription>Tindakan ini akan menghapus role secara permanen beserta seluruh izin yang terkait.</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {deletingRole && (
                    <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs text-foreground">
                        Apakah Anda yakin ingin menghapus role <span className="font-bold text-rose-500">{deletingRole.name}</span>?
                        Seluruh pengguna yang memiliki role ini akan kehilangan izin terkait.
                    </div>
                )}

                <DialogFooter>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={isDeleting}
                        className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-700 cursor-pointer shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDeleting ? 'Menghapus...' : 'Hapus Role'}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
