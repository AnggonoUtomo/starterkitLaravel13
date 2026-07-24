import { UserCheck } from 'lucide-react';
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

interface ImpersonateUserModalProps {
    impersonatingUser: UserData | null;
    onClose: () => void;
    onConfirmImpersonate: (user: UserData) => void;
}

export default function ImpersonateUserModal({
    impersonatingUser,
    onClose,
    onConfirmImpersonate,
}: ImpersonateUserModalProps) {
    const [isImpersonating, setIsImpersonating] = useState(false);

    const handleConfirm = () => {
        if (!impersonatingUser) {
            return;
        }

        setIsImpersonating(true);
        onConfirmImpersonate(impersonatingUser);
    };

    const handleOpenChange = (open: boolean) => {
        if (!open && !isImpersonating) {
            onClose();
        }
    };

    return (
        <Dialog open={!!impersonatingUser} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
                            <UserCheck className="h-5 w-5" />
                        </div>
                        <div>
                            <DialogTitle className="text-base font-bold">
                                Konfirmasi Impersonation
                            </DialogTitle>
                            <DialogDescription>
                                Masuk sebagai akun pengguna target untuk
                                sementara waktu.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {impersonatingUser && (
                    <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs text-foreground">
                        Anda akan beralih sementara untuk bertindak sebagai
                        pengguna{' '}
                        <span className="font-bold text-emerald-500">
                            {impersonatingUser.name}
                        </span>{' '}
                        ({impersonatingUser.email}). Bilah peringatan
                        impersonasi akan muncul di bagian atas untuk kembali ke
                        akun Admin kapan saja.
                    </div>
                )}

                <DialogFooter>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isImpersonating}
                        className="cursor-pointer px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={isImpersonating}
                        className="cursor-pointer rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isImpersonating ? 'Memproses...' : 'Mulai Impersonate'}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
