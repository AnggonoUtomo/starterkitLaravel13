import { Users, UserPlus } from 'lucide-react';
import React from 'react';
import ConsolePageHeader from '@/components/console/ConsolePageHeader';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface UserManagementHeaderProps {
    title: string;
    onOpenCreateModal: () => void;
}

export default function UserManagementHeader({
    title,
    onOpenCreateModal,
}: UserManagementHeaderProps) {
    return (
        <TooltipProvider>
            <ConsolePageHeader
                title={title}
                description="Kelola pengguna aplikasi, alokasikan peran Spatie RBAC, dan impersonasi akun."
                icon={Users}
                iconColor="text-emerald-500"
                action={
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={onOpenCreateModal}
                                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-emerald-500/20 transition hover:bg-emerald-700 active:scale-95 enabled:cursor-pointer"
                            >
                                <UserPlus className="h-4 w-4" />
                                <span>Tambah Pengguna Baru</span>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            Buka modal formulir untuk menambahkan pengguna baru
                            (Ctrl+Shift+A)
                        </TooltipContent>
                    </Tooltip>
                }
            />
        </TooltipProvider>
    );
}
