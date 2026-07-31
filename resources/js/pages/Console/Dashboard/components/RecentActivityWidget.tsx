import { Link } from '@inertiajs/react';
import { ArrowRight, Clock, FileText, User } from 'lucide-react';
import type { RecentActivityItem } from '../types';

interface RecentActivityWidgetProps {
    activities: RecentActivityItem[];
}

export default function RecentActivityWidget({ activities }: RecentActivityWidgetProps) {
    return (
        <div className="rounded-xl border border-sidebar-border bg-sidebar p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-sidebar-border pb-4">
                <div className="flex items-center gap-2.5">
                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2 text-amber-500">
                        <FileText className="size-5" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-foreground">Log Aktivitas Terbaru</h3>
                        <p className="text-[12px] text-muted-foreground">
                            5 peristiwa keamanan & audit log terkini
                        </p>
                    </div>
                </div>
                <Link
                    href="/console/audit-logs"
                    className="flex items-center gap-1 text-[12px] font-semibold text-amber-500 transition hover:underline"
                >
                    <span>Lihat Semua</span>
                    <ArrowRight className="size-3.5" />
                </Link>
            </div>

            <div className="mt-4 flex flex-col gap-3">
                {activities.length === 0 ? (
                    <div className="py-8 text-center text-[12px] text-muted-foreground">
                        Belum ada data log aktivitas keamanan terrekam.
                    </div>
                ) : (
                    activities.map((act) => (
                        <div
                            key={act.id ?? act.created_at}
                            className="flex items-start justify-between rounded-lg border border-sidebar-border/70 bg-background/40 p-3 text-[12px] transition hover:bg-background/80"
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 rounded-full border border-sidebar-border bg-sidebar p-1.5 text-muted-foreground">
                                    <User className="size-3.5 text-emerald-500" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-foreground">
                                            {act.user_name ?? 'System'}
                                        </span>
                                        <span className="rounded-md border border-sidebar-border bg-sidebar px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                                            {act.event ?? act.action ?? 'EVENT'}
                                        </span>
                                    </div>
                                    <p className="mt-0.5 text-muted-foreground">
                                        {act.user_email ? `(${act.user_email})` : ''}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
                                <Clock className="size-3 shrink-0" />
                                <span>{act.created_at_human ?? act.created_at}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
