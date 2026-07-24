import { Search } from 'lucide-react';
import React from 'react';

interface ConsoleFilterBarProps {
    search: string;
    onSearchChange: (value: string) => void;
    onSubmit?: (e: React.FormEvent) => void;
    placeholder?: string;
    totalCount?: number;
    totalCountLabel?: string;
    focusColorClass?: string;
}

export default function ConsoleFilterBar({
    search,
    onSearchChange,
    onSubmit,
    placeholder = 'Search...',
    totalCount,
    totalCountLabel = 'Total Records',
    focusColorClass = 'focus:ring-indigo-500',
}: ConsoleFilterBarProps) {
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (onSubmit) {
            onSubmit(e);
        }
    };

    return (
        <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-sm">
            <form
                onSubmit={handleFormSubmit}
                className="relative w-full max-w-md"
            >
                <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full rounded-lg border border-border bg-background py-2 pr-4 pl-9 text-sm text-foreground transition outline-none focus:ring-2 ${focusColorClass}`}
                />
            </form>
            {typeof totalCount === 'number' && (
                <div className="font-mono text-xs font-medium text-muted-foreground">
                    {totalCountLabel}: {totalCount}
                </div>
            )}
        </div>
    );
}
