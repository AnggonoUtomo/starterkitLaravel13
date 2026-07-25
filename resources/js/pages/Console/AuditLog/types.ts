export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface AuditLog {
    id: string;
    event_name: string;
    caused_by_user_id?: number | null;
    caused_by_user_name: string;
    payload: Record<string, any>;
    timestamp: string;
}

export interface PaginatedLogs {
    data: AuditLog[];
    links: PaginationLink[];
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
    from: number;
    to: number;
}

export interface AuditLogIndexProps {
    title: string;
    logs: PaginatedLogs;
    filters: {
        search: string;
    };
}

export interface AuditLogTableProps {
    logs: AuditLog[];
    totalLogs?: number;
    currentPage?: number;
    lastPage?: number;
    from?: number;
    to?: number;
    paginationLinks?: PaginationLink[];
    onSelectLog: (log: AuditLog) => void;
}

export interface AuditPayloadDrawerProps {
    selectedLog: AuditLog | null;
    onClose: () => void;
}

export interface AuditLogHeaderProps {
    title: string;
}
