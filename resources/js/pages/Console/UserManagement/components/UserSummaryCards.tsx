import { Users, Shield, UserCheck } from 'lucide-react';
import React from 'react';

interface UserSummaryCardsProps {
    totalUsers: number;
    totalRoles: number;
    activeUsersCount?: number;
}

export default function UserSummaryCards({
    totalUsers,
    totalRoles,
    activeUsersCount,
}: UserSummaryCardsProps) {
    const activeCount = activeUsersCount ?? totalUsers;

    return (
        <div className="grid gap-4 sm:grid-cols-3">
            {/* Total Users Card */}
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-xs">
                <div className="flex size-11 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
                    <Users className="h-5 w-5" />
                </div>
                <div>
                    <div className="text-xs font-semibold text-muted-foreground">Total Pengguna</div>
                    <div className="text-xl font-bold text-foreground">{totalUsers}</div>
                </div>
            </div>

            {/* Total Roles Card */}
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-xs">
                <div className="flex size-11 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-500">
                    <Shield className="h-5 w-5" />
                </div>
                <div>
                    <div className="text-xs font-semibold text-muted-foreground">Total Role</div>
                    <div className="text-xl font-bold text-foreground">{totalRoles}</div>
                </div>
            </div>

            {/* Active Users Card */}
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-xs">
                <div className="flex size-11 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-500">
                    <UserCheck className="h-5 w-5" />
                </div>
                <div>
                    <div className="text-xs font-semibold text-muted-foreground">Pengguna Aktif</div>
                    <div className="text-xl font-bold text-foreground">{activeCount}</div>
                </div>
            </div>
        </div>
    );
}
