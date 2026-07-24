import { Users, UserPlus } from 'lucide-react';
import React from 'react';
import ConsolePageHeader from '@/components/console/ConsolePageHeader';

interface UserManagementHeaderProps {
    title: string;
    onOpenCreateModal: () => void;
}

export default function UserManagementHeader({
    title,
    onOpenCreateModal,
}: UserManagementHeaderProps) {
    return (
        <ConsolePageHeader
            title={title}
            description="Manage application users, assign Spatie roles, and impersonate accounts."
            icon={Users}
            iconColor="text-emerald-500"
            action={
                <button
                    onClick={onOpenCreateModal}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 transition hover:bg-emerald-700 active:scale-95"
                >
                    <UserPlus className="h-4 w-4" />
                    <span>Add New User</span>
                </button>
            }
        />
    );
}
