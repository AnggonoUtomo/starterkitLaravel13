import { Link, usePage } from '@inertiajs/react';
import { KeyRound, Palette, UserCircle } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import ConsoleLayout from '@/layouts/ConsoleLayout';

type MenuItem = {
    title: string;
    description: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    activeClass: string;
};

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { url } = usePage();

    const menuItems: MenuItem[] = [
        {
            title: 'Profil Saya',
            description: 'Kelola informasi profil pengguna dan alamat email.',
            href: '/settings/profile',
            icon: UserCircle,
            color: 'text-rose-500 dark:text-rose-400',
            activeClass:
                'border-rose-500/40 bg-rose-500/10 text-rose-500 font-semibold shadow-xs',
        },
        {
            title: 'Kata Sandi & Keamanan',
            description: 'Ubah kata sandi, otentikasi 2-faktor, dan passkeys.',
            href: '/settings/security',
            icon: KeyRound,
            color: 'text-amber-500 dark:text-amber-400',
            activeClass:
                'border-amber-500/40 bg-amber-500/10 text-amber-500 font-semibold shadow-xs',
        },
        {
            title: 'Tampilan & Tema',
            description: 'Pilih mode tampilan antarmuka (Light, Dark, System).',
            href: '/settings/appearance',
            icon: Palette,
            color: 'text-indigo-500 dark:text-indigo-400',
            activeClass:
                'border-indigo-500/40 bg-indigo-500/10 text-indigo-500 font-semibold shadow-xs',
        },
    ];

    return (
        <ConsoleLayout>
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6">
                {/* Header Submodul Settings */}
                <div className="flex flex-col gap-1 border-b pb-4">
                    <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
                        <UserCircle className="size-6 text-emerald-500" />
                        <span>Pengaturan Akun & Keamanan</span>
                    </h1>
                    <p className="text-xs text-muted-foreground">
                        Kelola data profil pribadi, keamanan kata sandi, dan
                        preferensi visual antarmuka.
                    </p>
                </div>

                {/* Split View Workspace Grid */}
                <div className="grid gap-6 lg:grid-cols-4">
                    {/* Sisi Kiri (1-Col): Menu Card */}
                    <div className="lg:col-span-1">
                        <Card className="h-fit overflow-hidden">
                            <CardHeader className="border-b px-4 py-3.5">
                                <CardTitle className="text-sm font-bold">
                                    Menu Pengaturan
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    Pilih kategori pengaturan akun.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-1.5 p-2">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    const active = url.startsWith(item.href);

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={
                                                active
                                                    ? `flex w-full items-start gap-3 rounded-lg border p-2.5 text-left transition enabled:cursor-pointer ${item.activeClass}`
                                                    : 'flex w-full items-start gap-3 rounded-lg border border-transparent p-2.5 text-left transition hover:bg-muted/60 enabled:cursor-pointer'
                                            }
                                        >
                                            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted/40">
                                                <Icon
                                                    className={`size-4 ${item.color}`}
                                                />
                                            </span>
                                            <span className="min-w-0">
                                                <span className="block text-xs font-bold text-foreground">
                                                    {item.title}
                                                </span>
                                                <span className="mt-0.5 line-clamp-1 block text-[11px] leading-tight text-muted-foreground">
                                                    {item.description}
                                                </span>
                                            </span>
                                        </Link>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sisi Kanan (3-Cols): Option Workspace Content Card */}
                    <div className="min-w-0 lg:col-span-3">{children}</div>
                </div>
            </div>
        </ConsoleLayout>
    );
}
