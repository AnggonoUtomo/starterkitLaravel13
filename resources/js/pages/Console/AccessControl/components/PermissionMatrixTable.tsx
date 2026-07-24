import { X, Lock, Check } from 'lucide-react';
import React from 'react';

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}

interface PermissionMatrixTableProps {
    roles: Role[];
    groupedPermissions: Record<string, string[]>;
    onTogglePermission: (role: Role, permName: string) => void;
    onDeleteRole: (role: Role) => void;
}

export default function PermissionMatrixTable({
    roles,
    groupedPermissions,
    onTogglePermission,
    onDeleteRole,
}: PermissionMatrixTableProps) {
    return (
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
                                            onClick={() => onDeleteRole(role)}
                                            className="text-muted-foreground transition hover:text-rose-500 cursor-pointer"
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
                                            const hasPerm = role.permissions.some(
                                                (p) => p.name === permName,
                                            );
                                            const isSuperSystem =
                                                role.name === 'Super System';

                                            return (
                                                <td
                                                    key={role.id}
                                                    className="px-6 py-3 text-center"
                                                >
                                                    <button
                                                        onClick={() =>
                                                            !isSuperSystem &&
                                                            onTogglePermission(
                                                                role,
                                                                permName,
                                                            )
                                                        }
                                                        disabled={isSuperSystem}
                                                        className={`inline-flex h-7 w-7 items-center justify-center rounded-lg border transition ${
                                                            hasPerm
                                                                ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-500'
                                                                : 'border-border bg-muted/30 text-muted-foreground hover:border-muted-foreground'
                                                        } ${
                                                            isSuperSystem
                                                                ? 'cursor-not-allowed opacity-60'
                                                                : 'cursor-pointer'
                                                        }`}
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
    );
}
