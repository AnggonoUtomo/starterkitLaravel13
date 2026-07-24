import { Shield, Plus } from 'lucide-react';
import React from 'react';
import ConsolePageHeader from '@/components/console/ConsolePageHeader';

interface AccessControlHeaderProps {
    title: string;
    onOpenCreateModal: () => void;
}

export default function AccessControlHeader({
    title,
    onOpenCreateModal,
}: AccessControlHeaderProps) {
    return (
        <ConsolePageHeader
            title={title}
            description="Manage Spatie roles and fine-grained permission matrices across all Console submodules."
            icon={Shield}
            iconColor="text-indigo-500"
            action={
                <button
                    onClick={onOpenCreateModal}
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-700 active:scale-95 cursor-pointer"
                >
                    <Plus className="h-4 w-4" />
                    <span>Create New Role</span>
                </button>
            }
        />
    );
}
