import { ShieldCheck, ChevronDown, ChevronRight, Search } from 'lucide-react';
import React, { useState } from 'react';

interface PermissionItem {
    id?: number | string;
    name: string;
    label?: string;
}

interface PermissionGroup {
    module: string;
    label: string;
    permissions: PermissionItem[];
}

interface Role {
    id: number;
    name: string;
    guard_name?: string;
    is_protected?: boolean;
    permissions?: string[];
}

interface PermissionModulePanelProps {
    activeRole: Role;
    groups: PermissionGroup[];
    canUpdateRole: boolean;
    isPermissionChecked: (permissionName: string) => boolean;
    onTogglePermission: (permissionName: string) => void;
    onToggleGroup: (group: PermissionGroup) => void;
    isGroupChecked: (group: PermissionGroup) => boolean;
    getSelectedCountInGroup: (group: PermissionGroup) => number;
}

export default function PermissionModulePanel({
    activeRole,
    groups,
    canUpdateRole,
    isPermissionChecked,
    onTogglePermission,
    onToggleGroup,
    isGroupChecked,
    getSelectedCountInGroup,
}: PermissionModulePanelProps) {
    const [openedModule, setOpenedModule] = useState<string | null>(
        groups[0]?.module || null,
    );
    const [searchQuery, setSearchQuery] = useState('');

    const toggleAccordion = (moduleName: string) => {
        setOpenedModule((current) => (current === moduleName ? null : moduleName));
    };

    // Filter groups by search query
    const filteredGroups = groups.map((group) => {
        if (!searchQuery.trim()) {
            return group;
        }

        const filtered = group.permissions.filter(
            (perm) =>
                perm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (perm.label &&
                    perm.label.toLowerCase().includes(searchQuery.toLowerCase())),
        );

        return {
            ...group,
            permissions: filtered,
        };
    }).filter((group) => group.permissions.length > 0);

    return (
        <div className="flex flex-col rounded-xl border border-border bg-card shadow-xs overflow-hidden min-h-[550px]">
            {/* Header */}
            <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-500">
                        <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-foreground">
                            Matriks Izin Submodul
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Atur izin granular untuk role{' '}
                            <span className="font-semibold text-indigo-500">
                                {activeRole.name}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Search Bar inside Panel */}
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari izin..."
                        className="w-full rounded-lg border border-border bg-background py-1.5 pl-9 pr-3 text-xs text-foreground outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {!canUpdateRole && (
                <div className="m-4 mb-0 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-600 dark:text-amber-400">
                    Role sistem protected ini bersifat baca-saja (*read-only*).
                </div>
            )}

            {/* Groups List */}
            <div className="flex-1 space-y-3 p-4 overflow-y-auto max-h-[600px]">
                {filteredGroups.length > 0 ? (
                    filteredGroups.map((group, groupIndex) => {
                        const isOpen = openedModule === group.module || searchQuery.length > 0;
                        const groupChecked = isGroupChecked(group);
                        const selectedInGroup = getSelectedCountInGroup(group);

                        return (
                            <div
                                key={group.module}
                                className="rounded-lg border border-border bg-background overflow-hidden transition shadow-2xs"
                            >
                                <div className="flex items-center gap-3 bg-card px-4 py-3 hover:bg-muted/40 transition">
                                    <input
                                        id={groupIndex === 0 ? 'access-permission-first' : undefined}
                                        type="checkbox"
                                        checked={groupChecked}
                                        disabled={!canUpdateRole}
                                        onChange={() => onToggleGroup(group)}
                                        className="h-4 w-4 rounded border-border text-indigo-600 focus:ring-indigo-500 disabled:opacity-50 cursor-pointer"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => toggleAccordion(group.module)}
                                        className="flex flex-1 items-center justify-between gap-3 text-left cursor-pointer"
                                    >
                                        <div>
                                            <div className="text-sm font-bold text-foreground">
                                                {group.label}
                                            </div>
                                            <div className="text-[11px] text-muted-foreground">
                                                {group.permissions.length} izin tersedia
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-indigo-500">
                                                {selectedInGroup} / {group.permissions.length}
                                            </span>
                                            {isOpen ? (
                                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </div>
                                    </button>
                                </div>

                                {isOpen && (
                                    <div className="border-t border-border bg-muted/10 p-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                                        {group.permissions.map((perm) => {
                                            const checked = isPermissionChecked(perm.name);

                                            return (
                                                <label
                                                    key={perm.name}
                                                    className={`flex items-start gap-2.5 rounded-lg border p-3 transition cursor-pointer ${
                                                        checked
                                                            ? 'border-indigo-500/40 bg-indigo-500/5 text-foreground shadow-2xs'
                                                            : 'border-border bg-card text-muted-foreground hover:border-muted-foreground'
                                                    }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={checked}
                                                        disabled={!canUpdateRole}
                                                        onChange={() => onTogglePermission(perm.name)}
                                                        className="mt-0.5 h-4 w-4 rounded border-border text-indigo-600 focus:ring-indigo-500 disabled:opacity-50 cursor-pointer"
                                                    />
                                                    <div className="min-w-0">
                                                        <div className="text-xs font-semibold text-foreground">
                                                            {perm.label || perm.name}
                                                        </div>
                                                        <div className="font-mono text-[10px] text-muted-foreground break-all">
                                                            {perm.name}
                                                        </div>
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
                        <p className="text-sm font-medium">Tidak ada izin yang cocok dengan pencarian.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
