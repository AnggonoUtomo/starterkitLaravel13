export interface HealthCheckItem {
    name: string;
    description: string;
    status: 'ok' | 'warning' | 'error';
    value: string;
    meta?: string | null;
    message: string;
}

export interface SystemHealthSummary {
    status: 'ok' | 'warning' | 'error';
    ok: number;
    warning: number;
    error: number;
    checked_at: string;
}

export interface SystemRuntimeInfo {
    environment: string;
    debug: boolean;
    php_version: string;
    laravel_version: string;
    timezone: string;
    locale: string;
}

export interface SystemHealthData {
    summary: SystemHealthSummary;
    runtime: SystemRuntimeInfo;
    checks: HealthCheckItem[];
}

export interface RecentActivityItem {
    id: string;
    user_name: string;
    user_email: string;
    event: string;
    action: string;
    created_at: string;
    created_at_human: string;
}

export interface DashboardStats {
    total_users: number;
    active_roles: number;
    total_audit_logs: number;
    system_health: SystemHealthData;
    recent_activities: RecentActivityItem[];
}

export interface DashboardPageProps {
    stats: DashboardStats;
}
