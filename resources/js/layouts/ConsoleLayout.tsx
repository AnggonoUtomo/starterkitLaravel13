import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    AlertCircle,
    CheckCircle2,
    Command,
    FileText,
    LayoutDashboard,
    LogOut,
    Monitor,
    Moon,
    PanelLeftClose,
    PanelLeftOpen,
    Settings,
    Shield,
    Sun,
    User,
    Users,
} from 'lucide-react';
import React, { useState } from 'react';
import CommandPalette from '@/components/CommandPalette';
import ImpersonationBanner from '@/components/ImpersonationBanner';
import ToastNotification from '@/components/ToastNotification';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAppearance } from '@/hooks/use-appearance';

interface Props {
    children: React.ReactNode;
}

interface SharedPageProps {
    [key: string]: unknown;
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
    const pageProps = usePage<SharedPageProps>();
    const { auth, flash } = pageProps.props;
    const url = pageProps.url;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { appearance, updateAppearance } = useAppearance();

    const navItems = [
        {
            name: 'User Management',
            href: '/console/users',
            icon: Users,
            iconColor: 'text-emerald-500',
            activeClass:
                'border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 font-semibold shadow-xs',
            active: url.startsWith('/console/users'),
        },
        {
            name: 'Access Control',
            href: '/console/access-control',
            icon: Shield,
            iconColor: 'text-indigo-500',
            activeClass:
                'border border-indigo-500/30 bg-indigo-500/10 text-indigo-500 font-semibold shadow-xs',
            active: url.startsWith('/console/access-control'),
        },
        {
            name: 'System Settings',
            href: '/console/system-settings',
            icon: Settings,
            iconColor: 'text-blue-500',
            activeClass:
                'border border-blue-500/30 bg-blue-500/10 text-blue-500 font-semibold shadow-xs',
            active: url.startsWith('/console/system-settings'),
        },
        {
            name: 'Audit Logs',
            href: '/console/audit-logs',
            icon: FileText,
            iconColor: 'text-amber-500',
            activeClass:
                'border border-amber-500/30 bg-amber-500/10 text-amber-500 font-semibold shadow-xs',
            active: url.startsWith('/console/audit-logs'),
        },
        {
            name: 'My Profile',
            href: '/console/profile',
            icon: User,
            iconColor: 'text-rose-500',
            activeClass:
                'border border-rose-500/30 bg-rose-500/10 text-rose-500 font-semibold shadow-xs',
            active: url.startsWith('/console/profile'),
        },
    ];

    return (
        <TooltipProvider delayDuration={0}>
            <div className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
                {/* Impersonation Alert Banner */}
                <ImpersonationBanner />

                {/* Real-time Toast Notifications */}
                <ToastNotification />

                {/* Top Navigation Bar */}
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-sidebar-border bg-sidebar/90 px-4 backdrop-blur">
                    <div className="flex items-center gap-3">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() =>
                                        setSidebarOpen((prev) => !prev)
                                    }
                                    className="cursor-pointer rounded-lg p-2 text-muted-foreground transition hover:bg-sidebar-accent hover:text-foreground"
                                    aria-label="Toggle Sidebar"
                                >
                                    {sidebarOpen ? (
                                        <PanelLeftClose className="h-5 w-5" />
                                    ) : (
                                        <PanelLeftOpen className="h-5 w-5" />
                                    )}
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                {sidebarOpen
                                    ? 'Collapse Sidebar'
                                    : 'Expand Sidebar'}
                            </TooltipContent>
                        </Tooltip>

