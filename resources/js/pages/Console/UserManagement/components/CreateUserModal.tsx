import {
    UserPlus,
    Shield,
    Lock,
    Mail,
    User,
    CheckCircle2,
    KeyRound,
    CheckSquare,
    Square,
    ChevronDown,
    ChevronUp,
    HelpCircle,
} from 'lucide-react';
import React, { useState } from 'react';
import InputError from '@/components/input-error';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import type { PermissionGroupItem, RoleOptionItem } from './UserWorkspaceCard';

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: {
        name: string;
        email: string;
        password: string;
        roles: string[];
        permissions: string[];
    };
    errors?: Record<string, string>;
    onFieldChange: (field: string, value: any) => void;
    availableRoles: string[];
    rolesWithPermissions?: RoleOptionItem[];
    permissionGroups?: PermissionGroupItem[];
    onSubmit: (e: React.FormEvent) => void;
    isProcessing: boolean;
}

export default function CreateUserModal({
    isOpen,
    onClose,
    formData,
    errors = {},
    onFieldChange,
    availableRoles,
    rolesWithPermissions = [],
    permissionGroups = [],
    onSubmit,
    isProcessing,
}: CreateUserModalProps) {
    const [expandedModules, setExpandedModules] = useState<
        Record<string, boolean>
    >({});

    const toggleModuleExpand = (moduleName: string) => {
        setExpandedModules((prev) => ({
            ...prev,
            [moduleName]: !prev[moduleName],
        }));
    };

    const handleRoleToggle = (role: string) => {
        const isSelected = formData.roles.includes(role);
        let updatedRoles: string[];

        if (isSelected) {
            updatedRoles = formData.roles.filter((r) => r !== role);
        } else {
            updatedRoles = [...formData.roles, role];
        }

        onFieldChange('roles', updatedRoles);

        if (rolesWithPermissions.length > 0) {
            const rolePermsSet = new Set<string>();
            updatedRoles.forEach((rName) => {
                const matched = rolesWithPermissions.find(
                    (r) => r.name === rName,
                );

                if (matched) {
                    matched.permissions.forEach((p) => rolePermsSet.add(p));
                }
            });
            onFieldChange('permissions', Array.from(rolePermsSet));
        }
    };

    const handlePermissionToggle = (permName: string) => {
        const isSelected = formData.permissions.includes(permName);

        if (isSelected) {
            onFieldChange(
                'permissions',
                formData.permissions.filter((p) => p !== permName),
            );
        } else {
            onFieldChange('permissions', [...formData.permissions, permName]);
        }
    };

    const handleToggleModulePermissions = (
        group: PermissionGroupItem,
        e: React.MouseEvent,
    ) => {
        e.stopPropagation();
        const groupPermNames = group.permissions.map((p) => p.name);
        const allSelected = groupPermNames.every((name) =>
            formData.permissions.includes(name),
        );

        if (allSelected) {
            onFieldChange(
                'permissions',
                formData.permissions.filter((p) => !groupPermNames.includes(p)),
            );
        } else {
            const currentSet = new Set(formData.permissions);
            groupPermNames.forEach((name) => currentSet.add(name));
            onFieldChange('permissions', Array.from(currentSet));
        }
    };

    const handleOpenChange = (open: boolean) => {
        if (!open && !isProcessing) {
            onClose();
        }
    };

    return (
        <TooltipProvider>
            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                <DialogContent className="flex max-h-[90vh] flex-col sm:max-w-2xl">
                    <DialogHeader className="shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
                                <UserPlus className="h-5 w-5" />
                            </div>
                            <div>
                                <DialogTitle className="text-base font-bold text-foreground">
                                    Tambah Pengguna Baru
                                </DialogTitle>
                                <DialogDescription className="text-xs text-muted-foreground">
                                    Kelola data identitas, alokasi peran, dan
                                    matriks izin akses pengguna.
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <form
                        onSubmit={onSubmit}
                        className="flex-1 space-y-5 overflow-y-auto py-2 pr-1"
                    >
                        {/* Kredensial Pengguna */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* Full Name Field */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-1 text-xs font-semibold text-foreground">
                                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span>Nama Lengkap</span>
                                        <span className="ml-0.5 font-bold text-rose-500">
                                            *
                                        </span>
                                    </label>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                type="button"
                                                className="text-muted-foreground/70 hover:text-foreground enabled:cursor-pointer"
                                            >
                                                <HelpCircle className="size-3.5" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">
                                            Masukkan nama lengkap pengguna
                                            sesuai identitas resmi.
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        onFieldChange('name', e.target.value)
                                    }
                                    placeholder="Contoh: Ahmad Subagja"
                                    required
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                />
                                <InputError message={errors.name} />
                            </div>

                            {/* Email Address Field */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-1 text-xs font-semibold text-foreground">
                                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span>Alamat Email</span>
                                        <span className="ml-0.5 font-bold text-rose-500">
                                            *
                                        </span>
                                    </label>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                type="button"
                                                className="text-muted-foreground/70 hover:text-foreground enabled:cursor-pointer"
                                            >
                                                <HelpCircle className="size-3.5" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">
                                            Alamat email unik yang akan
                                            digunakan untuk masuk ke sistem.
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        onFieldChange('email', e.target.value)
                                    }
                                    placeholder="user@example.com"
                                    required
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                />
                                <InputError message={errors.email} />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-1 text-xs font-semibold text-foreground">
                                    <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span>Kata Sandi (Password)</span>
                                    <span className="ml-0.5 font-bold text-rose-500">
                                        *
                                    </span>
                                </label>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            type="button"
                                            className="text-muted-foreground/70 hover:text-foreground enabled:cursor-pointer"
                                        >
                                            <HelpCircle className="size-3.5" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                        Kombinasi kata sandi unik minimal 8
                                        karakter untuk enkripsi akun.
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) =>
                                    onFieldChange('password', e.target.value)
                                }
                                placeholder="••••••••"
                                required
                                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* Fitur Pilih Role: Option Buttons Layout 2 Baris Grid */}
                        <div className="space-y-2 border-t border-border pt-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-xs font-semibold text-foreground">
                                        Pilih Peran (Role Options)
                                    </span>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                type="button"
                                                className="ml-1 text-muted-foreground/70 hover:text-foreground enabled:cursor-pointer"
                                            >
                                                <HelpCircle className="size-3.5" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">
                                            Pilih satu atau lebih peran untuk
                                            memberikan akses fitur secara
                                            otomatis.
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                <span className="text-[11px] font-medium text-muted-foreground">
                                    {formData.roles.length} Terpilih
                                </span>
                            </div>
                            {/* 2 Baris Grid Layout */}
                            <div className="grid grid-cols-2 gap-2">
                                {availableRoles.map((role) => {
                                    const isSelected =
                                        formData.roles.includes(role);

                                    return (
                                        <Tooltip key={role}>
                                            <TooltipTrigger asChild>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRoleToggle(role)
                                                    }
                                                    className={`flex items-center justify-between gap-2 rounded-lg border px-3.5 py-2.5 text-left text-xs font-medium transition enabled:cursor-pointer disabled:cursor-not-allowed ${
                                                        isSelected
                                                            ? 'border-emerald-500/50 bg-emerald-500/10 font-bold text-emerald-500 shadow-2xs'
                                                            : 'border-border bg-muted/20 text-muted-foreground hover:border-border hover:bg-muted/40'
                                                    }`}
                                                >
                                                    <span className="truncate">
                                                        {role}
                                                    </span>
                                                    <CheckCircle2
                                                        className={`size-4 shrink-0 transition ${
                                                            isSelected
                                                                ? 'text-emerald-500 opacity-100'
                                                                : 'text-muted-foreground/30 opacity-0'
                                                        }`}
                                                    />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent side="top">
                                                {isSelected
                                                    ? `Klik untuk melepas peran ${role}`
                                                    : `Klik untuk menetapkan peran ${role}`}
                                            </TooltipContent>
                                        </Tooltip>
                                    );
                                })}
                            </div>
                            <InputError message={errors.roles} />
                        </div>

                        {/* Matriks Pilih Permission Kustom per Modul */}
                        {permissionGroups.length > 0 && (
                            <div className="space-y-3 border-t border-border pt-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span className="text-xs font-semibold text-foreground">
                                            Matriks Izin Akses Langsung (Direct
                                            Permissions)
                                        </span>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    type="button"
                                                    className="ml-1 text-muted-foreground/70 hover:text-foreground enabled:cursor-pointer"
                                                >
                                                    <HelpCircle className="size-3.5" />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent side="top">
                                                Matriks izin akses per modul
                                                untuk menyesuaikan kewenangan
                                                pengguna.
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                    <span className="font-mono text-[11px] font-medium text-emerald-500">
                                        {formData.permissions.length} Izin Aktif
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    {permissionGroups.map((group) => {
                                        const groupPermNames =
                                            group.permissions.map(
                                                (p) => p.name,
                                            );
                                        const activeCount =
                                            groupPermNames.filter((name) =>
                                                formData.permissions.includes(
                                                    name,
                                                ),
                                            ).length;
                                        const allGroupSelected =
                                            groupPermNames.length > 0 &&
                                            activeCount ===
                                                groupPermNames.length;
                                        const isExpanded =
                                            expandedModules[group.module] ??
                                            true;

                                        return (
                                            <div
                                                key={group.module}
                                                className="rounded-lg border border-border bg-muted/10 transition"
                                            >
                                                {/* Header Kategori Modul dengan Tombol Collapse */}
                                                <div
                                                    onClick={() =>
                                                        toggleModuleExpand(
                                                            group.module,
                                                        )
                                                    }
                                                    className="flex cursor-pointer items-center justify-between rounded-lg p-3 transition select-none hover:bg-muted/30"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Tooltip>
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <div>
                                                                    {isExpanded ? (
                                                                        <ChevronUp className="size-4 text-muted-foreground" />
                                                                    ) : (
                                                                        <ChevronDown className="size-4 text-muted-foreground" />
                                                                    )}
                                                                </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent side="top">
                                                                {isExpanded
                                                                    ? 'Klik untuk melipat modul ini'
                                                                    : 'Klik untuk membuka rincian modul ini'}
                                                            </TooltipContent>
                                                        </Tooltip>
                                                        <span className="text-[11.5px] font-bold tracking-wider text-foreground uppercase">
                                                            Modul:{' '}
                                                            {group.module}
                                                        </span>
                                                        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-500">
                                                            {activeCount}/
                                                            {
                                                                group
                                                                    .permissions
                                                                    .length
                                                            }{' '}
                                                            aktif
                                                        </span>
                                                    </div>

                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button
                                                                type="button"
                                                                onClick={(e) =>
                                                                    handleToggleModulePermissions(
                                                                        group,
                                                                        e,
                                                                    )
                                                                }
                                                                className="flex items-center gap-1 text-[11px] font-semibold text-emerald-500 hover:underline enabled:cursor-pointer disabled:cursor-not-allowed"
                                                            >
                                                                {allGroupSelected ? (
                                                                    <>
                                                                        <CheckSquare className="size-3" />
                                                                        Batalkan
                                                                        Semua
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Square className="size-3" />
                                                                        Pilih
                                                                        Semua
                                                                    </>
                                                                )}
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top">
                                                            {allGroupSelected
                                                                ? 'Batalkan seluruh izin pada modul ini'
                                                                : 'Pilih seluruh izin pada modul ini'}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>

                                                {/* Detail List Permission */}
                                                {isExpanded && (
                                                    <div className="border-t border-border/50 p-3 pt-2.5">
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {group.permissions.map(
                                                                (perm) => {
                                                                    const isPermSelected =
                                                                        formData.permissions.includes(
                                                                            perm.name,
                                                                        );

                                                                    return (
                                                                        <Tooltip
                                                                            key={
                                                                                perm.id
                                                                            }
                                                                        >
                                                                            <TooltipTrigger
                                                                                asChild
                                                                            >
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        handlePermissionToggle(
                                                                                            perm.name,
                                                                                        )
                                                                                    }
                                                                                    className={`flex items-center justify-between gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[11px] font-medium transition enabled:cursor-pointer disabled:cursor-not-allowed ${
                                                                                        isPermSelected
                                                                                            ? 'border-emerald-500/40 bg-emerald-500/15 font-semibold text-emerald-500'
                                                                                            : 'border-border bg-background text-muted-foreground hover:bg-muted'
                                                                                    }`}
                                                                                >
                                                                                    <span className="truncate">
                                                                                        {
                                                                                            perm.name
                                                                                        }
                                                                                    </span>
                                                                                    <CheckCircle2
                                                                                        className={`size-3.5 shrink-0 ${
                                                                                            isPermSelected
                                                                                                ? 'text-emerald-500 opacity-100'
                                                                                                : 'text-muted-foreground/30 opacity-0'
                                                                                        }`}
                                                                                    />
                                                                                </button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent side="top">
                                                                                {isPermSelected
                                                                                    ? `Batalkan izin ${perm.name}`
                                                                                    : `Aktifkan izin ${perm.name}`}
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    );
                                                                },
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <InputError message={errors.permissions} />
                            </div>
                        )}

                        <DialogFooter className="shrink-0 border-t border-border pt-3">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        disabled={isProcessing}
                                        className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Batal
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    Membatalkan penambahan pengguna baru
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs transition hover:bg-emerald-700 enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isProcessing
                                            ? 'Memproses...'
                                            : 'Simpan Pengguna Baru'}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    Simpan data pengguna baru ke database
                                </TooltipContent>
                            </Tooltip>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    );
}
