import { Link, router } from '@inertiajs/react';
import {
    User,
    Settings,
    LogOut,
    Palette,
    Shield,
    ChevronDown,
} from 'lucide-react';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useInitials } from '@/hooks/use-initials';

interface UserHeaderDropdownProps {
    user: {
        name: string;
        email: string;
        avatar?: string;
        roles?: string[];
    };
}

export default function UserHeaderDropdown({ user }: UserHeaderDropdownProps) {
    const getInitials = useInitials();
    const initials = getInitials(user.name);
    const primaryRole = user.roles?.[0] || 'Administrator';

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <TooltipProvider>
            <DropdownMenu>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="group flex items-center gap-2 rounded-full border border-border/80 bg-background p-1 shadow-xs transition-all duration-200 hover:border-emerald-500/50 hover:bg-muted/50 focus:ring-2 focus:ring-emerald-500/30 focus:outline-none enabled:cursor-pointer"
                            >
                                <div className="relative">
                                    <Avatar className="size-8.5 rounded-full border border-emerald-500/30 shadow-2xs transition group-hover:scale-105">
                                        <AvatarImage
                                            src={user.avatar}
                                            alt={user.name}
                                        />
                                        <AvatarFallback className="rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-500">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-background bg-emerald-500" />
                                </div>
                                <ChevronDown className="mr-1 size-3.5 text-muted-foreground transition group-hover:text-foreground" />
                            </button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        Profil & Pengaturan Akun ({user.name})
                    </TooltipContent>
                </Tooltip>

                <DropdownMenuContent
                    className="w-72 overflow-hidden rounded-xl border border-border bg-card p-0 shadow-xl"
                    align="end"
                    sideOffset={8}
                >
                    {/* Header Card Information */}
                    <div className="border-b border-border/60 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent p-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="size-12 rounded-full border-2 border-emerald-500/40 shadow-xs">
                                <AvatarImage
                                    src={user.avatar}
                                    alt={user.name}
                                />
                                <AvatarFallback className="rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-500">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex min-w-0 flex-1 flex-col">
                                <h4 className="truncate text-xs font-bold text-foreground">
                                    {user.name}
                                </h4>
                                <p className="truncate text-[11px] font-medium text-muted-foreground">
                                    {user.email}
                                </p>
                                <div className="mt-1.5 flex items-center gap-1">
                                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-500">
                                        <Shield className="size-3" />
                                        {primaryRole}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Items Group */}
                    <div className="p-1.5">
                        <DropdownMenuGroup className="space-y-0.5">
                            <DropdownMenuItem asChild>
                                <Link
                                    href="/console/profile"
                                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground transition hover:bg-emerald-500/10 hover:text-emerald-500 enabled:cursor-pointer"
                                >
                                    <User className="size-4 text-emerald-500" />
                                    <span>Profil Saya</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </div>

                    <DropdownMenuSeparator className="my-0 border-border/60" />

                    {/* Card Footer: Setting, Appearance, Logout */}
                    <div className="flex items-center justify-between gap-1 border-t border-border bg-muted/30 p-2">
                        {/* Settings Button */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/console/system-settings"
                                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border/60 bg-background px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-2xs transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-500 enabled:cursor-pointer"
                                >
                                    <Settings className="size-3.5 text-blue-500" />
                                    <span>Setting</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                Pengaturan Sistem
                            </TooltipContent>
                        </Tooltip>

                        {/* Appearance Button */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/settings/appearance"
                                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border/60 bg-background px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-2xs transition hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-500 enabled:cursor-pointer"
                                >
                                    <Palette className="size-3.5 text-amber-500" />
                                    <span>Appearance</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                Tampilan & Tema
                            </TooltipContent>
                        </Tooltip>

                        {/* Logout Button */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex items-center justify-center rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1.5 text-xs font-semibold text-rose-500 shadow-2xs transition hover:bg-rose-500/20 enabled:cursor-pointer"
                                >
                                    <LogOut className="size-3.5" />
                                    <span className="sr-only">Logout</span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                Keluar (Logout)
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </TooltipProvider>
    );
}