                        <Link
                            href="/console/users"
                            className="flex items-center gap-2 text-lg font-bold tracking-tight text-emerald-500"
                        >
                            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-1.5">
                                <LayoutDashboard className="h-5 w-5 text-emerald-500" />
                            </div>
                            {sidebarOpen && <span>Console Admin</span>}
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Command Palette Trigger */}
                        <button
                            onClick={() => {
                                const event = new KeyboardEvent('keydown', {
                                    key: 'k',
                                    ctrlKey: true,
                                });
                                window.dispatchEvent(event);
                            }}
                            className="hidden cursor-pointer items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-sidebar-accent sm:inline-flex"
                        >
                            <Command className="h-3.5 w-3.5" />
                            <span>Search / Commands</span>
                            <kbd className="rounded border border-sidebar-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                                Ctrl K
                            </kbd>
                        </button>

                        {/* Theme Switcher Toggle */}
                        <div className="flex items-center rounded-lg border border-sidebar-border bg-background p-1">
                            <button
                                onClick={() => updateAppearance('dark')}
                                title="Dark Mode"
                                className={`cursor-pointer rounded-md p-1.5 text-xs transition ${
                                    appearance === 'dark'
                                        ? 'bg-sidebar text-amber-500 shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                <Moon className="h-3.5 w-3.5" />
                            </button>
                            <button
                                onClick={() => updateAppearance('light')}
                                title="Light Mode"
                                className={`cursor-pointer rounded-md p-1.5 text-xs transition ${
                                    appearance === 'light'
                                        ? 'bg-sidebar text-amber-500 shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                <Sun className="h-3.5 w-3.5" />
                            </button>
                            <button
                                onClick={() => updateAppearance('system')}
                                title="System Mode"
                                className={`cursor-pointer rounded-md p-1.5 text-xs transition ${
                                    appearance === 'system'
                                        ? 'bg-sidebar text-emerald-500 shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                <Monitor className="h-3.5 w-3.5" />
                            </button>
                        </div>

                        {/* User profile pill */}
                        {auth?.user && (
                            <div className="flex items-center gap-3 border-l border-sidebar-border pl-3">
                                <div className="hidden text-right sm:block">
                                    <div className="text-xs font-semibold text-foreground">
                                        {auth.user.name}
                                    </div>
                                    <div className="font-mono text-[10px] text-emerald-500">
                                        {auth.user.roles?.[0] || 'User'}
                                    </div>
                                </div>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="cursor-pointer rounded-lg p-2 text-muted-foreground transition hover:bg-sidebar-accent hover:text-rose-500"
                                    title="Logout"
                                >
                                    <LogOut className="h-4 w-4" />
                                </Link>
                            </div>
                        )}
                    </div>
                </header>

                <div className="flex flex-1">
                    {/* Fixed Sticky Sidebar Navigation with Independent Scrollbar */}
                    <aside
                        className={`sticky top-16 z-30 flex h-[calc(100vh-4rem)] shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out ${
                            sidebarOpen ? 'w-64' : 'w-16 items-center'
                        }`}
                    >
                        <div className="flex flex-1 scrollbar-thin flex-col gap-1 overflow-y-auto p-3">
                            {sidebarOpen && (
                                <div className="px-3 py-2 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                                    Console Modules
                                </div>
                            )}
                            {navItems.map((item) => {
                                const Icon = item.icon;

                                const linkElement = (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 rounded-lg text-sm font-medium transition ${
                                            sidebarOpen
                                                ? 'w-full justify-start px-3 py-2.5'
                                                : 'justify-center p-2.5'
                                        } ${
                                            item.active
                                                ? item.activeClass
                                                : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground'
                                        }`}
                                    >
                                        <Icon
                                            className={`h-5 w-5 shrink-0 transition-colors ${
                                                item.active
                                                    ? item.iconColor
                                                    : `${item.iconColor} opacity-75 group-hover:opacity-100`
                                            }`}
                                        />
                                        {sidebarOpen && (
                                            <span>{item.name}</span>
                                        )}
                                    </Link>
                                );

                                if (!sidebarOpen) {
                                    return (
                                        <Tooltip key={item.name}>
                                            <TooltipTrigger asChild>
                                                {linkElement}
                                            </TooltipTrigger>
                                            <TooltipContent side="right">
                                                {item.name}
                                            </TooltipContent>
                                        </Tooltip>
                                    );
                                }

                                return linkElement;
                            })}
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
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
        </TooltipProvider>
    );
}
