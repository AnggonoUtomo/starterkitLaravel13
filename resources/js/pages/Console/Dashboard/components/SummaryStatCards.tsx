import { Activity, FileText, Shield, Users } from 'lucide-react';
import type { DashboardStats } from '../types';

interface SummaryStatCardsProps {
    stats: DashboardStats;
}

export default function SummaryStatCards({ stats }: SummaryStatCardsProps) {
    const healthStatus = stats.system_health.summary.status;
    const healthScoreText =
        healthStatus === 'ok' ? 'Normal' : healthStatus === 'warning' ? 'Perhatian' : 'Kritis';
    const healthScoreBg =
        healthStatus === 'ok'
            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
            : healthStatus === 'warning'
              ? 'border-amber-500/30 bg-amber-500/10 text-amber-500'
              : 'border-rose-500/30 bg-rose-500/10 text-rose-500';

    const cards = [
        {
            title: 'Total Pengguna',
            value: stats.total_users,
            description: 'Pengguna terdaftar di sistem',
            icon: Users,
            iconColor: 'text-emerald-500',
            borderColor: 'hover:border-emerald-500/50',
            bgColor: 'bg-emerald-500/10',
        },
        {
            title: 'Peran & Izin Active',
            value: stats.active_roles,
            description: 'Role RBAC Spatie terkonfigurasi',
            icon: Shield,
            iconColor: 'text-indigo-500',
            borderColor: 'hover:border-indigo-500/50',
            bgColor: 'bg-indigo-500/10',
        },
        {
            title: 'Audit Logs',
            value: stats.total_audit_logs,
            description: 'Total log aktivitas keamanan',
            icon: FileText,
            iconColor: 'text-amber-500',
            borderColor: 'hover:border-amber-500/50',
            bgColor: 'bg-amber-500/10',
        },
        {
            title: 'Health Status',
            value: healthScoreText,
            description: `${stats.system_health.summary.ok} dari ${stats.system_health.checks.length} modul normal`,
            icon: Activity,
            iconColor: 'text-blue-500',
            borderColor: 'hover:border-blue-500/50',
            bgColor: 'bg-blue-500/10',
            badgeClass: healthScoreBg,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className={`group relative overflow-hidden rounded-xl border border-sidebar-border bg-sidebar p-5 transition-all duration-200 shadow-xs hover:shadow-md ${card.borderColor}`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                {card.title}
                            </span>
                            <div className={`rounded-lg p-2.5 ${card.bgColor}`}>
                                <Icon className={`size-5 ${card.iconColor}`} />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between">
                            {typeof card.value === 'number' ? (
                                <span className="text-3xl font-extrabold tracking-tight text-foreground">
                                    {card.value}
                                </span>
                            ) : (
                                <span
                                    className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-bold ${card.badgeClass}`}
                                >
                                    {card.value}
                                </span>
                            )}
                        </div>

                        <p className="mt-2 text-[12px] text-muted-foreground">{card.description}</p>
                    </div>
                );
            })}
        </div>
    );
}
