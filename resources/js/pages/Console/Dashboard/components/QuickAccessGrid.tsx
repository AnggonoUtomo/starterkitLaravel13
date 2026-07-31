import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    Clock,
    Database,
    FileCode,
    FileText,
    FolderKanban,
    HardDrive,
    Layers,
    Menu,
    MessageSquare,
    Shield,
    Sliders,
    Users,
} from 'lucide-react';

export default function QuickAccessGrid() {
    const modules = [
        {
            name: 'User Management',
            description: 'Kelola daftar pengguna, peran & penyamaran akun',
            href: '/console/users',
            icon: Users,
            iconColor: 'text-emerald-500',
            borderColor: 'group-hover:border-emerald-500/50',
            bgColor: 'bg-emerald-500/10',
            badge: 'Active',
        },
        {
            name: 'Access Control',
            description: 'Matriks izin RBAC Spatie & manajemen role',
            href: '/console/access-control',
            icon: Shield,
            iconColor: 'text-indigo-500',
            borderColor: 'group-hover:border-indigo-500/50',
            bgColor: 'bg-indigo-500/10',
            badge: 'Active',
        },
        {
            name: 'System Settings',
            description: '10 Kategori pengaturan konfigurasi sistem',
            href: '/console/system-settings',
            icon: Sliders,
            iconColor: 'text-blue-500',
            borderColor: 'group-hover:border-blue-500/50',
            bgColor: 'bg-blue-500/10',
            badge: 'Active',
        },
        {
            name: 'Audit Logs',
            description: 'Pemantauan log aktivitas & peristiwa keamanan',
            href: '/console/audit-logs',
            icon: FileText,
            iconColor: 'text-amber-500',
            borderColor: 'group-hover:border-amber-500/50',
            bgColor: 'bg-amber-500/10',
            badge: 'Active',
        },
        {
            name: 'Menu Management',
            description: 'Pengelolaan menu navigasi dinamis & urutan',
            href: '/console/menus',
            icon: Menu,
            iconColor: 'text-teal-500',
            borderColor: 'group-hover:border-teal-500/50',
            bgColor: 'bg-teal-500/10',
            badge: 'Planned',
        },
        {
            name: 'Notifications',
            description: 'Pusat notifikasi in-app, broadcast & pesan',
            href: '/console/notifications',
            icon: MessageSquare,
            iconColor: 'text-purple-500',
            borderColor: 'group-hover:border-purple-500/50',
            bgColor: 'bg-purple-500/10',
            badge: 'Planned',
        },
        {
            name: 'Activity Logs',
            description: 'Pencatatan aktivitas detail & riwayat perubahan',
            href: '/console/activity-logs',
            icon: FileCode,
            iconColor: 'text-sky-500',
            borderColor: 'group-hover:border-sky-500/50',
            bgColor: 'bg-sky-500/10',
            badge: 'Planned',
        },
        {
            name: 'File Storage',
            description: 'Manajemen berkas & pemantauan penggunaan disk',
            href: '/console/file-storage',
            icon: HardDrive,
            iconColor: 'text-cyan-500',
            borderColor: 'group-hover:border-cyan-500/50',
            bgColor: 'bg-cyan-500/10',
            badge: 'Planned',
        },
        {
            name: 'Scheduler Task',
            description: 'Pemantauan & pemicu otomatis tugas terjadwal',
            href: '/console/scheduler',
            icon: Clock,
            iconColor: 'text-orange-500',
            borderColor: 'group-hover:border-orange-500/50',
            bgColor: 'bg-orange-500/10',
            badge: 'Planned',
        },
        {
            name: 'Queue Monitoring',
            description: 'Pemantauan antrean job & eksekusi ulang failed jobs',
            href: '/console/queues',
            icon: Layers,
            iconColor: 'text-rose-500',
            borderColor: 'group-hover:border-rose-500/50',
            bgColor: 'bg-rose-500/10',
            badge: 'Planned',
        },
        {
            name: 'Backup & Restore',
            description: 'Pencadangan & pemulihan basis data / berkas',
            href: '/console/backups',
            icon: Database,
            iconColor: 'text-amber-600',
            borderColor: 'group-hover:border-amber-600/50',
            bgColor: 'bg-amber-600/10',
            badge: 'Planned',
        },
    ];

    return (
        <div className="rounded-xl border border-sidebar-border bg-sidebar p-5 shadow-xs">
            <div className="flex items-center gap-2.5 border-b border-sidebar-border pb-4">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2 text-emerald-500">
                    <FolderKanban className="size-5" />
                </div>
                <div>
                    <h3 className="text-base font-bold text-foreground">Modul Console Admin</h3>
                    <p className="text-[12px] text-muted-foreground">
                        Pintasan cepat ke 10 submodule manajemen Console
                    </p>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {modules.map((mod) => {
                    const Icon = mod.icon;
                    const isPlanned = mod.badge === 'Planned';

                    return (
                        <Link
                            key={mod.name}
                            href={isPlanned ? '#' : mod.href}
                            className={`group relative flex flex-col justify-between rounded-xl border border-sidebar-border/80 bg-background/50 p-4 transition-all duration-200 hover:bg-background ${
                                isPlanned ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-xs'
                            } ${mod.borderColor}`}
                        >
                            <div>
                                <div className="flex items-center justify-between">
                                    <div className={`rounded-lg p-2 ${mod.bgColor}`}>
                                        <Icon className={`size-4.5 ${mod.iconColor}`} />
                                    </div>
                                    <span
                                        className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                                            isPlanned
                                                ? 'border-sidebar-border bg-sidebar text-muted-foreground'
                                                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
                                        }`}
                                    >
                                        {mod.badge}
                                    </span>
                                </div>
                                <h4 className="mt-3 text-sm font-bold text-foreground group-hover:text-emerald-500 transition-colors">
                                    {mod.name}
                                </h4>
                                <p className="mt-1 text-[12px] text-muted-foreground">
                                    {mod.description}
                                </p>
                            </div>

                            <div className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-muted-foreground group-hover:text-foreground">
                                <span>{isPlanned ? 'Segera Hadir' : 'Buka Modul'}</span>
                                {!isPlanned && (
                                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
