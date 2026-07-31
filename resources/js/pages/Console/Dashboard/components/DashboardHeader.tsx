import { Activity, Calendar, LayoutDashboard, Sparkles } from 'lucide-react';

interface DashboardHeaderProps {
    userName?: string;
}

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
    const todayFormatted = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date());

    return (
        <div className="flex flex-col justify-between gap-4 rounded-xl border border-sidebar-border bg-gradient-to-r from-emerald-500/10 via-sidebar to-sidebar p-6 shadow-xs sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/15 text-emerald-500 shadow-xs">
                    <LayoutDashboard className="size-6" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                            Selamat Datang, {userName ?? 'Administrator'}!
                        </h1>
                        <Sparkles className="size-4 text-emerald-500" />
                    </div>
                    <p className="mt-1 text-[12px] text-muted-foreground">
                        Ringkasan aktivitas sistem, indikator kesehatan, dan navigasi modul Console.
                    </p>
                </div>
            </div>

            <div className="flex shrink-0 items-center gap-2.5 rounded-lg border border-sidebar-border bg-background/80 px-3.5 py-2 text-xs text-muted-foreground backdrop-blur">
                <Calendar className="size-4 text-emerald-500" />
                <span className="font-medium text-foreground" suppressHydrationWarning>{todayFormatted}</span>
                <span className="h-3 w-px bg-sidebar-border" />
                <span className="flex items-center gap-1.5 font-medium text-emerald-500">
                    <Activity className="size-3.5 animate-pulse" />
                    System Active
                </span>
            </div>
        </div>
    );
}
