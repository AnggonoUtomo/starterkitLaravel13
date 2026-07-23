import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Shield,
    Settings,
    Command,
    Menu,
    X,
    LogOut,
    CheckCircle2,
    AlertCircle,
} from 'lucide-react';
import React, { useState } from 'react';
import CommandPalette from '@/components/CommandPalette';
import ImpersonationBanner from '@/components/ImpersonationBanner';

interface Props {
    children: React.ReactNode;
}

interface SharedPageProps {
    auth?: {
        user?: {
            name: string;
            email: string;
            roles?: string[];
        } | null;
    };
    flash?: {
        success?: string | null;
        error?: string | null;
    };
}

export default function ConsoleLayout({ children }: Props) {
    const { auth, flash, url } = usePage<SharedPageProps & { url: string }>()
        .props;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        {
            name: 'User Management',
            href: '/console/users',
            icon: Users,
            active: url.startsWith('/console/users'),
        },
        {
            name: 'Access Control',
            href: '/console/access-control',
            icon: Shield,
            active: url.startsWith('/console/access-control'),
        },
        {
            name: 'System Settings',
            href: '/console/system-settings',
            icon: Settings,
            active: url.startsWith('/console/system-settings'),
        },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-slate-950 font-sans text-slate-100 antialiased">
            {/* Impersonation Alert Banner */}
            <ImpersonationBanner />

            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 backdrop-blur">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSidebarOpen((prev) => !prev)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
                    >
                        {sidebarOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>

                    <Link
                        href="/console/users"
                        className="flex items-center gap-2 text-lg font-bold tracking-tight text-emerald-400"
                    >
                        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-1.5">
                            <LayoutDashboard className="h-5 w-5 text-emerald-400" />
                        </div>
                        <span>Console Admin</span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {/* Command Palette Trigger */}
                    <button
                        onClick={() => {
                            const event = new KeyboardEvent('keydown', {
                                key: 'k',
                                ctrlKey: true,
                            });
                            window.dispatchEvent(event);
                        }}
                        className="hidden items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-400 transition hover:bg-slate-800 sm:inline-flex"
                    >
                        <Command className="h-3.5 w-3.5" />
                        <span>Search / Commands</span>
                        <kbd className="rounded border border-slate-700 bg-slate-900 px-1.5 py-0.5 font-mono text-[10px]">
                            Ctrl K
                        </kbd>
                    </button>

                    {/* User profile pill */}
                    {auth?.user && (
                        <div className="flex items-center gap-3 border-l border-slate-800 pl-3">
                            <div className="hidden text-right sm:block">
                                <div className="text-xs font-semibold text-slate-200">
                                    {auth.user.name}
                                </div>
                                <div className="font-mono text-[10px] text-emerald-400">
                                    {auth.user.roles?.[0] || 'User'}
                                </div>
                            </div>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-rose-400"
                                title="Logout"
                            >
                                <LogOut className="h-4 w-4" />
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar Navigation */}
                {sidebarOpen && (
                    <aside className="flex w-64 shrink-0 flex-col gap-1 border-r border-slate-800 bg-slate-900/50 p-4">
                        <div className="px-3 py-2 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                            Console Modules
                        </div>
                        {navItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                                        item.active
                                            ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                                            : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </aside>
                )}

                {/* Main Content Area */}
                <div className="flex flex-1 flex-col overflow-x-hidden">
                    {/* Flash messages */}
                    {flash?.success && (
                        <div className="m-4 mb-0 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-950/60 p-3 text-sm text-emerald-300">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                            <span>{flash.success}</span>
                        </div>
                    )}

                    {flash?.error && (
                        <div className="m-4 mb-0 flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-950/60 p-3 text-sm text-rose-300">
                            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                            <span>{flash.error}</span>
                        </div>
                    )}

                    <motion.main
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1"
                    >
                        {children}
                    </motion.main>
                </div>
            </div>

            {/* Global Command Palette */}
            <CommandPalette />
        </div>
    );
}
