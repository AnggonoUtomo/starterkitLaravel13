export interface Permission {
    id?: number | string;
    name: string;
    label?: string;
    guard_name?: string;
}

export interface Role {
    id: number;
    name: string;
    guard_name?: string;
    is_protected?: boolean;
    permissions?: (Permission | string)[];
}

export interface PermissionGroup {
    module: string;
    label: string;
    permissions: Permission[];
}
