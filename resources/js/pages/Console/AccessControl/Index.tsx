import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import ConsoleLayout from '@/layouts/ConsoleLayout';
import AccessControlHeader from './components/AccessControlHeader';
import CreateRoleModal from './components/CreateRoleModal';
import PermissionMatrixTable from './components/PermissionMatrixTable';

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}

interface Props {
    title: string;
    roles: Role[];
    groupedPermissions: Record<string, string[]>;
}

export default function Index({ title, roles, groupedPermissions }: Props) {
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [newRoleName, setNewRoleName] = useState('');

    const handleTogglePermission = (role: Role, permName: string) => {
        const currentPerms = role.permissions.map((p) => p.name);
        const hasPerm = currentPerms.includes(permName);
        const updated = hasPerm
            ? currentPerms.filter((p) => p !== permName)
            : [...currentPerms, permName];

        router.put(
            `/console/access-control/roles/${role.id}/permissions`,
            { permissions: updated },
            { preserveScroll: true },
        );
    };

    const handleCreateRole = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(
            '/console/access-control/roles',
            { name: newRoleName },
            {
                onSuccess: () => {
                    setNewRoleName('');
                    setIsRoleModalOpen(false);
                },
            },
        );
    };

    const handleDeleteRole = (role: Role) => {
        if (confirm(`Delete role ${role.name}?`)) {
            router.delete(`/console/access-control/roles/${role.id}`);
        }
    };

    return (
        <ConsoleLayout>
            <Head title={title} />
            <div className="mx-auto max-w-7xl space-y-6 p-6">
                {/* Module Header */}
                <AccessControlHeader
                    title={title}
                    onOpenCreateModal={() => setIsRoleModalOpen(true)}
                />

                {/* Role Permission Matrix Table */}
                <PermissionMatrixTable
                    roles={roles}
                    groupedPermissions={groupedPermissions}
                    onTogglePermission={handleTogglePermission}
                    onDeleteRole={handleDeleteRole}
                />
            </div>

            {/* Create Role Modal */}
            <CreateRoleModal
                isOpen={isRoleModalOpen}
                onClose={() => setIsRoleModalOpen(false)}
                roleName={newRoleName}
                onRoleNameChange={setNewRoleName}
                onSubmit={handleCreateRole}
            />
        </ConsoleLayout>
    );
}
