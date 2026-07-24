import {
    Clock3,
    HeartPulse,
    KeyRound,
    ListFilter,
    Mail,
    Map,
    Palette,
    Power,
    Server,
    ShieldAlert,
} from 'lucide-react';
import type { ComponentType } from 'react';
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
    return (
        <Card data-dashboard-card className="h-fit overflow-hidden">
            <CardHeader className="border-b px-4 py-3.5">
                <CardTitle className="text-sm font-bold">
                    Menu System Setting
                </CardTitle>
                <CardDescription className="text-xs">
                    Pilih kategori konfigurasi sistem yang ingin dikelola.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1.5 p-2">
                {menuItems.map((item) => {
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
                                <span className="mt-0.5 line-clamp-1 block text-[11px] leading-tight text-muted-foreground">
                                    {item.description}
                                </span>
                            </span>
                        </button>
                    );
                })}
            </CardContent>
        </Card>
    );
}
