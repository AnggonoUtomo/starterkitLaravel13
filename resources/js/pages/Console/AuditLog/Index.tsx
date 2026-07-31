import { Head, router, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import ConsoleFilterBar from '@/components/console/ConsoleFilterBar';
import ConsoleLayout from '@/layouts/ConsoleLayout';
import AuditLogHeader from './components/AuditLogHeader';
import AuditLogTable from './components/AuditLogTable';
import AuditPayloadDrawer from './components/AuditPayloadDrawer';
import type { AuditLog, AuditLogIndexProps } from './types';

export default function Index({ title, logs, filters }: AuditLogIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

    const { props: pageProps } = usePage<{ pagination?: { min_search_chars?: number } }>();
    const minSearchChars = pageProps.pagination?.min_search_chars ?? 3;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (search.length > 0 && search.length < minSearchChars) {
            return;
        }

        router.get('/console/audit-logs', { search }, { preserveState: true });
    };

    useEffect(() => {
        if (search === (filters.search || '')) {
            return;
        }

        if (search.length > 0 && search.length < minSearchChars) {
            return;
        }

        const timer = setTimeout(() => {
            router.get('/console/audit-logs', { search }, { preserveState: true });
        }, 300);

        return () => clearTimeout(timer);
    }, [search, filters.search, minSearchChars]);

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
                    placeholder="Cari berdasarkan nama event atau nama pengguna... (/)"
                    totalCount={logs.total}
                    totalCountLabel="Total Log Audit"
                    focusColorClass="focus:ring-amber-500"
                />

                {/* Audit Logs Table */}
                <AuditLogTable
                    logs={logs.data}
                    totalLogs={logs.total}
                    currentPage={logs.current_page}
                    lastPage={logs.last_page}
                    from={logs.from}
                    to={logs.to}
                    paginationLinks={logs.links}
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
