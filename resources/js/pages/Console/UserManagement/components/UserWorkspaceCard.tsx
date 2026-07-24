import { User, Shield, Calendar, Edit2, Trash2, UserCheck, X, CheckCircle2, Lock } from 'lucide-react';
import React from 'react';

export type UserWorkspaceMode = 'detail' | 'create' | 'edit';

export interface PermissionItem {
    id: number;
    name: string;
}

export interface PermissionGroupItem {
    module: string;
    permissions: PermissionItem[];
}

export interface RoleOptionItem {
    id: number;
    name: string;
    permissions: string[];
}

export interface UserData {
    id: number;
    name: string;
    email: string;
    initials?: string;
    roles: string[];
    rolePermissions?: Record<string, string[]>;
    permissions?: string[];
    effectivePermissions?: string[];
    primaryRole?: string;
    created_at?: string;
}

interface UserWorkspaceCardProps {
    mode: UserWorkspaceMode;
    selectedUser: UserData | null;
    formData: {
        name: string;
        email: string;
        password?: string;
        roles: string[];
        permissions: string[];
    };
    availableRoles: string[];
    rolesWithPermissions: RoleOptionItem[];
    permissionGroups: PermissionGroupItem[];
    isProcessing: boolean;
    onFieldChange: (field: string, value: any) => void;
    onSubmitCreate: (e: React.FormEvent) => void;
    onSubmitEdit: (e: React.FormEvent) => void;
    onCancel: () => void;
    onStartEdit: (user: UserData) => void;
    onStartDelete: (user: UserData) => void;
    onStartImpersonate: (user: UserData) => void;
}

/**
 * Helper component to render permissions grouped by module category in a clean vertical stack with clear font sizes.
 */
