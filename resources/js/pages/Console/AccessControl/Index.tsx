import { Head, router } from '@inertiajs/react';
import React, { useState, useEffect, useMemo } from 'react';
import ConsoleLayout from '@/layouts/ConsoleLayout';
import AccessControlHeader from './components/AccessControlHeader';
import AccessControlShortcutPanel from './components/AccessControlShortcutPanel';
import CreateRoleModal from './components/CreateRoleModal';
import RolePermissionWorkspace from './components/RolePermissionWorkspace';

interface Permission {
    id?: number | string;
    name: string;
    label?: string;
}

interface Role {
    id: number;
    name: string;
    guard_name?: string;
    is_protected?: boolean;
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
    const [activeRoleId, setActiveRoleId] = useState<number | null>(
        roles[0]?.id || null,
    );
    const [isProcessing, setIsProcessing] = useState(false);

    // Get current active role object
    const activeRole = useMemo(() => {
        return (
            roles.find((r) => r.id === activeRoleId) ||
            roles[0] ||
            null
        );
    }, [roles, activeRoleId]);

    // Local state for selected permissions of the active role
    const [prevRoleId, setPrevRoleId] = useState<number | null>(activeRole?.id || null);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>(() =>
        activeRole ? activeRole.permissions.map((p) => p.name) : [],
    );

    // Sync selected permissions when activeRole changes during render
    if (activeRole && activeRole.id !== prevRoleId) {
        setPrevRoleId(activeRole.id);
        setSelectedPermissions(activeRole.permissions.map((p) => p.name));
    }

    // Format groupedPermissions object into structured array for workspace
    const permissionGroups = useMemo(() => {
        return Object.entries(groupedPermissions).map(([module, permList]) => ({
            module,
            label: module,
            permissions: permList.map((permName) => ({
                name: permName,
                label: permName,
            })),
        }));
    }, [groupedPermissions]);

    // Keyboard Shortcuts Listener
    useEffect(() => {
        const isEditableTarget = (target: EventTarget | null) => {
            if (!(target instanceof HTMLElement)) {
                return false;
            }

            return (
                ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) ||
                target.isContentEditable
            );
        };

        const handleShortcut = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();

            // Ctrl/Cmd + Shift + A -> New Role Modal
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && key === 'a') {
                e.preventDefault();
                setIsRoleModalOpen(true);

                return;
            }

            // Alt + R -> Focus Role Select
            if (e.altKey && key === 'r') {
                e.preventDefault();
                document.getElementById('access-role-select')?.focus();

                return;
            }

            // Alt + P -> Focus First Permission / Search
            if (e.altKey && key === 'p') {
                e.preventDefault();
                document.getElementById('access-permission-first')?.focus();

                return;
            }

            // Ctrl/Cmd + S -> Save Permissions
            if ((e.metaKey || e.ctrlKey) && key === 's') {
                e.preventDefault();
                document.getElementById('access-save-permissions')?.click();

                return;
            }

            // Delete Key -> Delete Active Role
            if (
                e.key === 'Delete' &&
                !isEditableTarget(e.target) &&
                activeRole &&
                activeRole.name !== 'Super System'
            ) {
                e.preventDefault();
                document.getElementById('access-delete-role')?.click();
            }
        };

        window.addEventListener('keydown', handleShortcut);

        return () => window.removeEventListener('keydown', handleShortcut);
    }, [activeRole]);

    // Handlers
    const handleTogglePermission = (permName: string) => {
        setSelectedPermissions((prev) =>
            prev.includes(permName)
                ? prev.filter((p) => p !== permName)
                : [...prev, permName],
        );
    };

    const handleToggleGroup = (group: { permissions: { name: string }[] }) => {
        const groupPermNames = group.permissions.map((p) => p.name);
        const allChecked = groupPermNames.every((p) =>
            selectedPermissions.includes(p),
        );

        if (allChecked) {
            setSelectedPermissions((prev) =>
                prev.filter((p) => !groupPermNames.includes(p)),
            );
        } else {
            setSelectedPermissions((prev) =>
                Array.from(new Set([...prev, ...groupPermNames])),
            );
        }
    };

    const handleReset = () => {
        if (activeRole) {
            setSelectedPermissions(activeRole.permissions.map((p) => p.name));
        }
    };

    const handleSavePermissions = () => {
        if (!activeRole || activeRole.name === 'Super System') {
            return;
        }

        setIsProcessing(true);
        router.put(
            `/console/access-control/roles/${activeRole.id}/permissions`,
            { permissions: selectedPermissions },
            {
                preserveScroll: true,
                onFinish: () => setIsProcessing(false),
            },
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
        if (confirm(`Apakah Anda yakin ingin menghapus role ${role.name}?`)) {
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

                {/* Keyboard Shortcut Banner */}
                <AccessControlShortcutPanel />

                {/* Split Workspace (Role Control Card + Permission Module Panel) */}
                {activeRole && (
                    <RolePermissionWorkspace
                        roles={roles}
                        activeRole={activeRole}
                        activeRoleId={activeRole.id}
                        permissionGroups={permissionGroups}
                        selectedPermissions={selectedPermissions}
                        isProcessing={isProcessing}
                        onRoleChange={(roleId) => setActiveRoleId(roleId)}
                        onAddRole={() => setIsRoleModalOpen(true)}
                        onReset={handleReset}
                        onSubmit={handleSavePermissions}
                        onDeleteRole={handleDeleteRole}
                        onTogglePermission={handleTogglePermission}
                        onToggleGroup={handleToggleGroup}
                    />
                )}
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
