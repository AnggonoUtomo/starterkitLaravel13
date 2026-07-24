import { Head, useForm, router } from '@inertiajs/react';
import React, { useState, useEffect, useCallback } from 'react';
import ConsoleLayout from '@/layouts/ConsoleLayout';
import DeleteUserModal from './components/DeleteUserModal';
import ImpersonateUserModal from './components/ImpersonateUserModal';
import UserManagementHeader from './components/UserManagementHeader';
import UserShortcutPanel from './components/UserShortcutPanel';
import UserSummaryCards from './components/UserSummaryCards';
import UserTable from './components/UserTable';
import type {
    UserWorkspaceMode,
    RoleOptionItem,
    PermissionGroupItem,
    UserData,
} from './components/UserWorkspaceCard';
import UserWorkspaceCard from './components/UserWorkspaceCard';

interface PaginatedUsers {
    data: UserData[];
    links: any[];
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
}

interface Props {
    title: string;
    users: PaginatedUsers;
    availableRoles: string[];
    rolesWithPermissions?: RoleOptionItem[];
    permissionGroups?: PermissionGroupItem[];
    filters: {
        search: string;
        role?: string;
    };
}

export default function Index({
    title,
    users,
    availableRoles,
    rolesWithPermissions = [],
    permissionGroups = [],
    filters,
}: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');
    const [selectedUser, setSelectedUser] = useState<UserData | null>(
        users.data[0] || null,
    );
    const [workspaceMode, setWorkspaceMode] =
        useState<UserWorkspaceMode>('detail');
    const [deletingUser, setDeletingUser] = useState<UserData | null>(null);
    const [impersonatingUser, setImpersonatingUser] = useState<UserData | null>(
        null,
    );

    // Synchronize selectedUser state with fresh users.data props from server without extra renders (React 19 pattern)
    const [prevUsersData, setPrevUsersData] = useState(users.data);

    if (prevUsersData !== users.data) {
        setPrevUsersData(users.data);

        if (selectedUser) {
            const updated = users.data.find((u) => u.id === selectedUser.id);
            setSelectedUser(updated || users.data[0] || null);
        } else {
            setSelectedUser(users.data[0] || null);
        }
    }

    // Form Hook for Create / Edit
    const form = useForm({
        name: '',
        email: '',
        password: '',
        roles: [] as string[],
        permissions: [] as string[],
    });

    const handleStartCreate = useCallback(() => {
        form.setData({
            name: '',
            email: '',
            password: '',
            roles: [],
            permissions: [],
        });
        setWorkspaceMode('create');
    }, [form]);

    const handleCancelWorkspace = useCallback(() => {
        form.reset();
        setWorkspaceMode('detail');
    }, [form]);

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

            // Ctrl/Cmd + Shift + A -> Open Create Form
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && key === 'a') {
                e.preventDefault();
                handleStartCreate();

                return;
            }

            // / -> Focus Search Input
            if (key === '/' && !isEditableTarget(e.target)) {
                e.preventDefault();
                document.getElementById('user-search-input')?.focus();

                return;
            }

            // Alt + R -> Focus Role Filter Trigger
            if (e.altKey && key === 'r') {
                e.preventDefault();
                document.getElementById('user-role-filter-trigger')?.focus();

                return;
            }

            // Delete Key -> Delete Selected User
            if (
                e.key === 'Delete' &&
                !isEditableTarget(e.target) &&
                selectedUser
            ) {
                e.preventDefault();
                setDeletingUser(selectedUser);

                return;
            }

            // Escape Key -> Cancel Workspace Mode
            if (e.key === 'Escape') {
                handleCancelWorkspace();
            }
        };

        window.addEventListener('keydown', handleShortcut);

        return () => window.removeEventListener('keydown', handleShortcut);
    }, [selectedUser, handleStartCreate, handleCancelWorkspace]);

    // SPA Search & Filter Handlers
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/console/users',
            { search, role: roleFilter },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const handleRoleFilterChange = (newRole: string) => {
        setRoleFilter(newRole);
        router.get(
            '/console/users',
            { search, role: newRole },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const handleSelectUser = (user: UserData) => {
        setSelectedUser(user);
        setWorkspaceMode('detail');
    };

    const handleStartEdit = (user: UserData) => {
        setSelectedUser(user);
        form.setData({
            name: user.name,
            email: user.email,
            password: '',
            roles: user.roles || [],
            permissions: user.permissions || [],
        });
        setWorkspaceMode('edit');
    };

    // SPA CRUD Form Handlers
    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/console/users', {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                form.reset();
                setWorkspaceMode('detail');
            },
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedUser) {
            return;
        }

        form.put(`/console/users/${selectedUser.id}`, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                form.reset();
                setWorkspaceMode('detail');
            },
        });
    };

    const handleConfirmDelete = (user: UserData) => {
        router.delete(`/console/users/${user.id}`, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setDeletingUser(null);
            },
        });
    };

    const handleConfirmImpersonate = (user: UserData) => {
        router.post(
            `/console/users/${user.id}/impersonate`,
            {},
            {
                onSuccess: () => {
                    setImpersonatingUser(null);
                },
            },
        );
    };

    return (
        <ConsoleLayout>
            <Head title={title} />
            <div className="mx-auto max-w-7xl space-y-6 p-6">
                {/* Page Header */}
                <UserManagementHeader
                    title={title}
                    onOpenCreateModal={handleStartCreate}
                />

                {/* Summary Metrics Cards */}
                <UserSummaryCards
                    totalUsers={users.total}
                    totalRoles={availableRoles.length}
                />

                {/* Keyboard Shortcuts Banner */}
                <UserShortcutPanel />

                {/* Grid Split Workspace (Left: User Datatable, Right: User Workspace Card) */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    {/* Left Column (2-Cols Table) */}
                    <div className="xl:col-span-2">
                        <UserTable
                            users={users.data}
                            selectedUser={selectedUser}
                            search={search}
                            roleFilter={roleFilter}
                            availableRoles={availableRoles}
                            totalUsers={users.total}
                            onSearchChange={setSearch}
                            onRoleFilterChange={handleRoleFilterChange}
                            onSearchSubmit={handleSearchSubmit}
                            onSelectUser={handleSelectUser}
                            onOpenCreate={handleStartCreate}
                            onOpenEdit={handleStartEdit}
                            onOpenDelete={(user) => setDeletingUser(user)}
                            onOpenImpersonate={(user) =>
                                setImpersonatingUser(user)
                            }
                        />
                    </div>

                    {/* Right Column (1-Col Workspace Card: Detail / Form) */}
                    <div className="xl:col-span-1">
                        <UserWorkspaceCard
                            mode={workspaceMode}
                            selectedUser={selectedUser}
                            formData={form.data}
                            availableRoles={availableRoles}
                            rolesWithPermissions={rolesWithPermissions}
                            permissionGroups={permissionGroups}
                            isProcessing={form.processing}
                            onFieldChange={(field, val) =>
                                form.setData(field as any, val)
                            }
                            onSubmitCreate={handleCreateSubmit}
                            onSubmitEdit={handleEditSubmit}
                            onCancel={handleCancelWorkspace}
                            onStartEdit={handleStartEdit}
                            onStartDelete={(user) => setDeletingUser(user)}
                            onStartImpersonate={(user) =>
                                setImpersonatingUser(user)
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Modals */}
            <DeleteUserModal
                deletingUser={deletingUser}
                onClose={() => setDeletingUser(null)}
                onConfirmDelete={handleConfirmDelete}
            />

            <ImpersonateUserModal
                impersonatingUser={impersonatingUser}
                onClose={() => setImpersonatingUser(null)}
                onConfirmImpersonate={handleConfirmImpersonate}
            />
        </ConsoleLayout>
    );
}
