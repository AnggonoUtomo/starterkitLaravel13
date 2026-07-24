import { Head, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    UserPlus,
    Shield,
    UserCheck,
    Trash2,
    Edit3,
    Search,
    X,
} from 'lucide-react';
import React, { useState } from 'react';
import ConsoleLayout from '@/layouts/ConsoleLayout';

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
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                            <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                            <span>{title}</span>
                        </h1>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                            Manage application users, assign Spatie roles, and
                            impersonate accounts.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 transition hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-600"
                    >
                        <UserPlus className="h-4 w-4" />
                        <span>Add New User</span>
                    </button>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                    <form
                        onSubmit={handleSearch}
                        className="relative w-full max-w-md"
                    >
                        <Search className="absolute top-3 left-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or email..."
                            className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pr-4 pl-9 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:placeholder-slate-500"
                        />
                    </form>
                    <div className="font-mono text-xs font-medium text-slate-600 dark:text-slate-400">
                        Total Users: {users.total}
                    </div>
                </div>

                {/* Users Table */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-xl">
                    <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
                        <thead className="border-b border-slate-200 bg-slate-100 text-xs font-semibold tracking-wider text-slate-700 uppercase dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                            <tr>
                                <th className="px-6 py-4">User Info</th>
                                <th className="px-6 py-4">Assigned Roles</th>
                                <th className="px-6 py-4">Created Date</th>
                                <th className="px-6 py-4 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                            {users.data.length > 0 ? (
                                users.data.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                                                {user.name}
                                            </div>
                                            <div className="text-xs text-slate-600 dark:text-slate-400">
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1.5">
                                                {user.roles &&
                                                user.roles.length > 0 ? (
                                                    user.roles.map((r) => (
                                                        <span
                                                            key={r}
                                                            className="inline-flex items-center gap-1 rounded border border-emerald-500/30 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                        >
                                                            <Shield className="h-3 w-3" />{' '}
                                                            {r}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-xs text-slate-400 italic dark:text-slate-500">
                                                        No roles
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-slate-600 dark:text-slate-400">
                                            {user.created_at
                                                ? new Date(
                                                      user.created_at,
                                                  ).toLocaleDateString()
                                                : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleImpersonate(user)
                                                    }
                                                    className="rounded-lg bg-amber-100 p-1.5 text-amber-700 transition hover:bg-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20"
                                                    title="Impersonate User"
                                                >
                                                    <UserCheck className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleEditOpen(user)
                                                    }
                                                    className="rounded-lg bg-blue-100 p-1.5 text-blue-700 transition hover:bg-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
                                                    title="Edit User"
                                                >
                                                    <Edit3 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(user)
                                                    }
                                                    className="rounded-lg bg-rose-100 p-1.5 text-rose-700 transition hover:bg-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
                                                    title="Delete User"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-12 text-center text-sm text-slate-500 dark:text-slate-400"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create User Modal */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm dark:bg-slate-950/80">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                    Create New User
                                </h3>
                                <button
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form
                                onSubmit={handleCreateSubmit}
                                className="mt-4 space-y-4"
                            >
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-slate-300">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={createForm.data.name}
                                        onChange={(e) =>
                                            createForm.setData(
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-slate-300">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={createForm.data.email}
                                        onChange={(e) =>
                                            createForm.setData(
                                                'email',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-slate-300">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={createForm.data.password}
                                        onChange={(e) =>
                                            createForm.setData(
                                                'password',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-semibold text-slate-300">
                                        Assign Roles
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {availableRoles.map((role) => {
                                            const isSelected =
                                                createForm.data.roles.includes(
                                                    role,
                                                );

                                            return (
                                                <button
                                                    key={role}
                                                    type="button"
                                                    onClick={() => {
                                                        const current =
                                                            createForm.data
                                                                .roles;

                                                        if (isSelected) {
                                                            createForm.setData(
                                                                'roles',
                                                                current.filter(
                                                                    (r) =>
                                                                        r !==
                                                                        role,
                                                                ),
                                                            );
                                                        } else {
                                                            createForm.setData(
                                                                'roles',
                                                                [
                                                                    ...current,
                                                                    role,
                                                                ],
                                                            );
                                                        }
                                                    }}
                                                    className={`rounded-lg border px-3 py-1 text-xs font-medium transition ${
                                                        isSelected
                                                            ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
                                                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                                                    }`}
                                                >
                                                    {role}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 border-t border-slate-800 pt-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsCreateModalOpen(false)
                                        }
                                        className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={createForm.processing}
                                        className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-600"
                                    >
                                        Save User
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* Edit User Modal */}
                {editingUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
                        >
                            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                                <h3 className="text-lg font-bold text-slate-100">
                                    Edit User: {editingUser.name}
                                </h3>
                                <button
                                    onClick={() => setEditingUser(null)}
                                    className="text-slate-400 hover:text-slate-200"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form
                                onSubmit={handleEditSubmit}
                                className="mt-4 space-y-4"
                            >
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-slate-300">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.data.name}
                                        onChange={(e) =>
                                            editForm.setData(
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-slate-300">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={editForm.data.email}
                                        onChange={(e) =>
                                            editForm.setData(
                                                'email',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-slate-300">
                                        Password (Leave empty to keep current)
                                    </label>
                                    <input
                                        type="password"
                                        value={editForm.data.password}
                                        onChange={(e) =>
                                            editForm.setData(
                                                'password',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-semibold text-slate-300">
                                        Assign Roles
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {availableRoles.map((role) => {
                                            const isSelected =
                                                editForm.data.roles.includes(
                                                    role,
                                                );

                                            return (
                                                <button
                                                    key={role}
                                                    type="button"
                                                    onClick={() => {
                                                        const current =
                                                            editForm.data.roles;

                                                        if (isSelected) {
                                                            editForm.setData(
                                                                'roles',
                                                                current.filter(
                                                                    (r) =>
                                                                        r !==
                                                                        role,
                                                                ),
                                                            );
                                                        } else {
                                                            editForm.setData(
                                                                'roles',
                                                                [
                                                                    ...current,
                                                                    role,
                                                                ],
                                                            );
                                                        }
                                                    }}
                                                    className={`rounded-lg border px-3 py-1 text-xs font-medium transition ${
                                                        isSelected
                                                            ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
                                                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                                                    }`}
                                                >
                                                    {role}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 border-t border-slate-800 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setEditingUser(null)}
                                        className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={editForm.processing}
                                        className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-600"
                                    >
                                        Update User
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </ConsoleLayout>
    );
}
