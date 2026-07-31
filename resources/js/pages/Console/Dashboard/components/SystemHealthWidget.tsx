import { Activity, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import type { SystemHealthData } from '../types';

interface SystemHealthWidgetProps {
    healthData: SystemHealthData;
}

export default function SystemHealthWidget({ healthData }: SystemHealthWidgetProps) {
    const { summary, checks, runtime } = healthData;

    return (
        <div className="rounded-xl border border-sidebar-border bg-sidebar p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-sidebar-border pb-4">
                <div className="flex items-center gap-2.5">
                    <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-2 text-blue-500">
                        <Activity className="size-5" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-foreground">Kesehatan Sistem</h3>
                        <p className="text-[12px] text-muted-foreground">
                            Status runtime & koneksi komponen infrastruktur
                        </p>
                    </div>
                </div>
                <div className="text-right text-[12px] text-muted-foreground">
                    <span>Diperiksa: {summary.checked_at}</span>
                </div>
            </div>

            {/* Runtime Meta Info */}
            <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg border border-sidebar-border/60 bg-background/50 p-3 text-[12px] sm:grid-cols-4">
                <div>
                    <span className="text-muted-foreground">Laravel: </span>
                    <span className="font-semibold text-foreground">v{runtime.laravel_version}</span>
                </div>
                <div>
                    <span className="text-muted-foreground">PHP: </span>
                    <span className="font-semibold text-foreground">v{runtime.php_version}</span>
                </div>
                <div>
                    <span className="text-muted-foreground">Env: </span>
                    <span className="font-semibold capitalize text-foreground">{runtime.environment}</span>
                </div>
                <div>
                    <span className="text-muted-foreground">Debug: </span>
                    <span className={`font-semibold ${runtime.debug ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {runtime.debug ? 'ON' : 'OFF'}
                    </span>
                </div>
            </div>

            {/* Diagnostics Checks List */}
            <div className="mt-4 flex flex-col gap-2.5">
                {checks.map((check) => {
                    const isOk = check.status === 'ok';
                    const isWarning = check.status === 'warning';

                    return (
                        <div
                            key={check.name}
                            className="flex items-center justify-between rounded-lg border border-sidebar-border/80 bg-background/40 p-3 transition hover:bg-background/80"
                        >
                            <div className="flex items-center gap-3">
                                {isOk ? (
                                    <CheckCircle2 className="size-4.5 shrink-0 text-emerald-500" />
                                ) : isWarning ? (
                                    <AlertTriangle className="size-4.5 shrink-0 text-amber-500" />
                                ) : (
                                    <XCircle className="size-4.5 shrink-0 text-rose-500" />
                                )}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[12px] font-semibold text-foreground">
                                            {check.name}
                                        </span>
                                        {check.meta && (
                                            <span className="rounded-md border border-sidebar-border bg-sidebar px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                                {check.meta}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[12px] leading-relaxed text-muted-foreground">{check.message}</p>
                                </div>
                            </div>
                            <span
                                className={`shrink-0 text-[12px] font-semibold ${
                                    isOk
                                        ? 'text-emerald-500'
                                        : isWarning
                                          ? 'text-amber-500'
                                          : 'text-rose-500'
                                }`}
                            >
                                {check.value}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
