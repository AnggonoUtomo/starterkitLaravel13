import { Head } from '@inertiajs/react';
import {
    Settings,
    Database,
    Activity,
    PackageCheck,
    Cpu,
    HardDrive,
} from 'lucide-react';
import React from 'react';
import ConsoleLayout from '@/layouts/ConsoleLayout';

interface HealthStatus {
    php_version: string;
    laravel_version: string;
    database_status: string;
    redis_status: string;
    cache_driver: string;
    session_driver: string;
    queue_driver: string;
    environment: string;
    debug_mode: boolean;
}

interface SubmoduleItem {
    submodule: string;
    path: string;
    permission_count: number;
    permissions: string[];
}

interface Props {
    title: string;
    health: HealthStatus;
    modules: Record<string, SubmoduleItem[]>;
}

export default function Index({ title, health, modules }: Props) {
    return (
        <ConsoleLayout>
            <Head title={title} />
            <div className="mx-auto max-w-7xl space-y-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-100">
                        <Settings className="h-6 w-6 text-emerald-400" />
                        <span>{title}</span>
                    </h1>
                    <p className="mt-1 text-sm text-slate-400">
                        System health metrics, Redis status, and Auto-Discovered
                        DDD-Lite Modules Registry.
                    </p>
                </div>

                {/* System Health Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-400">
                            <Database className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-xs font-medium text-slate-400">
                                Database Status
                            </div>
                            <div className="text-lg font-bold text-slate-100">
                                {health.database_status}
                            </div>
                            <div className="font-mono text-[10px] text-slate-500">
                                SQLite / MySQL
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                        <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-rose-400">
                            <HardDrive className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-xs font-medium text-slate-400">
                                Redis Infrastructure
                            </div>
                            <div className="text-lg font-bold text-slate-100">
                                {health.redis_status}
                            </div>
                            <div className="font-mono text-[10px] text-slate-500">
                                Cache: {health.cache_driver} | Session:{' '}
                                {health.session_driver}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                        <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-3 text-blue-400">
                            <Cpu className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-xs font-medium text-slate-400">
                                PHP Environment
                            </div>
                            <div className="text-lg font-bold text-slate-100">
                                v{health.php_version}
                            </div>
                            <div className="font-mono text-[10px] text-slate-500">
                                Laravel v{health.laravel_version}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                        <div className="rounded-lg border border-purple-500/20 bg-purple-500/10 p-3 text-purple-400">
                            <Activity className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-xs font-medium text-slate-400">
                                Queue & Env
                            </div>
                            <div className="text-lg font-bold text-slate-100">
                                {health.environment}
                            </div>
                            <div className="font-mono text-[10px] text-slate-500">
                                Queue: {health.queue_driver}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Registered Modules List */}
                <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-lg font-bold text-slate-100">
                        <PackageCheck className="h-5 w-5 text-emerald-400" />
                        <span>Auto-Discovered DDD-Lite Modules</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {Object.entries(modules).map(
                            ([moduleName, submodules]) => (
                                <div
                                    key={moduleName}
                                    className="space-y-3 rounded-lg border border-slate-800/80 bg-slate-950 p-4"
                                >
                                    <div className="flex items-center justify-between text-sm font-bold tracking-wider text-emerald-400 uppercase">
                                        <span>Module: {moduleName}</span>
                                        <span className="font-mono text-xs font-normal text-slate-500">
                                            {submodules.length} Submodule(s)
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        {submodules.map((sub) => (
                                            <div
                                                key={sub.submodule}
                                                className="rounded-md border border-slate-800 bg-slate-900 p-3"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-semibold text-slate-200">
                                                        {sub.submodule}
                                                    </span>
                                                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-xs text-emerald-400">
                                                        {sub.permission_count}{' '}
                                                        permissions
                                                    </span>
                                                </div>
                                                <div className="mt-1 font-mono text-[10px] text-slate-500">
                                                    {sub.path}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </ConsoleLayout>
    );
}