function RenderGroupedPermissions({
    permissions,
    permissionGroups,
    icon: IconComponent = Lock,
    iconClassName = 'text-muted-foreground',
}: {
    permissions: string[];
    permissionGroups: PermissionGroupItem[];
    icon?: React.ComponentType<{ className?: string }>;
    iconClassName?: string;
}) {
    const permSet = new Set(permissions);

    // Group permissions by module definition
    const grouped = permissionGroups
        .map((group) => {
            const matched = group.permissions.filter((p) => permSet.has(p.name));

            return {
                module: group.module,
                permissions: matched.map((p) => p.name),
            };
        })
        .filter((g) => g.permissions.length > 0);

    // Collect permissions not matching any group definition
    const knownSet = new Set(
        permissionGroups.flatMap((g) => g.permissions.map((p) => p.name)),
    );
    const unknownPerms = permissions.filter((p) => !knownSet.has(p));

    if (unknownPerms.length > 0) {
        grouped.push({
            module: 'Lainnya',
            permissions: unknownPerms,
        });
    }

    if (grouped.length === 0) {
        return (
            <div className="text-xs text-muted-foreground italic py-1">
                Tidak ada permission aktif pada grup ini.
            </div>
        );
    }

    return (
        <div className="space-y-3 pt-1.5">
            {grouped.map((group) => (
                <div key={group.module} className="space-y-1.5">
                    <div className="text-[11.5px] font-bold uppercase tracking-wider text-muted-foreground/90 border-b border-border/50 pb-1">
                        Modul: {group.module}
                    </div>
                    {/* Vertical top-to-bottom stack with clear, readable font size */}
                    <div className="flex flex-col gap-1.5">
                        {group.permissions.map((p) => (
                            <div
                                key={p}
                                className="flex items-center gap-2.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-mono font-medium text-foreground shadow-2xs"
                            >
                                <IconComponent className={`size-3.5 shrink-0 ${iconClassName}`} />
                                <span className="truncate">{p}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function UserWorkspaceCard({
    mode,
    selectedUser,
    formData,
    availableRoles,
    rolesWithPermissions,
    permissionGroups,
    isProcessing,
    onFieldChange,
    onSubmitCreate,
    onSubmitEdit,
    onCancel,
    onStartEdit,
    onStartDelete,
    onStartImpersonate,
}: UserWorkspaceCardProps) {
    // Calculate inherited permissions from selected roles in form
    const inheritedPermissions = new Set(
        rolesWithPermissions
            .filter((role) => formData.roles.includes(role.name))
            .flatMap((role) => role.permissions),
    );

    const handleRoleToggle = (roleName: string, checked: boolean) => {
        if (checked) {
            onFieldChange('roles', [...formData.roles, roleName]);
        } else {
            onFieldChange(
                'roles',
                formData.roles.filter((r) => r !== roleName),
            );
        }
    };

    const handlePermissionToggle = (permName: string, checked: boolean) => {
        if (checked) {
            onFieldChange('permissions', [...formData.permissions, permName]);
        } else {
            onFieldChange(
                'permissions',
                formData.permissions.filter((p) => p !== permName),
            );
        }
    };

    // Form Renderer Component (Reusable for Create & Edit Mode)
    const renderFormFields = (isEditMode: boolean) => (
        <div className="mt-4 space-y-4 text-xs">
            <div>
                <label className="mb-1 block font-semibold text-muted-foreground text-xs">Nama Lengkap</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => onFieldChange('name', e.target.value)}
                    required
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </div>

            <div>
                <label className="mb-1 block font-semibold text-muted-foreground text-xs">Email</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => onFieldChange('email', e.target.value)}
                    required
                    placeholder="john@example.com"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </div>

            <div>
                <label className="mb-1 block font-semibold text-muted-foreground text-xs">
                    {isEditMode ? 'Password Baru (Kosongkan jika tidak diubah)' : 'Password'}
                </label>
                <input
                    type="password"
                    value={formData.password || ''}
                    onChange={(e) => onFieldChange('password', e.target.value)}
                    required={!isEditMode}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </div>

            {/* Roles Selection (Checkboxes) */}
            <div>
                <label className="mb-1.5 block font-semibold text-muted-foreground text-xs">Opsi Role Akses</label>
                <div className="grid gap-2 rounded-lg border border-border bg-muted/20 p-3">
                    {availableRoles.map((roleName) => {
                        const isChecked = formData.roles.includes(roleName);

                        return (
                            <label
                                key={roleName}
                                className="flex items-center gap-2.5 text-xs font-semibold text-foreground cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => handleRoleToggle(roleName, e.target.checked)}
                                    className="size-4 rounded border-border text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                />
                                <span className="capitalize">{roleName}</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Preview Permission dari Role Terpilih */}
            {formData.roles.length > 0 && (
                <div>
                    <label className="mb-1.5 block font-semibold text-muted-foreground text-xs">
                        Permission Inherited (Per Role Terpilih)
                    </label>
                    <div className="max-h-60 overflow-y-auto rounded-lg border border-border bg-muted/10 p-3 space-y-3">
                        {formData.roles.map((roleName) => {
                            const roleObj = rolesWithPermissions.find((r) => r.name === roleName);
                            const perms = roleObj?.permissions || [];

                            return (
                                <div key={roleName} className="space-y-2 rounded-lg border border-border bg-background p-3 shadow-2xs">
                                    <div className="flex items-center justify-between text-xs font-bold text-foreground capitalize border-b border-border/60 pb-1.5">
                                        <span>Role: {roleName}</span>
                                        <span className="font-mono text-xs text-muted-foreground">{perms.length} permission</span>
                                    </div>
                                    <RenderGroupedPermissions
                                        permissions={perms}
                                        permissionGroups={permissionGroups}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Direct & Effective Permissions Selection */}
            <div>
                <label className="mb-1.5 block font-semibold text-muted-foreground text-xs">
                    Direct Permission Tambahan (Per Kategori Modul)
                </label>
                <div className="max-h-64 overflow-y-auto rounded-lg border border-border bg-muted/10 p-3 space-y-3">
                    {permissionGroups.map((group) => (
                        <div key={group.module} className="space-y-2 rounded-lg border border-border bg-background p-3 shadow-2xs">
                            <div className="text-[11.5px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-1">
                                Kategori: {group.module}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                {group.permissions.map((perm) => {
                                    const isInherited = inheritedPermissions.has(perm.name);
                                    const isDirectChecked = formData.permissions.includes(perm.name);

                                    return (
                                        <label
                                            key={perm.id}
                                            className={`flex items-center justify-between gap-2.5 rounded-md border px-3 py-1.5 text-xs cursor-pointer transition ${
                                                isInherited
                                                    ? 'border-indigo-500/20 bg-indigo-500/5 text-muted-foreground opacity-80'
                                                    : isDirectChecked
                                                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 font-medium'
                                                      : 'border-border bg-background text-foreground hover:bg-muted/40'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <input
                                                    type="checkbox"
                                                    checked={isDirectChecked || isInherited}
                                                    disabled={isInherited}
                                                    onChange={(e) =>
                                                        handlePermissionToggle(perm.name, e.target.checked)
                                                    }
                                                    className="size-4 rounded border-border text-emerald-600 focus:ring-emerald-500 disabled:opacity-60 cursor-pointer"
                                                />
                                                <span className="truncate font-mono">{perm.name}</span>
                                            </div>
                                            {isInherited && (
                                                <span className="shrink-0 text-[10px] font-semibold text-indigo-500">
                                                    (dari role)
                                                </span>
                                            )}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isProcessing}
                    className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    disabled={isProcessing}
                    className={`rounded-lg px-4 py-2 text-xs font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-2xs ${
                        isEditMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                >
                    {isProcessing
                        ? 'Memproses...'
                        : isEditMode
                          ? 'Perbarui Pengguna'
                          : 'Simpan Pengguna'}
                </button>
            </div>
        </div>
    );

    // Mode Create
    if (mode === 'create') {
        return (
            <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-sm font-bold text-foreground">Tambah Pengguna Baru</h3>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <form onSubmit={onSubmitCreate}>
                    {renderFormFields(false)}
                </form>
            </div>
        );
    }

    // Mode Edit
    if (mode === 'edit' && selectedUser) {
        return (
            <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-sm font-bold text-foreground">Ubah Pengguna</h3>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <form onSubmit={onSubmitEdit}>
                    {renderFormFields(true)}
                </form>
            </div>
        );
    }

    // Mode Detail (Default View User)
    const directPerms = selectedUser?.permissions || [];
    const effectivePerms = selectedUser?.effectivePermissions || [];

    return (
        <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            {selectedUser ? (
                <div className="space-y-4">
                    {/* User Avatar & Name Header */}
                    <div className="flex items-center gap-3 border-b border-border pb-4">
                        <div className="flex size-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-base font-bold text-emerald-500">
                            {selectedUser.initials || selectedUser.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-foreground">{selectedUser.name}</h3>
                            <p className="text-xs text-muted-foreground">{selectedUser.email}</p>
                        </div>
                    </div>

                    {/* Details Info Grid */}
                    <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/20 p-2.5">
                            <span className="flex items-center gap-2 text-muted-foreground">
                                <Shield className="h-3.5 w-3.5 text-emerald-500" />
                                Role Utama
                            </span>
                            <span className="font-semibold text-foreground">{selectedUser.primaryRole || 'User'}</span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/20 p-2.5">
                            <span className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-3.5 w-3.5 text-blue-500" />
                                Terdaftar Pada
                            </span>
                            <span className="font-mono text-foreground">{selectedUser.created_at || '-'}</span>
                        </div>
                    </div>

                    {/* Assigned Roles Pills */}
                    <div>
                        <div className="mb-1.5 text-xs font-semibold text-muted-foreground">Assigned Roles</div>
                        <div className="flex flex-wrap gap-1.5">
                            {selectedUser.roles.map((r) => (
                                <span
                                    key={r}
                                    className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-500"
                                >
                                    {r}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Scrollable Effective Permission Grouped by Role & Module */}
                    <div className="space-y-2.5 pt-2 border-t border-border">
                        <div className="flex items-center justify-between">
                            <div className="text-xs font-bold text-foreground">
                                Effective Permissions (Per Role & Modul)
                            </div>
                            <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-500">
                                {effectivePerms.length} Total
                            </span>
                        </div>

                        <div className="max-h-72 overflow-y-auto rounded-lg border border-border bg-muted/10 p-3 space-y-3">
                            {/* Inherited Permissions Grouped by Assigned Role & Module */}
                            {selectedUser.roles && selectedUser.roles.length > 0 ? (
                                selectedUser.roles.map((roleName) => {
                                    const perms = selectedUser.rolePermissions?.[roleName] || [];

                                    return (
                                        <div
                                            key={roleName}
                                            className="space-y-2 rounded-lg border border-border bg-background p-3 shadow-2xs"
                                        >
                                            <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
                                                <span className="text-xs font-bold text-foreground capitalize">
                                                    Role: {roleName}
                                                </span>
                                                <span className="text-xs font-mono text-muted-foreground">
                                                    {perms.length} permission
                                                </span>
                                            </div>
                                            <RenderGroupedPermissions
                                                permissions={perms}
                                                permissionGroups={permissionGroups}
                                            />
                                        </div>
                                    );
                                })
                            ) : null}

                            {/* Direct Permissions Grouped by Module */}
                            {directPerms.length > 0 && (
                                <div className="space-y-2 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3 shadow-2xs">
                                    <div className="flex items-center justify-between border-b border-indigo-500/20 pb-1.5">
                                        <span className="text-xs font-bold text-indigo-500">
                                            Direct Permissions Tambahan
                                        </span>
                                        <span className="text-xs font-mono text-indigo-400">
                                            {directPerms.length} custom
                                        </span>
                                    </div>
                                    <RenderGroupedPermissions
                                        permissions={directPerms}
                                        permissionGroups={permissionGroups}
                                        icon={CheckCircle2}
                                        iconClassName="text-indigo-500"
                                    />
                                </div>
                            )}

                            {!selectedUser.roles?.length && !directPerms.length && (
                                <div className="py-2 text-center text-xs text-muted-foreground">
                                    Belum ada role atau permission aktif.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Panel Buttons */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-border">
                        <button
                            type="button"
                            onClick={() => onStartImpersonate(selectedUser)}
                            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-500 transition hover:bg-emerald-500/20 cursor-pointer"
                        >
                            <UserCheck className="h-4 w-4" />
                            Impersonate User Sesi Ini
                        </button>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => onStartEdit(selectedUser)}
                                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-xs font-semibold text-indigo-500 transition hover:bg-indigo-500/20 cursor-pointer"
                            >
                                <Edit2 className="h-3.5 w-3.5" />
                                Ubah Data
                            </button>
                            <button
                                type="button"
                                onClick={() => onStartDelete(selectedUser)}
                                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-500 transition hover:bg-rose-500/20 cursor-pointer"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-12 text-center text-xs text-muted-foreground">
                    <User className="mx-auto h-8 w-8 text-muted-foreground/50" />
                    <p className="mt-2 font-medium">Pilih pengguna dari tabel</p>
                    <p className="text-[11px] text-muted-foreground/70">
                        Klik salah satu baris tabel di sebelah kiri untuk melihat detail akun.
                    </p>
                </div>
            )}
        </div>
    );
}
