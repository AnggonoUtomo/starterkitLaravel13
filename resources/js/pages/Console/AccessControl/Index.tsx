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
                        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground">
                            <Shield className="h-6 w-6 text-indigo-500" />
                            <span>{title}</span>
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage Spatie roles and fine-grained permission
                            matrices across all Console submodules.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsRoleModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-700"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Create New Role</span>
                    </button>
                </div>

                {/* Role Matrix Grid Table */}
                <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
                    <table className="w-full text-left text-sm text-foreground">
                        <thead className="border-b border-border bg-muted/60 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                            <tr>
                                <th className="px-6 py-4">Permission Name</th>
                                {roles.map((role) => (
                                    <th
                                        key={role.id}
                                        className="min-w-35 px-6 py-4 text-center"
                                    >
                                        <div className="flex items-center justify-center gap-1.5">
                                            <span className="font-bold text-foreground">
                                                {role.name}
                                            </span>
                                            {role.name !== 'Super System' && (
                                                <button
                                                    onClick={() =>
                                                        handleDeleteRole(role)
                                                    }
                                                    className="text-muted-foreground transition hover:text-rose-500"
                                                    title="Delete Role"
                                                >
                                                    <X className="h-3.5 w-3.5" />
                                                </button>
                                            )}
                                        </div>
                                        <div className="mt-0.5 font-mono text-[10px] font-normal text-indigo-500">
                                            {role.permissions.length} perms
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {Object.entries(groupedPermissions).map(
                                ([submodule, perms]) => (
                                    <React.Fragment key={submodule}>
                                        {/* Submodule Section Header */}
                                        <tr className="bg-indigo-500/10 text-xs font-bold tracking-wider text-indigo-500 uppercase">
                                            <td
                                                colSpan={roles.length + 1}
                                                className="border-t border-border px-6 py-2.5"
                                            >
                                                📦 Submodule:{' '}
                                                <span className="text-foreground">
                                                    {submodule}
                                                </span>
                                            </td>
                                        </tr>

                                        {/* Permission Rows */}
                                        {perms.map((permName) => (
                                            <tr
                                                key={permName}
                                                className="transition hover:bg-muted/40"
                                            >
                                                <td className="flex items-center gap-2 px-6 py-3 font-mono text-xs font-medium text-foreground">
                                                    <Lock className="h-3.5 w-3.5 text-muted-foreground" />
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
                                                                        ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-500'
                                                                        : 'border-border bg-muted/30 text-muted-foreground hover:border-muted-foreground'
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
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl"
                        >
                            <div className="flex items-center justify-between border-b border-border pb-4">
                                <h3 className="text-lg font-bold text-foreground">
                                    Create New Role
                                </h3>
                                <button
                                    onClick={() => setIsRoleModalOpen(false)}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form
                                onSubmit={handleCreateRole}
                                className="mt-4 space-y-4"
                            >
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-muted-foreground">
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
                                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                <div className="flex justify-end gap-2 border-t border-border pt-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsRoleModalOpen(false)
                                        }
                                        className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
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
