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

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedUsers {
    data: UserData[];
    links: PaginationLink[];
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
    from: number;
    to: number;
}

export interface UserFormPayload {
    name: string;
    email: string;
    password?: string;
    roles: string[];
    permissions: string[];
}

export interface UserManagementIndexProps {
    title: string;
    users: PaginatedUsers;
    availableRoles: string[];
    rolesWithPermissions?: RoleOptionItem[];
    permissionGroups?: PermissionGroupItem[];
    filters: {
        search: string;
        role: string;
    };
}

export interface UserWorkspaceCardProps {
    mode: UserWorkspaceMode;
    selectedUser: UserData | null;
    formData: UserFormPayload;
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

export interface UserTableProps {
    users: UserData[];
    selectedUser: UserData | null;
    search: string;
    roleFilter: string;
    availableRoles: string[];
    totalUsers: number;
    currentPage?: number;
    lastPage?: number;
    from?: number;
    to?: number;
    paginationLinks?: PaginationLink[];
    onSearchChange: (value: string) => void;
    onRoleFilterChange: (value: string) => void;
    onSearchSubmit: (e: React.FormEvent) => void;
    onSelectUser: (user: UserData) => void;
    onOpenCreate: () => void;
    onOpenEdit: (user: UserData) => void;
    onOpenDelete: (user: UserData) => void;
    onOpenImpersonate: (user: UserData) => void;
}

export interface CreateUserModalProps {
    isOpen: boolean;
    availableRoles: string[];
    isProcessing: boolean;
    onClose: () => void;
    onSubmit: (data: {
        name: string;
        email: string;
        password?: string;
        roles: string[];
    }) => void;
}

export interface EditUserModalProps {
    isOpen: boolean;
    user: UserData | null;
    availableRoles: string[];
    isProcessing: boolean;
    onClose: () => void;
    onSubmit: (data: {
        name: string;
        email: string;
        password?: string;
        roles: string[];
    }) => void;
}

export interface DeleteUserModalProps {
    isOpen: boolean;
    user: UserData | null;
    isProcessing: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export interface ImpersonateUserModalProps {
    isOpen: boolean;
    user: UserData | null;
    isProcessing: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export interface UserManagementHeaderProps {
    title: string;
    totalUsers: number;
    onStartCreate: () => void;
}

export interface UserShortcutPanelProps {
    isOpen: boolean;
    onToggle: () => void;
}

export interface UserSummaryCardsProps {
    totalUsers: number;
    activeUsers?: number;
    adminCount?: number;
}
