import { Search, UserCheck, Shield, Plus, Edit2, Trash2 } from 'lucide-react';
import React from 'react';
import ConsoleEmptyState from '@/components/console/ConsoleEmptyState';

interface User {
    id: number;
    name: string;
    email: string;
    initials?: string;
    roles: string[];
    primaryRole?: string;
    created_at?: string;
    can?: {
        update?: boolean;
        delete?: boolean;
        impersonate?: boolean;
    };
}

interface UserTableProps {
    users: User[];
    selectedUser: User | null;
    search: string;
    roleFilter: string;
    availableRoles: string[];
    totalUsers: number;
    onSearchChange: (search: string) => void;
    onRoleFilterChange: (role: string) => void;
    onSearchSubmit: (e: React.FormEvent) => void;
    onSelectUser: (user: User) => void;
    onOpenCreate: () => void;
    onOpenEdit: (user: User) => void;
    onOpenDelete: (user: User) => void;
    onOpenImpersonate: (user: User) => void;
}

export default function UserTable({
    users,
    selectedUser,
    search,
    roleFilter,
    availableRoles,
    totalUsers,
    onSearchChange,
    onRoleFilterChange,
    onSearchSubmit,
    onSelectUser,
    onOpenCreate,
    onOpenEdit,
    onOpenDelete,
    onOpenImpersonate,
}: UserTableProps) {
    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xs">
            {/* Table Header Controls */}
            <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                <form
                    onSubmit={onSearchSubmit}
                    className="flex max-w-md flex-1 items-center gap-2"
                >
                    <div className="relative w-full">
                        <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
                        <input
                            id="user-search-input"
                            type="text"
                            value={search}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Cari pengguna berdasarkan nama atau email... (/)"
                            className="w-full rounded-lg border border-border bg-background py-1.5 pr-3 pl-9 text-xs text-foreground outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                </form>

                <div className="flex items-center gap-2">
                    {/* Role Filter Dropdown */}
                    <select
                        id="user-role-filter-trigger"
                        value={roleFilter}
                        onChange={(e) => onRoleFilterChange(e.target.value)}
                        className="cursor-pointer rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="">
                            Semua Role ({availableRoles.length})
                        </option>
                        {availableRoles.map((r) => (
                            <option key={r} value={r}>
                                Role: {r}
                            </option>
                        ))}
                    </select>

                    {/* Add User Button */}
                    <button
                        type="button"
                        onClick={onOpenCreate}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-emerald-700"
                    >
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline-block">
                            Tambah User
                        </span>
                    </button>
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-foreground">
                    <thead className="border-b border-border bg-muted/60 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                        <tr>
                            <th className="px-5 py-3.5">Pengguna</th>
                            <th className="px-5 py-3.5">Role</th>
                            <th className="px-5 py-3.5">Tanggal Dibuat</th>
                            <th className="px-5 py-3.5 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {users.length > 0 ? (
                            users.map((user, index) => {
                                const isSelected = selectedUser?.id === user.id;

                                return (
                                    <tr
                                        key={user.id}
                                        id={`user-table-row-${index}`}
                                        onClick={() => onSelectUser(user)}
                                        className={`cursor-pointer transition ${
                                            isSelected
                                                ? 'bg-emerald-500/10'
                                                : 'hover:bg-muted/40'
                                        }`}
                                    >
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-8 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-bold text-emerald-500">
                                                    {user.initials ||
                                                        user.name
                                                            .slice(0, 2)
                                                            .toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-foreground">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-[11px] text-muted-foreground">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex flex-wrap gap-1">
                                                {user.roles.map((role) => (
                                                    <span
                                                        key={role}
                                                        className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500"
                                                    >
                                                        <Shield className="h-3 w-3" />
                                                        {role}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 font-mono text-muted-foreground">
                                            {user.created_at || '-'}
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            <div
                                                className="flex items-center justify-end gap-1"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                {/* Impersonate */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onOpenImpersonate(user)
                                                    }
                                                    className="cursor-pointer rounded-md p-1.5 text-muted-foreground transition hover:bg-emerald-500/10 hover:text-emerald-500"
                                                    title="Impersonate User"
                                                >
                                                    <UserCheck className="h-4 w-4" />
                                                </button>

                                                {/* Edit */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onOpenEdit(user)
                                                    }
                                                    className="cursor-pointer rounded-md p-1.5 text-muted-foreground transition hover:bg-indigo-500/10 hover:text-indigo-500"
                                                    title="Edit User"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onOpenDelete(user)
                                                    }
                                                    className="cursor-pointer rounded-md p-1.5 text-muted-foreground transition hover:bg-rose-500/10 hover:text-rose-500"
                                                    title="Delete User"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <ConsoleEmptyState
                                title="Tidak ada pengguna ditemukan"
                                description="Tidak ada data akun pengguna yang cocok dengan kriteria pencarian Anda."
                                colSpan={4}
                            />
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer Status */}
            <div className="border-t border-border bg-muted/20 px-4 py-2 text-right font-mono text-[11px] text-muted-foreground">
                Total Akun: {totalUsers}
            </div>
        </div>
    );
}
