import { Shield, UserCheck, Edit3, Trash2 } from 'lucide-react';
import React from 'react';
import ConsoleEmptyState from '@/components/console/ConsoleEmptyState';

interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    created_at: string;
}

interface UserTableProps {
    users: User[];
    onImpersonate: (user: User) => void;
    onEditOpen: (user: User) => void;
    onDelete: (user: User) => void;
}

export default function UserTable({
    users,
    onImpersonate,
    onEditOpen,
    onDelete,
}: UserTableProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full text-left text-sm text-foreground">
                <thead className="border-b border-border bg-muted/60 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    <tr>
                        <th className="px-6 py-4">User Info</th>
                        <th className="px-6 py-4">Assigned Roles</th>
                        <th className="px-6 py-4">Created Date</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr
                                key={user.id}
                                className="transition hover:bg-muted/40"
                            >
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-foreground">
                                        {user.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {user.email}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1.5">
                                        {user.roles && user.roles.length > 0 ? (
                                            user.roles.map((r) => (
                                                <span
                                                    key={r}
                                                    className="inline-flex items-center gap-1 rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-500"
                                                >
                                                    <Shield className="h-3 w-3" />{' '}
                                                    {r}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-xs text-muted-foreground italic">
                                                No roles
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                                    {user.created_at
                                        ? new Date(
                                              user.created_at,
                                          ).toLocaleDateString()
                                        : '-'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onImpersonate(user)}
                                            className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-1.5 text-amber-500 transition hover:bg-amber-500/20 cursor-pointer"
                                            title="Impersonate User"
                                        >
                                            <UserCheck className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => onEditOpen(user)}
                                            className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-1.5 text-blue-500 transition hover:bg-blue-500/20 cursor-pointer"
                                            title="Edit User"
                                        >
                                            <Edit3 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(user)}
                                            className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-1.5 text-rose-500 transition hover:bg-rose-500/20 cursor-pointer"
                                            title="Delete User"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <ConsoleEmptyState
                            title="No users found"
                            description="No user account matches your current search or filter query."
                            colSpan={4}
                        />
                    )}
                </tbody>
            </table>
        </div>
    );
}
