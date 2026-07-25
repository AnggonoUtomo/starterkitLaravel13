import { Link, router } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    Edit2,
    Plus,
    Search,
    Shield,
    Trash2,
    UserCheck,
    X,
} from 'lucide-react';
import React from 'react';
import ConsoleEmptyState from '@/components/console/ConsoleEmptyState';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import type { UserTableProps } from '../types';

export default function UserTable({
    users,
    selectedUser,
    search,
    roleFilter,
    availableRoles,
    totalUsers,
    currentPage = 1,
    lastPage = 1,
    from = 0,
    to = 0,
    paginationLinks = [],
    onSearchChange,
    onRoleFilterChange,
    onSearchSubmit,
    onSelectUser,
    onOpenCreate,
    onOpenEdit,
    onOpenDelete,
    onOpenImpersonate,
}: UserTableProps) {
    const prevLink = paginationLinks?.find(
        (l) => l.label.includes('Previous') || l.label.includes('&laquo;'),
    );
    const nextLink = paginationLinks?.find(
        (l) => l.label.includes('Next') || l.label.includes('&raquo;'),
    );
    const numericLinks = (paginationLinks || []).filter((l) => {
        const clean = l.label
            .replace('&laquo;', '')
            .replace('&raquo;', '')
            .trim();

        return !isNaN(Number(clean)) && clean !== '';
    });

    let visiblePages = numericLinks;
    let showStartEllipsis = false;
    let showEndEllipsis = false;

    if (numericLinks.length > 3) {
        let start = Math.max(1, currentPage - 1);
        let end = start + 2;

        if (end > lastPage) {
            end = lastPage;
            start = Math.max(1, end - 2);
        }

        visiblePages = numericLinks.filter((l) => {
            const pageNum = Number(
                l.label.replace('&laquo;', '').replace('&raquo;', '').trim(),
            );

            return pageNum >= start && pageNum <= end;
        });

        showStartEllipsis = start > 1;
        showEndEllipsis = end < lastPage;
    }

    const handleClearSearch = () => {
        onSearchChange('');
        router.get(
            '/console/users',
            { search: '', role: roleFilter },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

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
                            <Search className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
                            <input
                                id="user-search-input"
                                type="text"
                                value={search}
                                onChange={(e) => onSearchChange(e.target.value)}
                                placeholder="Cari pengguna berdasarkan nama atau email... (/)"
                                className="w-full rounded-lg border border-border bg-background py-1.5 pr-8 pl-9 text-xs text-foreground outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="absolute top-2 right-2 rounded-md p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground enabled:cursor-pointer"
                                >
                                    <X className="size-3.5" />
                                    <span className="sr-only">
                                        Clear search
                                    </span>
                                </button>
                            )}
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
                                    <Plus className="size-4" />
                                    <span className="hidden sm:inline">
                                        Tambah User
                                    </span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                Tambah pengguna baru ke sistem (Ctrl+Shift+A)
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                {/* Table Body */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs">
                        <thead>
                            <tr className="border-b border-border bg-muted/40 tracking-wider text-muted-foreground uppercase">
                                <th className="px-4 py-3 font-semibold">
                                    User
                                </th>
                                <th className="px-4 py-3 font-semibold">
                                    Roles
                                </th>
                                <th className="px-4 py-3 font-semibold">
                                    Izin Efektif
                                </th>
                                <th className="px-4 py-3 text-right font-semibold">
                                    Aksi
                                </th>
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
                                            className={`group transition hover:bg-muted/50 enabled:cursor-pointer ${
                                                isSelected
                                                    ? 'bg-emerald-500/10 font-medium dark:bg-emerald-500/15'
                                                    : ''
                                            }`}
                                        >
                                            {/* Name & Email */}
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 font-mono text-xs font-bold text-emerald-500">
                                                        {user.initials ||
                                                            user.name.substring(
                                                                0,
                                                                2,
                                                            )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="truncate font-semibold text-foreground">
                                                            {user.name}
                                                        </div>
                                                        <div className="truncate font-mono text-[11px] text-muted-foreground">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Roles */}
                                            <td className="px-4 py-3">
                                                <div className="flex flex-wrap gap-1">
                                                    {user.roles &&
                                                    user.roles.length > 0 ? (
                                                        user.roles.map((r) => (
                                                            <span
                                                                key={r}
                                                                className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-medium text-emerald-500"
                                                            >
                                                                <Shield className="size-3" />
                                                                {r}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-[11px] text-muted-foreground italic">
                                                            Tanpa Role
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Effective Permissions Count */}
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] font-medium text-muted-foreground">
                                                    {user.effectivePermissions
                                                        ?.length || 0}{' '}
                                                    Izin
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-3 text-right">
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
                                                                <UserCheck className="size-4" />
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
                                                                <Edit2 className="size-4" />
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
                                                                <Trash2 className="size-4" />
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

                {/* Datatable Footer & Pagination Controls */}
                <div className="flex flex-col gap-3 border-t border-border bg-muted/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs text-muted-foreground">
                        {totalUsers > 0 ? (
                            <span>
                                Menampilkan{' '}
                                <strong className="font-semibold text-foreground">
                                    {from}
                                </strong>{' '}
                                -{' '}
                                <strong className="font-semibold text-foreground">
                                    {to}
                                </strong>{' '}
                                dari{' '}
                                <strong className="font-semibold text-foreground">
                                    {totalUsers}
                                </strong>{' '}
                                pengguna (Halaman {currentPage} dari {lastPage})
                            </span>
                        ) : (
                            <span>Menampilkan 0 pengguna</span>
                        )}
                    </div>

                    {/* Pagination Page Links (Max 3 pages window + Icon Prev/Next) */}
                    <div className="flex items-center gap-1.5">
                        {/* Prev Button */}
                        {prevLink?.url ? (
                            <Link
                                href={prevLink.url}
                                preserveScroll
                                preserveState
                                aria-label="Previous Page"
                                className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-2xs transition hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500 enabled:cursor-pointer"
                            >
                                <ChevronLeft className="size-4.5 stroke-[2.5]" />
                            </Link>
                        ) : (
                            <span className="inline-flex size-9 cursor-not-allowed items-center justify-center rounded-lg border border-border/60 bg-muted/60 text-muted-foreground/40">
                                <ChevronLeft className="size-4.5 stroke-[2]" />
                            </span>
                        )}

                        {/* Start Ellipsis */}
                        {showStartEllipsis && (
                            <span className="inline-flex size-8 items-center justify-center font-mono text-xs font-bold text-muted-foreground select-none">
                                ...
                            </span>
                        )}

                        {/* Max 3 Page Buttons */}
                        {visiblePages.length > 0 ? (
                            visiblePages.map((link, idx) => {
                                const cleanLabel = link.label
                                    .replace('&laquo;', '')
                                    .replace('&raquo;', '')
                                    .trim();

                                if (!link.url) {
                                    return (
                                        <span
                                            key={idx}
                                            className="inline-flex size-9 cursor-not-allowed items-center justify-center rounded-lg border border-border/60 bg-muted/60 font-mono text-xs font-bold text-muted-foreground/40"
                                        >
                                            {cleanLabel}
                                        </span>
                                    );
                                }

                                return (
                                    <Link
                                        key={idx}
                                        href={link.url}
                                        preserveScroll
                                        preserveState
                                        className={`inline-flex size-9 items-center justify-center rounded-lg border font-mono text-xs font-bold transition enabled:cursor-pointer ${
                                            link.active
                                                ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                                                : 'border-border bg-card text-foreground shadow-2xs hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-500'
                                        }`}
                                    >
                                        {cleanLabel}
                                    </Link>
                                );
                            })
                        ) : (
                            <span className="inline-flex size-9 items-center justify-center rounded-lg border border-emerald-600 bg-emerald-600 font-mono text-xs font-bold text-white shadow-xs">
                                1
                            </span>
                        )}

                        {/* End Ellipsis */}
                        {showEndEllipsis && (
                            <span className="inline-flex size-8 items-center justify-center font-mono text-xs font-bold text-muted-foreground select-none">
                                ...
                            </span>
                        )}

                        {/* Next Button */}
                        {nextLink?.url ? (
                            <Link
                                href={nextLink.url}
                                preserveScroll
                                preserveState
                                aria-label="Next Page"
                                className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-2xs transition hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500 enabled:cursor-pointer"
                            >
                                <ChevronRight className="size-4.5 stroke-[2.5]" />
                            </Link>
                        ) : (
                            <span className="inline-flex size-9 cursor-not-allowed items-center justify-center rounded-lg border border-border/60 bg-muted/60 text-muted-foreground/40">
                                <ChevronRight className="size-4.5 stroke-[2]" />
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
}
