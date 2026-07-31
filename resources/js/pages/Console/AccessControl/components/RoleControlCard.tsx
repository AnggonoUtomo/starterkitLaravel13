import { usePage } from '@inertiajs/react';
import {
    KeyRound,
    Plus,
    RefreshCcw,
    Save,
    Trash2,
    ShieldCheck,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { usePermission } from '@/hooks/use-permission';
import type { Role } from '../types';

interface RoleControlCardProps {
    roles: Role[];
    activeRole: Role | null;
    activeRoleId: number | null;
    totalPermissionCount: number;
    selectedPermissionCount: number;
    isProcessing: boolean;
    onRoleChange: (roleId: number) => void;
    onAddRole: () => void;
    onReset: () => void;
    onSubmit: () => void;
    onDeleteRole?: (role: Role) => void;
}

export default function RoleControlCard({
    roles,
    activeRole,
    activeRoleId,
    totalPermissionCount,
    selectedPermissionCount,
    isProcessing,
    onRoleChange,
    onAddRole,
    onReset,
    onSubmit,
    onDeleteRole,
}: RoleControlCardProps) {
    const { can } = usePermission();
    const [roleSearch, setRoleSearch] = useState('');
    const { props: pageProps } = usePage<{ pagination?: { min_search_chars?: number } }>();
    const minSearchChars = pageProps.pagination?.min_search_chars ?? 3;

    const filteredRoles = useMemo(() => {
        const term = roleSearch.trim().toLowerCase();

        if (!term || (term.length > 0 && term.length < minSearchChars)) {
            return roles;
        }

        return roles.filter((role) => role.name.toLowerCase().includes(term));
    }, [roles, roleSearch, minSearchChars]);

    const progressPercentage =
        totalPermissionCount > 0
            ? Math.round((selectedPermissionCount / totalPermissionCount) * 100)
            : 0;

    const isProtected =
        activeRole?.name === 'Super System' || activeRole?.is_protected;

    return (
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-xs">
            {/* Header / Title */}
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-500">
                        <KeyRound className="h-4 w-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-foreground">
                            Pilih Role
                        </h3>
                        <p className="text-[13px] text-muted-foreground">
                            Role aktif menjadi target konfigurasi matriks.
                        </p>
                    </div>
                </div>

                {can('access_control.role.create') && (
                    <button
                        type="button"
                        onClick={onAddRole}
                        className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 transition hover:bg-emerald-500/20"
                        title="Tambah Role Baru"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Dropdown Role Selector & Search */}
            <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-semibold text-muted-foreground">
                        Role Terpilih ({filteredRoles.length})
                    </label>
                    {roles.length > 4 && (
                        <input
                            type="text"
                            value={roleSearch}
                            onChange={(e) => setRoleSearch(e.target.value)}
                            placeholder="Cari role..."
                            className="w-32 rounded-md border border-border bg-background px-2 py-0.5 text-[11px] text-foreground outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    )}
                </div>
                <select
                    id="access-role-select"
                    value={activeRoleId ?? ''}
                    onChange={(e) => onRoleChange(Number(e.target.value))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {filteredRoles.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.name}{' '}
                            {role.name === 'Super System' ? '(Protected)' : ''}
                        </option>
                    ))}
                </select>
            </div>

            {/* Active Role Card Details */}
            {activeRole && (
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-foreground">
                            {activeRole.name}
                        </span>
                        {isProtected ? (
                            <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold text-indigo-500">
                                <ShieldCheck className="h-3 w-3" />
                                Protected System Role
                            </span>
                        ) : (
                            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
                                Custom Role
                            </span>
                        )}
                    </div>
                    <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                        Guard: {activeRole.guard_name || 'web'}
                    </div>
                </div>
            )}

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-border bg-background p-2.5">
                    <div className="text-[10px] font-semibold text-muted-foreground">
                        Total Role
                    </div>
                    <div className="text-base font-bold text-foreground">
                        {roles.length}
                    </div>
                </div>
                <div className="rounded-lg border border-border bg-background p-2.5">
                    <div className="text-[10px] font-semibold text-muted-foreground">
                        Total Izin
                    </div>
                    <div className="text-base font-bold text-foreground">
                        {totalPermissionCount}
                    </div>
                </div>
                <div className="rounded-lg border border-border bg-background p-2.5">
                    <div className="text-[10px] font-semibold text-emerald-500">
                        Terpilih
                    </div>
                    <div className="text-base font-bold text-emerald-500">
                        {selectedPermissionCount}
                    </div>
                </div>
                <div className="rounded-lg border border-border bg-background p-2.5">
                    <div className="text-[10px] font-semibold text-indigo-500">
                        Cakupan
                    </div>
                    <div className="text-base font-bold text-indigo-500">
                        {progressPercentage}%
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div>
                <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                    <span>Progress Izin Active</span>
                    <span>
                        {selectedPermissionCount} / {totalPermissionCount}
                    </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                        className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>

            {/* Action Buttons */}
            {can('access_control.role.edit') && (
                <div className="flex gap-2 pt-1">
                    <button
                        type="button"
                        onClick={onReset}
                        disabled={isProcessing || isProtected}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-muted enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <RefreshCcw className="h-3.5 w-3.5" />
                        Reset
                    </button>
                    <button
                        id="access-save-permissions"
                        type="button"
                        onClick={onSubmit}
                        disabled={isProcessing || isProtected}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700 enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Save className="h-3.5 w-3.5" />
                        {isProcessing ? 'Memproses...' : 'Simpan'}
                    </button>
                </div>
            )}

            {/* Delete Role Option */}
            {!isProtected && onDeleteRole && activeRole && can('access_control.role.delete') && (
                <button
                    id="access-delete-role"
                    type="button"
                    onClick={() => onDeleteRole(activeRole)}
                    disabled={isProcessing}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-500 transition hover:bg-rose-500/20 enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                    Hapus Role Ini
                </button>
            )}
        </div>
    );
}
