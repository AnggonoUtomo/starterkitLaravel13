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
                    <DialogTitle className="text-base font-bold">
                        Buat Role Baru
                    </DialogTitle>
                    <DialogDescription>
                        Masukkan nama role baru yang ingin dibuat. Role ini
                        dapat dikonfigurasi dengan permission di matriks izin.
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
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <DialogFooter>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isProcessing}
                            className="cursor-pointer px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isProcessing ? 'Memproses...' : 'Buat Role'}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
