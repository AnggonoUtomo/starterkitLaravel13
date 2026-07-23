import { router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Command,
    FileText,
    Search,
    Settings,
    Shield,
    User,
    Users,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface CommandItem {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    url: string;
}

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');

    const commands: CommandItem[] = [
        {
            id: 'users',
            title: 'User Management',
            description: 'Manage users, assign roles, and handle accounts',
            icon: <Users className="h-4 w-4 text-blue-500" />,
            url: '/console/users',
        },
        {
            id: 'rbac',
            title: 'Access Control (RBAC)',
            description: 'Manage roles and permission matrix',
            icon: <Shield className="h-4 w-4 text-indigo-500" />,
            url: '/console/access-control',
        },
        {
            id: 'settings',
            title: 'System Settings',
            description: 'Check system health and registered modules',
            icon: <Settings className="h-4 w-4 text-emerald-500" />,
            url: '/console/system-settings',
        },
        {
            id: 'audit',
            title: 'Audit Logs',
            description: 'Inspect system events and domain activity logs',
            icon: <FileText className="h-4 w-4 text-amber-500" />,
            url: '/console/audit-logs',
        },
        {
            id: 'profile',
            title: 'My Profile',
            description: 'Manage profile info and account security',
            icon: <User className="h-4 w-4 text-emerald-500" />,
            url: '/console/profile',
        },
    ];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }

            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const filtered = commands.filter(
        (c) =>
            c.title.toLowerCase().includes(query.toLowerCase()) ||
            c.description.toLowerCase().includes(query.toLowerCase()),
    );

    const handleSelect = (url: string) => {
        setIsOpen(false);
        setQuery('');
        router.visit(url);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 px-4 pt-20 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div className="flex items-center border-b border-slate-200 px-4 dark:border-slate-800">
                            <Search className="mr-2 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Type a command or search module (e.g. users, rbac)..."
                                className="w-full bg-transparent py-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none dark:text-slate-100"
                                autoFocus
                            />
                            <kbd className="hidden items-center gap-1 rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs text-slate-400 sm:inline-flex dark:border-slate-700 dark:bg-slate-800">
                                <Command className="h-3 w-3" /> ESC
                            </kbd>
                        </div>

                        <div className="max-h-80 overflow-y-auto p-2">
                            {filtered.length > 0 ? (
                                filtered.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleSelect(item.url)}
                                        className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800/80"
                                    >
                                        <div className="rounded-md bg-slate-100 p-2 dark:bg-slate-800">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                                                {item.title}
                                            </div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                                {item.description}
                                            </div>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="p-6 text-center text-sm text-slate-500">
                                    No commands found matching "{query}"
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
