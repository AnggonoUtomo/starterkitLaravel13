import { UserCheck, Eye } from 'lucide-react';
import React from 'react';
import ConsoleEmptyState from '@/components/console/ConsoleEmptyState';

interface AuditLog {
    id: string;
    event_name: string;
    caused_by_user_id?: number | null;
    caused_by_user_name: string;
    payload: Record<string, any>;
    timestamp: string;
}

interface AuditLogTableProps {
    logs: AuditLog[];
    onSelectLog: (log: AuditLog) => void;
}

export default function AuditLogTable({
    logs,
    onSelectLog,
}: AuditLogTableProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full text-left text-sm text-foreground">
                <thead className="border-b border-border bg-muted/60 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    <tr>
                        <th className="px-6 py-4">Event Name</th>
                        <th className="px-6 py-4">Caused By User</th>
                        <th className="px-6 py-4">Timestamp</th>
                        <th className="px-6 py-4 text-right">Payload Details</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {logs.length > 0 ? (
                        logs.map((log) => (
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
                                        <span>{log.caused_by_user_name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                                    {new Date(log.timestamp).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => onSelectLog(log)}
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-500 transition hover:bg-amber-500/20 cursor-pointer"
                                    >
                                        <Eye className="h-3.5 w-3.5" /> View
                                        Payload
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <ConsoleEmptyState
                            title="No audit logs found"
                            description="No domain security events match your current search query."
                            colSpan={4}
                        />
                    )}
                </tbody>
            </table>
        </div>
    );
}
