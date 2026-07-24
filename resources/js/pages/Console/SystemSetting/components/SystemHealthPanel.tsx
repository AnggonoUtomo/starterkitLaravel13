import { CheckCircle2, HeartPulse } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { SystemHealth } from '../types';
import {
    healthBadgeVariant,
    healthIconClass,
    healthStatusLabel,
} from '../utils';

export function SystemHealthPanel({
    systemHealth,
}: {
    systemHealth: SystemHealth;
}) {
    return (
        <Card data-dashboard-card className="min-w-0 overflow-hidden">
            <CardHeader className="border-b px-6 py-4">
                <CardTitle className="flex items-center gap-2 text-base font-bold">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <HeartPulse className="size-5" />
                    </span>
                    System Health & Operational Status
                </CardTitle>
                <CardDescription className="text-xs">
                    Ringkasan kesehatan runtime aplikasi dan konfigurasi
                    operasional.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-5 sm:p-6">
                <div className="grid gap-4 lg:grid-cols-4">
                    <div className="rounded-lg border bg-muted/20 p-4">
                        <p className="text-xs text-muted-foreground">
                            Overall Status
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                            <CheckCircle2
                                className={`size-5 ${healthIconClass(systemHealth.summary.status)}`}
                            />
                            <p className="text-lg font-bold">
                                {healthStatusLabel(systemHealth.summary.status)}
                            </p>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-muted/20 p-4">
                        <p className="text-xs text-muted-foreground">Healthy</p>
                        <p className="mt-1 text-lg font-bold text-emerald-600 dark:text-emerald-400">
                            {systemHealth.summary.ok}
                        </p>
                    </div>
                    <div className="rounded-lg border bg-muted/20 p-4">
                        <p className="text-xs text-muted-foreground">Warning</p>
                        <p className="mt-1 text-lg font-bold text-amber-600 dark:text-amber-400">
                            {systemHealth.summary.warning}
                        </p>
                    </div>
                    <div className="rounded-lg border bg-muted/20 p-4">
                        <p className="text-xs text-muted-foreground">Error</p>
                        <p className="mt-1 text-lg font-bold text-rose-600 dark:text-rose-400">
                            {systemHealth.summary.error}
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
                    <div className="space-y-3">
                        {systemHealth.checks.map((check) => (
                            <div
                                key={check.name}
                                className="flex flex-col gap-3 rounded-lg border bg-muted/20 p-4 sm:flex-row sm:items-start sm:justify-between"
                            >
                                <div className="min-w-0 space-y-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <CheckCircle2
                                            className={`size-4 ${healthIconClass(check.status)}`}
                                        />
                                        <p className="text-xs font-bold">
                                            {check.name}
                                        </p>
                                        <Badge
                                            variant={healthBadgeVariant(
                                                check.status,
                                            )}
                                            className="text-[10px]"
                                        >
                                            {healthStatusLabel(check.status)}
                                        </Badge>
                                    </div>
                                    <p className="text-xs leading-relaxed text-muted-foreground">
                                        {check.description}
                                    </p>
                                    {check.message !== 'OK' ? (
                                        <p className="text-xs leading-relaxed text-muted-foreground">
                                            {check.message}
                                        </p>
                                    ) : null}
                                </div>
                                <div className="min-w-0 text-left sm:text-right">
                                    <p className="font-mono text-xs font-bold break-words">
                                        {String(check.value ?? '-')}
                                    </p>
                                    {check.meta ? (
                                        <p className="mt-0.5 text-[11px] break-words text-muted-foreground">
                                            {check.meta}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-lg border border-dashed bg-muted/20 p-4">
                            <p className="text-xs font-bold">Runtime Info</p>
                            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                                Dibaca langsung dari konfigurasi aktif. Secret
                                tidak ditampilkan.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            {Object.entries(systemHealth.runtime).map(
                                ([key, value]) => (
                                    <div
                                        key={key}
                                        className="rounded-lg border bg-muted/20 p-3"
                                    >
                                        <p className="text-xs text-muted-foreground capitalize">
                                            {key.replaceAll('_', ' ')}
                                        </p>
                                        <p className="mt-0.5 font-mono text-xs font-semibold break-words">
                                            {String(value ?? '-')}
                                        </p>
                                    </div>
                                ),
                            )}
                        </div>
                        <div className="rounded-lg border bg-muted/40 p-3 text-xs leading-relaxed">
                            <p className="font-semibold">Terakhir Dicek</p>
                            <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                                {systemHealth.summary.checked_at}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
