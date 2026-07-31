import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Eye, UserCheck } from 'lucide-react';
import React from 'react';
import ConsoleEmptyState from '@/components/console/ConsoleEmptyState';
import type { AuditLogTableProps } from '../types';

export default function AuditLogTable({
    logs,
    totalLogs = 0,
    currentPage = 1,
    lastPage = 1,
    from = 0,
    to = 0,
    paginationLinks = [],
    onSelectLog,
}: AuditLogTableProps) {
    const prevLink = paginationLinks?.find(
        (l) => l.label.includes('Previous') || l.label.includes('&laquo;'),
    );
    const nextLink = paginationLinks?.find(
        (l) => l.label.includes('Next') || l.label.includes('&raquo;'),
    );
    const numericLinks = (paginationLinks || []).filter((l) => {
        const clean = l.label
            .replace('&laquo;', '')
            .replace('&raquo;', '')
            .trim();

        return !isNaN(Number(clean)) && clean !== '';
    });

    let visiblePages = numericLinks;
    let showStartEllipsis = false;
    let showEndEllipsis = false;

    if (numericLinks.length > 3) {
        let start = Math.max(1, currentPage - 1);
        let end = start + 2;

        if (end > lastPage) {
            end = lastPage;
            start = Math.max(1, end - 2);
        }

        visiblePages = numericLinks.filter((l) => {
            const pageNum = Number(
                l.label.replace('&laquo;', '').replace('&raquo;', '').trim(),
            );

            return pageNum >= start && pageNum <= end;
        });

        showStartEllipsis = start > 1;
        showEndEllipsis = end < lastPage;
    }

    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xs">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-foreground">
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
                                            <UserCheck className="size-3.5" />
                                            <span>
                                                {log.caused_by_user_name}
                                            </span>
                                        </div>
                                    </td>
                                    <td
                                        className="px-6 py-4 font-mono text-xs text-muted-foreground"
                                        suppressHydrationWarning
                                    >
                                        {new Date(
                                            log.timestamp,
                                        ).toLocaleString('id-ID')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            type="button"
                                            onClick={() => onSelectLog(log)}
                                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-500 transition hover:bg-amber-500/20"
                                        >
                                            <Eye className="size-3.5" /> View
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

            {/* Datatable Footer & Pagination Controls */}
            <div className="flex flex-col gap-3 border-t border-border bg-muted/20 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-muted-foreground">
                    {totalLogs > 0 ? (
                        <span>
                            Menampilkan{' '}
                            <strong className="font-semibold text-foreground">
                                {from}
                            </strong>{' '}
                            -{' '}
                            <strong className="font-semibold text-foreground">
                                {to}
                            </strong>{' '}
                            dari{' '}
                            <strong className="font-semibold text-foreground">
                                {totalLogs}
                            </strong>{' '}
                            log audit (Halaman {currentPage} dari {lastPage})
                        </span>
                    ) : (
                        <span>Menampilkan 0 log audit</span>
                    )}
                </div>

                {/* Pagination Page Links (Max 3 pages window + Icon Prev/Next) */}
                <div className="flex items-center gap-1.5">
                    {/* Prev Button */}
                    {prevLink?.url ? (
                        <Link
                            href={prevLink.url}
                            preserveScroll
                            preserveState
                            aria-label="Previous Page"
                            className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-2xs transition hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-500 enabled:cursor-pointer"
                        >
                            <ChevronLeft className="size-4.5 stroke-[2.5]" />
                        </Link>
                    ) : (
                        <span className="inline-flex size-9 cursor-not-allowed items-center justify-center rounded-lg border border-border/60 bg-muted/60 text-muted-foreground/40">
                            <ChevronLeft className="size-4.5 stroke-[2]" />
                        </span>
                    )}

                    {/* Start Ellipsis */}
                    {showStartEllipsis && (
                        <span className="inline-flex size-8 items-center justify-center font-mono text-xs font-bold text-muted-foreground select-none">
                            ...
                        </span>
                    )}

                    {/* Max 3 Page Buttons */}
                    {visiblePages.length > 0 ? (
                        visiblePages.map((link, idx) => {
                            const cleanLabel = link.label
                                .replace('&laquo;', '')
                                .replace('&raquo;', '')
                                .trim();

                            if (!link.url) {
                                return (
                                    <span
                                        key={idx}
                                        className="inline-flex size-9 cursor-not-allowed items-center justify-center rounded-lg border border-border/60 bg-muted/60 font-mono text-xs font-bold text-muted-foreground/40"
                                    >
                                        {cleanLabel}
                                    </span>
                                );
                            }

                            return (
                                <Link
                                    key={idx}
                                    href={link.url}
                                    preserveScroll
                                    preserveState
                                    className={`inline-flex size-9 items-center justify-center rounded-lg border font-mono text-xs font-bold transition enabled:cursor-pointer ${
                                        link.active
                                            ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                                            : 'border-border bg-card text-foreground shadow-2xs hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-500'
                                    }`}
                                >
                                    {cleanLabel}
                                </Link>
                            );
                        })
                    ) : (
                        <span className="inline-flex size-9 items-center justify-center rounded-lg border border-amber-600 bg-amber-600 font-mono text-xs font-bold text-white shadow-xs">
                            1
                        </span>
                    )}

                    {/* End Ellipsis */}
                    {showEndEllipsis && (
                        <span className="inline-flex size-8 items-center justify-center font-mono text-xs font-bold text-muted-foreground select-none">
                            ...
                        </span>
                    )}

                    {/* Next Button */}
                    {nextLink?.url ? (
                        <Link
                            href={nextLink.url}
                            preserveScroll
                            preserveState
                            aria-label="Next Page"
                            className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-2xs transition hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-500 enabled:cursor-pointer"
                        >
                            <ChevronRight className="size-4.5 stroke-[2.5]" />
                        </Link>
                    ) : (
                        <span className="inline-flex size-9 cursor-not-allowed items-center justify-center rounded-lg border border-border/60 bg-muted/60 text-muted-foreground/40">
                            <ChevronRight className="size-4.5 stroke-[2]" />
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
