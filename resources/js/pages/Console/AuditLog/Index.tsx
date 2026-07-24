import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import ConsoleFilterBar from '@/components/console/ConsoleFilterBar';
import ConsoleLayout from '@/layouts/ConsoleLayout';
import AuditLogHeader from './components/AuditLogHeader';
import AuditLogTable from './components/AuditLogTable';
import AuditPayloadDrawer from './components/AuditPayloadDrawer';

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
                <AuditLogHeader title={title} />

                {/* Filter & Search Bar */}
                <ConsoleFilterBar
                    search={search}
                    onSearchChange={setSearch}
                    onSubmit={handleSearch}
                    placeholder="Search by event or user name..."
                    totalCount={logs.total}
                    totalCountLabel="Total Audit Logs"
                    focusColorClass="focus:ring-amber-500"
                />

                {/* Audit Logs Table */}
                <AuditLogTable
                    logs={logs.data}
                    onSelectLog={setSelectedLog}
                />
            </div>

            {/* Slide-over Detail Drawer */}
            <AuditPayloadDrawer
                selectedLog={selectedLog}
                onClose={() => setSelectedLog(null)}
            />
        </ConsoleLayout>
    );
}
