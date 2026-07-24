import { CheckCircle2, Server } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { EnvironmentInfo } from '../types';
import { healthIconClass } from '../utils';

export function EnvironmentInfoPanel({
    environmentInfo,
}: {
    environmentInfo: EnvironmentInfo;
}) {
    return (
        <Card data-dashboard-card className="min-w-0 overflow-hidden">
            <CardHeader className="border-b px-6 py-4">
                <CardTitle className="flex items-center gap-2 text-base font-bold">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                        <Server className="size-5" />
                    </span>
                    Environment & Server Diagnostics
                </CardTitle>
                <CardDescription className="text-xs">
                    Informasi environment yang aman dibaca untuk diagnosis dan
                    deployment.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-5 sm:p-6">
                <div className="grid gap-4 lg:grid-cols-3">
                    <div className="rounded-lg border bg-muted/20 p-4">
                        <p className="text-xs text-muted-foreground">
                            App Environment Mode
                        </p>
                        <p className="mt-1 text-base font-bold tracking-wider uppercase">
                            {environmentInfo.summary.mode}
                        </p>
                    </div>
                    <div className="rounded-lg border bg-muted/20 p-4">
                        <p className="text-xs text-muted-foreground">
                            Generated At
                        </p>
                        <p className="mt-1 font-mono text-xs font-semibold">
                            {environmentInfo.summary.generated_at}
                        </p>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                        <p className="text-xs font-bold">Catatan Keamanan</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                            {environmentInfo.summary.notice}
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 xl:grid-cols-2">
                    {environmentInfo.groups.map((group) => (
                        <div
                            key={group.title}
                            className="rounded-lg border bg-muted/20"
                        >
                            <div className="border-b px-4 py-3">
                                <p className="text-xs font-bold">
                                    {group.title}
                                </p>
                                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                                    {group.description}
                                </p>
                            </div>
                            <div className="divide-y divide-border/60">
                                {group.items.map((item) => (
                                    <div
                                        key={`${group.title}-${item.label}`}
                                        className="grid gap-2 px-4 py-3 sm:grid-cols-[180px_minmax(0,1fr)]"
                                    >
                                        <div className="flex items-center gap-2">
                                            {item.status ? (
                                                <CheckCircle2
                                                    className={`size-3.5 ${healthIconClass(item.status)}`}
                                                />
                                            ) : null}
                                            <p className="text-xs font-medium text-muted-foreground">
                                                {item.label}
                                            </p>
                                        </div>
                                        <p className="font-mono text-xs font-semibold break-words">
                                            {String(item.value ?? '-')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
