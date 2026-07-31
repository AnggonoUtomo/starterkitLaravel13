import { usePage } from '@inertiajs/react';
import {
    Clock3,
    HeartPulse,
    KeyRound,
    ListFilter,
    Mail,
    Map,
    Palette,
    Power,
    Search,
    Server,
    ShieldAlert,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { useState, useMemo } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { SystemSettingSection } from '../types';

type MenuItem = {
    key: SystemSettingSection;
    title: string;
    description: string;
    icon: ComponentType<{ className?: string }>;
    color: string;
};

const menuItems: MenuItem[] = [
    {
        key: 'email',
        title: 'Email & SMTP',
        description:
            'Konfigurasi pengiriman email, aktivasi user, dan tautan atur password.',
        icon: Mail,
        color: 'text-sky-500 dark:text-sky-400',
    },
    {
        key: 'branding',
        title: 'App Name & Logo',
        description: 'Ubah nama aplikasi, logo utama, dan favicon.',
        icon: Palette,
        color: 'text-rose-500 dark:text-rose-400',
    },
    {
        key: 'localization',
        title: 'Timezone & Date',
        description:
            'Atur zona waktu, format tanggal, dan format jam aplikasi.',
        icon: Clock3,
        color: 'text-indigo-500 dark:text-indigo-400',
    },
    {
        key: 'pagination',
        title: 'Default Pagination',
        description: 'Atur default row dan opsi jumlah row pada tabel.',
        icon: ListFilter,
        color: 'text-emerald-500 dark:text-emerald-400',
    },
    {
        key: 'security',
        title: 'Security Policy',
        description:
            'Atur session, login throttle, dan kontrol keamanan global.',
        icon: ShieldAlert,
        color: 'text-rose-500 dark:text-rose-400',
    },
    {
        key: 'password',
        title: 'Password Policy',
        description: 'Atur kekuatan password dan siklus keamanan akun.',
        icon: KeyRound,
        color: 'text-indigo-500 dark:text-indigo-400',
    },
    {
        key: 'maintenance',
        title: 'Maintenance Mode',
        description: 'Aktifkan mode perawatan dan secret bypass.',
        icon: Power,
        color: 'text-amber-500 dark:text-amber-400',
    },
    {
        key: 'map',
        title: 'Google Maps',
        description: 'Simpan API Key dan Map ID untuk modul yang memakai peta.',
        icon: Map,
        color: 'text-emerald-500 dark:text-emerald-400',
    },
    {
        key: 'health',
        title: 'System Health',
        description:
            'Cek database, cache, queue, storage, mail, dan runtime aplikasi.',
        icon: HeartPulse,
        color: 'text-emerald-500 dark:text-emerald-400',
    },
    {
        key: 'environment',
        title: 'Environment Info',
        description:
            'Lihat environment, driver, path, dan extension PHP secara read-only.',
        icon: Server,
        color: 'text-sky-500 dark:text-sky-400',
    },
];

type Props = {
    activeSection: SystemSettingSection;
    onSectionChange: (section: SystemSettingSection) => void;
};

export function SystemSettingMenu({ activeSection, onSectionChange }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const { props: pageProps } = usePage<{ pagination?: { min_search_chars?: number } }>();
    const minSearchChars = pageProps.pagination?.min_search_chars ?? 3;

    const filteredMenuItems = useMemo(() => {
        const term = searchQuery.trim().toLowerCase();

        if (!term || (term.length > 0 && term.length < minSearchChars)) {
            return menuItems;
        }

        return menuItems.filter(
            (item) =>
                item.title.toLowerCase().includes(term) ||
                item.description.toLowerCase().includes(term) ||
                item.key.toLowerCase().includes(term),
        );
    }, [searchQuery, minSearchChars]);

    return (
        <Card data-dashboard-card className="h-fit overflow-hidden">
            <CardHeader className="border-b px-4 py-3.5">
                <div className="flex items-center justify-between gap-2">
                    <div>
                        <CardTitle className="text-sm font-bold">
                            Menu System Setting
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Pilih kategori konfigurasi sistem yang ingin dikelola.
                        </CardDescription>
                    </div>
                </div>

                {/* Dynamic Search Filter Bar */}
                <div className="relative mt-2.5">
                    <Search className="absolute top-2.5 left-2.5 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari menu setting..."
                        className="w-full rounded-md border border-border bg-background py-1.5 pr-2.5 pl-8 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
            </CardHeader>
            <CardContent className="space-y-1.5 p-2">
                {filteredMenuItems.length === 0 ? (
                    <div className="py-6 text-center text-xs text-muted-foreground">
                        Tidak ada menu setting yang cocok.
                    </div>
                ) : (
                    filteredMenuItems.map((item) => {
                        const Icon = item.icon;
                        const active = activeSection === item.key;

                        return (
                            <button
                                key={item.key}
                                type="button"
                                onClick={() => onSectionChange(item.key)}
                                className={
                                    active
                                        ? 'flex w-full items-start gap-3 rounded-lg border border-primary/40 bg-primary/10 p-2.5 text-left text-primary transition enabled:cursor-pointer'
                                        : 'flex w-full items-start gap-3 rounded-lg border border-transparent p-2.5 text-left transition hover:bg-muted/60 enabled:cursor-pointer'
                                }
                            >
                                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted/40">
                                    <Icon className={`size-4 ${item.color}`} />
                                </span>
                                <span className="min-w-0">
                                    <span className="block text-xs font-bold">
                                        {item.title}
                                    </span>
                                    <span className="mt-0.5 line-clamp-1 block text-[12px] leading-tight text-muted-foreground">
                                        {item.description}
                                    </span>
                                </span>
                            </button>
                        );
                    })
                )}
            </CardContent>
        </Card>
    );
}
