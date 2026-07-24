import { Head, useForm, router } from '@inertiajs/react';
import React, { useState } from 'react';
import ConsoleFilterBar from '@/components/console/ConsoleFilterBar';
import ConsoleLayout from '@/layouts/ConsoleLayout';
import CreateUserModal from './components/CreateUserModal';
import EditUserModal from './components/EditUserModal';
import UserManagementHeader from './components/UserManagementHeader';
import UserTable from './components/UserTable';

interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    created_at: string;
}

interface PaginatedUsers {
    data: User[];
    links: any[];
    total: number;
}

interface Props {
    title: string;
    users: PaginatedUsers;
    availableRoles: string[];
    filters: {
        search: string;
    };
}

export default function Index({
    title,
    users,
    availableRoles,
    filters,
}: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const createForm = useForm({
        name: '',
        email: '',
        password: '',
        roles: [] as string[],
    });

    const editForm = useForm({
        name: '',
        email: '',
        password: '',
        roles: [] as string[],
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/console/users', { search }, { preserveState: true });
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/console/users', {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createForm.reset();
            },
        });
    };

    const handleEditOpen = (user: User) => {
        setEditingUser(user);
        editForm.setData({
            name: user.name,
            email: user.email,
            password: '',
            roles: user.roles || [],
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingUser) {
            return;
        }

        editForm.put(`/console/users/${editingUser.id}`, {
            onSuccess: () => {
                setEditingUser(null);
            },
        });
    };

    const handleDelete = (user: User) => {
        if (confirm(`Are you sure you want to delete user ${user.name}?`)) {
            router.delete(`/console/users/${user.id}`);
        }
    };

    const handleImpersonate = (user: User) => {
        router.post(`/console/users/${user.id}/impersonate`);
    };

    return (
        <ConsoleLayout>
            <Head title={title} />
            <div className="mx-auto max-w-7xl space-y-6 p-6">
                {/* Header Section */}
                <UserManagementHeader
                    title={title}
                    onOpenCreateModal={() => setIsCreateModalOpen(true)}
                />

                {/* Filter & Search Bar */}
                <ConsoleFilterBar
                    search={search}
                    onSearchChange={setSearch}
                    onSubmit={handleSearch}
                    placeholder="Search by name or email..."
                    totalCount={users.total}
                    totalCountLabel="Total Users"
                    focusColorClass="focus:ring-emerald-500"
                />

                {/* Users Table */}
                <UserTable
                    users={users.data}
                    onImpersonate={handleImpersonate}
                    onEditOpen={handleEditOpen}
                    onDelete={handleDelete}
                />
            </div>

            {/* Create User Modal */}
            <CreateUserModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                formData={createForm.data}
                onFieldChange={(field, value) =>
                    createForm.setData(field as any, value)
                }
                availableRoles={availableRoles}
                onSubmit={handleCreateSubmit}
                isProcessing={createForm.processing}
            />

            {/* Edit User Modal */}
            <EditUserModal
                editingUser={editingUser}
                onClose={() => setEditingUser(null)}
                formData={editForm.data}
                onFieldChange={(field, value) =>
                    editForm.setData(field as any, value)
                }
                availableRoles={availableRoles}
                onSubmit={handleEditSubmit}
                isProcessing={editForm.processing}
            />
        </ConsoleLayout>
    );
}
