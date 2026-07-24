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
                    <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                        <FileText className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        <span>{title}</span>
                    </h1>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        Visual inspection of domain security events, user
                        activity, and system changes.
                    </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                    <form
                        onSubmit={handleSearch}
                        className="relative w-full max-w-md"
                    >
                        <Search className="absolute top-3 left-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by event or user name..."
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pr-4 pl-9 text-sm text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:placeholder-slate-500"
                        />
                    </form>
                    <div className="font-mono text-xs font-medium text-slate-600 dark:text-slate-400">
                        Total Audit Logs: {logs.total}
                    </div>
                </div>

                {/* Audit Logs Table */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-xl">
                    <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
                        <thead className="border-b border-slate-200 bg-slate-100 text-xs font-semibold tracking-wider text-slate-700 uppercase dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                            <tr>
                                <th className="px-6 py-4">Event Name</th>
                                <th className="px-6 py-4">Caused By User</th>
                                <th className="px-6 py-4">Timestamp</th>
                                <th className="px-6 py-4 text-right">
                                    Payload Details
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                            {logs.data.length > 0 ? (
                                logs.data.map((log) => (
                                    <tr
                                        key={log.id}
                                        className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                                                {log.event_name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                                                <UserCheck className="h-3.5 w-3.5" />
                                                <span>
                                                    {log.caused_by_user_name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-slate-600 dark:text-slate-400">
                                            {new Date(
                                                log.timestamp,
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() =>
                                                    setSelectedLog(log)
                                                }
                                                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-800 transition hover:bg-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20"
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
                                        className="px-6 py-12 text-center text-sm text-slate-500 dark:text-slate-400"
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
                    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/80">
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{
                                type: 'spring',
                                damping: 25,
                                stiffness: 200,
                            }}
                            className="h-full w-full max-w-lg overflow-y-auto border-l border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                        {selectedLog.event_name}
                                    </h3>
                                    <div className="mt-0.5 font-mono text-xs font-semibold text-amber-700 dark:text-amber-400">
                                        Caused by:{' '}
                                        {selectedLog.caused_by_user_name}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedLog(null)}
                                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div>
                                    <div className="mb-1 text-xs font-semibold text-slate-700 dark:text-slate-400">
                                        Timestamp
                                    </div>
                                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 font-mono text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
                                        {selectedLog.timestamp}
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-1 text-xs font-semibold text-slate-700 dark:text-slate-400">
                                        JSON Payload
                                    </div>
                                    <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-emerald-400">
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
