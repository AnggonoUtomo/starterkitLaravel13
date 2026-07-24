import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface CreateRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    roleName: string;
    onRoleNameChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isProcessing?: boolean;
}

export default function CreateRoleModal({
    isOpen,
    onClose,
    roleName,
    onRoleNameChange,
    onSubmit,
    isProcessing = false,
}: CreateRoleModalProps) {
    const handleOpenChange = (open: boolean) => {
        if (!open && !isProcessing) {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-base font-bold">Buat Role Baru</DialogTitle>
                    <DialogDescription>
                        Masukkan nama role baru yang ingin dibuat. Role ini dapat dikonfigurasi
                        dengan permission di matriks izin.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                            Nama Role
                        </label>
                        <input
                            type="text"
                            value={roleName}
                            onChange={(e) => onRoleNameChange(e.target.value)}
                            placeholder="cth: Editor, Supervisor"
                            required
                            disabled={isProcessing}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <DialogFooter>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isProcessing}
                            className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700 cursor-pointer shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? 'Memproses...' : 'Buat Role'}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
