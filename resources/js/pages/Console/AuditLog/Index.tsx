import { Head, router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, FileText, Search, UserCheck, X } from 'lucide-react';
import React, { useState } from 'react';
import ConsoleLayout from '@/layouts/ConsoleLayout';

interface AuditLog {
    id: string;
    event_name: string;
    caused_by_user_id?: number | null;
    caused_by_user_name: string;
    payload: Record<string, any>;
    timestamp: string;
}

interface PaginatedLogs {
    data: AuditLog[];
    total: number;
}

interface Props {
    title: string;
    logs: PaginatedLogs;
    filters: {
        search: string;
    };
}

export default function Index({ title, logs, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/console/audit-logs', { search }, { preserveState: true });
    };

    return (
        <ConsoleLayout>
            <Head title={title} />
            <div className="mx-auto max-w-7xl space-y-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground">
                        <FileText className="h-6 w-6 text-amber-500" />
                        <span>{title}</span>
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Visual inspection of domain security events, user
                        activity, and system changes.
                    </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-sm">
                    <form
                        onSubmit={handleSearch}
                        className="relative w-full max-w-md"
                    >
                        <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by event or user name..."
                            className="w-full rounded-lg border border-border bg-background py-2 pr-4 pl-9 text-sm outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </form>
                    <div className="font-mono text-xs font-medium text-muted-foreground">
                        Total Audit Logs: {logs.total}
                    </div>
                </div>

                {/* Audit Logs Table */}
                <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                    <table className="w-full text-left text-sm text-foreground">
                        <thead className="border-b border-border bg-muted/60 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                            <tr>
                                <th className="px-6 py-4">Event Name</th>
                                <th className="px-6 py-4">Caused By User</th>
                                <th className="px-6 py-4">Timestamp</th>
                                <th className="px-6 py-4 text-right">
                                    Payload Details
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {logs.data.length > 0 ? (
                                logs.data.map((log) => (
                                    <tr
                                        key={log.id}
                                        className="transition hover:bg-muted/40"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-foreground">
                                                {log.event_name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-amber-500">
                                                <UserCheck className="h-3.5 w-3.5" />
                                                <span>
                                                    {log.caused_by_user_name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                                            {new Date(
                                                log.timestamp,
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() =>
                                                    setSelectedLog(log)
                                                }
                                                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-500 transition hover:bg-amber-500/20"
                                            >
                                                <Eye className="h-3.5 w-3.5" />{' '}
                                                View Payload
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-12 text-center text-sm text-muted-foreground"
                                    >
                                        No audit log entries recorded yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Slide-over Detail Drawer */}
            <AnimatePresence>
                {selectedLog && (
                    <div className="fixed inset-0 z-50 flex justify-end bg-background/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{
                                type: 'spring',
                                damping: 25,
                                stiffness: 200,
                            }}
                            className="h-full w-full max-w-lg overflow-y-auto border-l border-border bg-card p-6 shadow-2xl"
                        >
                            <div className="flex items-center justify-between border-b border-border pb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">
                                        {selectedLog.event_name}
                                    </h3>
                                    <div className="mt-0.5 font-mono text-xs font-semibold text-amber-500">
                                        Caused by:{' '}
                                        {selectedLog.caused_by_user_name}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedLog(null)}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div>
                                    <div className="mb-1 text-xs font-semibold text-muted-foreground">
                                        Timestamp
                                    </div>
                                    <div className="rounded-lg border border-border bg-muted/50 p-2.5 font-mono text-xs text-foreground">
                                        {selectedLog.timestamp}
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-1 text-xs font-semibold text-muted-foreground">
                                        JSON Payload
                                    </div>
                                    <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 font-mono text-xs text-emerald-500">
                                        {JSON.stringify(
                                            selectedLog.payload,
                                            null,
                                            2,
                                        )}
                                    </pre>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </ConsoleLayout>
    );
}
