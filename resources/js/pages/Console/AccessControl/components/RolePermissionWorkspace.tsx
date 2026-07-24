import React from 'react';
import type { Role, PermissionGroup } from '../types';
import PermissionModulePanel from './PermissionModulePanel';
import RoleControlCard from './RoleControlCard';

interface RolePermissionWorkspaceProps {
    roles: Role[];
    activeRole: Role;
    activeRoleId: number | null;
    permissionGroups: PermissionGroup[];
    selectedPermissions: string[];
    isProcessing: boolean;
    onRoleChange: (roleId: number) => void;
    onAddRole: () => void;
    onReset: () => void;
    onSubmit: () => void;
    onDeleteRole?: (role: Role) => void;
    onTogglePermission: (permissionName: string) => void;
    onToggleGroup: (group: PermissionGroup) => void;
}

export default function RolePermissionWorkspace({
    roles,
    activeRole,
    activeRoleId,
    permissionGroups,
    selectedPermissions,
    isProcessing,
    onRoleChange,
    onAddRole,
    onReset,
    onSubmit,
    onDeleteRole,
    onTogglePermission,
    onToggleGroup,
}: RolePermissionWorkspaceProps) {
    const isProtected =
        activeRole.name === 'Super System' || activeRole.is_protected;
    const canUpdateRole = !isProtected;

    const totalPermissionCount = permissionGroups.reduce(
        (total, group) => total + group.permissions.length,
        0,
    );

    const isPermissionChecked = (permissionName: string) =>
        selectedPermissions.includes(permissionName);

    const isGroupChecked = (group: PermissionGroup) =>
        group.permissions.length > 0 &&
        group.permissions.every((perm) =>
            selectedPermissions.includes(perm.name),
        );

    const getSelectedCountInGroup = (group: PermissionGroup) =>
        group.permissions.filter((perm) =>
            selectedPermissions.includes(perm.name),
        ).length;

    return (
        <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
            {/* Left Column: Role Selector & Control Card */}
            <RoleControlCard
                roles={roles}
                activeRole={activeRole}
                activeRoleId={activeRoleId}
                totalPermissionCount={totalPermissionCount}
                selectedPermissionCount={selectedPermissions.length}
                isProcessing={isProcessing}
                onRoleChange={onRoleChange}
                onAddRole={onAddRole}
                onReset={onReset}
                onSubmit={onSubmit}
                onDeleteRole={onDeleteRole}
            />

            {/* Right Column: Permission Matrix Module Panel */}
            <PermissionModulePanel
                activeRole={activeRole}
                groups={permissionGroups}
                canUpdateRole={canUpdateRole}
                isPermissionChecked={isPermissionChecked}
                onTogglePermission={onTogglePermission}
                onToggleGroup={onToggleGroup}
                isGroupChecked={isGroupChecked}
                getSelectedCountInGroup={getSelectedCountInGroup}
            />
        </div>
    );
}
