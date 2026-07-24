import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Plus, Check, X, Lock } from 'lucide-react';
import React, { useState } from 'react';
import ConsoleLayout from '@/layouts/ConsoleLayout';

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
            {
                permissions: updated,
            },
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
                {/* Header Section */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                            <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            <span>{title}</span>
                        </h1>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                            Manage Spatie roles and fine-grained permission
                            matrices across all Console submodules.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsRoleModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-700 dark:bg-indigo-500 dark:text-slate-950 dark:hover:bg-indigo-600"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Create New Role</span>
                    </button>
                </div>

                {/* Role Matrix Grid Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-xl">
                    <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
                        <thead className="border-b border-slate-200 bg-slate-100 text-xs font-semibold tracking-wider text-slate-700 uppercase dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                            <tr>
                                <th className="px-6 py-4">Permission Name</th>
                                {roles.map((role) => (
                                    <th
                                        key={role.id}
                                        className="min-w-[140px] px-6 py-4 text-center"
                                    >
                                        <div className="flex items-center justify-center gap-1.5">
                                            <span className="font-bold text-slate-900 dark:text-slate-200">
                                                {role.name}
                                            </span>
                                            {role.name !== 'Super System' && (
                                                <button
                                                    onClick={() =>
                                                        handleDeleteRole(role)
                                                    }
                                                    className="text-slate-400 transition hover:text-rose-600 dark:text-slate-500 dark:hover:text-rose-400"
                                                    title="Delete Role"
                                                >
                                                    <X className="h-3.5 w-3.5" />
                                                </button>
                                            )}
                                        </div>
                                        <div className="mt-0.5 font-mono text-[10px] font-normal text-indigo-600 dark:text-indigo-400">
                                            {role.permissions.length} perms
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                            {Object.entries(groupedPermissions).map(
                                ([submodule, perms]) => (
                                    <React.Fragment key={submodule}>
                                        {/* Submodule Section Header */}
                                        <tr className="bg-indigo-50 text-xs font-bold tracking-wider text-indigo-800 uppercase dark:bg-slate-950/80 dark:text-indigo-300">
                                            <td
                                                colSpan={roles.length + 1}
                                                className="border-t border-slate-200 px-6 py-2.5 dark:border-slate-800"
                                            >
                                                📦 Submodule:{' '}
                                                <span className="text-slate-900 dark:text-slate-100">
                                                    {submodule}
                                                </span>
                                            </td>
                                        </tr>

                                        {/* Permission Rows */}
                                        {perms.map((permName) => (
                                            <tr
                                                key={permName}
                                                className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                            >
                                                <td className="flex items-center gap-2 px-6 py-3 font-mono text-xs font-medium text-slate-800 dark:text-slate-300">
                                                    <Lock className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                                                    <span>{permName}</span>
                                                </td>

                                                {roles.map((role) => {
                                                    const hasPerm =
                                                        role.permissions.some(
                                                            (p) =>
                                                                p.name ===
                                                                permName,
                                                        );
                                                    const isSuperSystem =
                                                        role.name ===
                                                        'Super System';

                                                    return (
                                                        <td
                                                            key={role.id}
                                                            className="px-6 py-3 text-center"
                                                        >
                                                            <button
                                                                onClick={() =>
                                                                    !isSuperSystem &&
                                                                    handleTogglePermission(
                                                                        role,
                                                                        permName,
                                                                    )
                                                                }
                                                                disabled={
                                                                    isSuperSystem
                                                                }
                                                                className={`inline-flex h-7 w-7 items-center justify-center rounded-lg border transition ${
                                                                    hasPerm
                                                                        ? 'border-emerald-500 bg-emerald-100 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/20 dark:text-emerald-400'
                                                                        : 'border-slate-300 bg-slate-50 text-slate-400 hover:border-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-600 dark:hover:border-slate-700'
                                                                } ${isSuperSystem ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                                                            >
                                                                {hasPerm && (
                                                                    <Check className="h-4 w-4" />
                                                                )}
                                                            </button>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ),
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Role Modal */}
            <AnimatePresence>
                {isRoleModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm dark:bg-slate-950/80">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                    Create New Role
                                </h3>
                                <button
                                    onClick={() => setIsRoleModalOpen(false)}
                                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form
                                onSubmit={handleCreateRole}
                                className="mt-4 space-y-4"
                            >
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-slate-300">
                                        Role Name
                                    </label>
                                    <input
                                        type="text"
                                        value={newRoleName}
                                        onChange={(e) =>
                                            setNewRoleName(e.target.value)
                                        }
                                        placeholder="e.g. Editor, Supervisor"
                                        required
                                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-indigo-500 focus:outline-none"
                                    />
                                </div>

                                <div className="flex justify-end gap-2 border-t border-slate-800 pt-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsRoleModalOpen(false)
                                        }
                                        className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
                                    >
                                        Create Role
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
