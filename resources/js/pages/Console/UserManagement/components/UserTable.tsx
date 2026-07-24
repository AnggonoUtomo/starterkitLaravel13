import { Search, Shield, Plus, Edit2, Trash2, UserCheck } from 'lucide-react';
import React from 'react';
import ConsoleEmptyState from '@/components/console/ConsoleEmptyState';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import type { UserData } from './UserWorkspaceCard';

interface UserTableProps {
    users: UserData[];
    selectedUser: UserData | null;
    search: string;
    roleFilter: string;
    availableRoles: string[];
    totalUsers: number;
    onSearchChange: (val: string) => void;
    onRoleFilterChange: (role: string) => void;
    onSearchSubmit: (e: React.FormEvent) => void;
    onSelectUser: (user: UserData) => void;
    onOpenCreate: () => void;
    onOpenEdit: (user: UserData) => void;
    onOpenDelete: (user: UserData) => void;
    onOpenImpersonate: (user: UserData) => void;
}

export default function UserTable({
    users,
    selectedUser,
    search,
    roleFilter,
    availableRoles,
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
        <TooltipProvider>
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
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <select
                                    id="user-role-filter-trigger"
                                    value={roleFilter}
                                    onChange={(e) =>
                                        onRoleFilterChange(e.target.value)
                                    }
                                    className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground outline-none focus:ring-2 focus:ring-emerald-500 enabled:cursor-pointer"
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
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                Filter daftar pengguna berdasarkan peran Spatie
                                (Alt+R)
                            </TooltipContent>
                        </Tooltip>

                        {/* Add User Button */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    type="button"
                                    onClick={onOpenCreate}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-emerald-700 active:scale-95 enabled:cursor-pointer"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span className="hidden sm:inline-block">
                                        Tambah User
                                    </span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                Buka modal penambahan pengguna baru
                                (Ctrl+Shift+A)
                            </TooltipContent>
                        </Tooltip>
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
                                users.map((user) => {
                                    const isSelected =
                                        selectedUser?.id === user.id;

                                    return (
                                        <tr
                                            key={user.id}
                                            onClick={() => onSelectUser(user)}
                                            className={`transition hover:bg-muted/50 enabled:cursor-pointer ${
                                                isSelected
                                                    ? 'bg-emerald-500/5 font-medium'
                                                    : ''
                                            }`}
                                        >
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-8 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-500">
                                                        {user.initials ||
                                                            user.name
                                                                .substring(0, 2)
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
                                                    {/* Impersonate Button */}
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    onOpenImpersonate(
                                                                        user,
                                                                    )
                                                                }
                                                                className="rounded-md p-1.5 text-muted-foreground transition hover:bg-emerald-500/10 hover:text-emerald-500 enabled:cursor-pointer"
                                                            >
                                                                <UserCheck className="h-4 w-4" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top">
                                                            Impersonasi pengguna
                                                            ini ({user.name})
                                                        </TooltipContent>
                                                    </Tooltip>

                                                    {/* Edit Button */}
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    onOpenEdit(
                                                                        user,
                                                                    )
                                                                }
                                                                className="rounded-md p-1.5 text-muted-foreground transition hover:bg-indigo-500/10 hover:text-indigo-500 enabled:cursor-pointer"
                                                            >
                                                                <Edit2 className="h-4 w-4" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top">
                                                            Edit data dan peran
                                                            pengguna (
                                                            {user.name})
                                                        </TooltipContent>
                                                    </Tooltip>

                                                    {/* Delete Button */}
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    onOpenDelete(
                                                                        user,
                                                                    )
                                                                }
                                                                className="rounded-md p-1.5 text-muted-foreground transition hover:bg-rose-500/10 hover:text-rose-500 enabled:cursor-pointer"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top">
                                                            Hapus pengguna (
                                                            {user.name})
                                                        </TooltipContent>
                                                    </Tooltip>
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
            </div>
        </TooltipProvider>
    );
}
