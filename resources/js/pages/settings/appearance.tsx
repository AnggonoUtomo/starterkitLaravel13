import { Head } from '@inertiajs/react';
import { CheckCircle2, Monitor, Moon, Sparkles, Sun } from 'lucide-react';
import React from 'react';
import { FieldInfoLabel } from '@/components/field-info-label';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useAppearance } from '@/hooks/use-appearance';
import type { Appearance } from '@/hooks/use-appearance';

export default function AppearancePage() {
    const { appearance, updateAppearance } = useAppearance();

    const modeOptions: {
        value: Appearance;
        title: string;
        description: string;
        icon: React.ComponentType<{ className?: string }>;
        accentColor: string;
        activeCardClass: string;
        renderPreview: () => React.ReactNode;
    }[] = [
        {
            value: 'light',
            title: 'Terang (Light)',
            description:
                'Tampilan bersih dan cerah yang memberikan kejelasan tinggi pada pencahayaan normal.',
            icon: Sun,
            accentColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
            activeCardClass:
                'border-amber-500/50 bg-amber-500/5 ring-2 ring-amber-500/20 shadow-xs',
            renderPreview: () => (
                <div className="relative flex h-20 w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 p-2 shadow-2xs">
                    {/* Mini Sidebar */}
                    <div className="flex w-1/3 flex-col gap-1 rounded-md border border-slate-200 bg-white p-1.5 shadow-2xs">
                        <div className="flex items-center gap-1">
                            <span className="size-2 rounded-full bg-amber-500" />
                            <span className="h-1.5 w-full rounded-full bg-slate-300" />
                        </div>
                        <div className="mt-1 h-1 w-full rounded-full bg-slate-200" />
                        <div className="h-1 w-2/3 rounded-full bg-slate-200" />
                    </div>
                    {/* Mini Main Content */}
                    <div className="ml-1.5 flex flex-1 flex-col justify-between">
                        <div className="flex h-3 w-full items-center rounded-md border border-slate-200 bg-white px-1.5 shadow-2xs">
                            <div className="h-1 w-1/3 rounded-full bg-slate-400" />
                        </div>
                        <div className="flex h-11 w-full flex-col justify-center gap-1 rounded-md border border-slate-200 bg-white p-1.5 shadow-2xs">
                            <div className="h-1.5 w-1/2 rounded-full bg-slate-400" />
                            <div className="h-1 w-3/4 rounded-full bg-slate-200" />
                        </div>
                    </div>
                </div>
            ),
        },
        {
            value: 'dark',
            title: 'Gelap (Dark)',
            description:
                'Tampilan gelap kontemporer yang memberikan kenyamanan ekstra untuk mata Anda.',
            icon: Moon,
            accentColor:
                'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
            activeCardClass:
                'border-indigo-500/50 bg-indigo-500/10 ring-2 ring-indigo-500/20 shadow-xs',
            renderPreview: () => (
                <div className="relative flex h-20 w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-950 p-2 shadow-2xs">
                    {/* Mini Sidebar */}
                    <div className="flex w-1/3 flex-col gap-1 rounded-md border border-slate-800 bg-slate-900 p-1.5 shadow-2xs">
                        <div className="flex items-center gap-1">
                            <span className="size-2 rounded-full bg-indigo-400" />
                            <span className="h-1.5 w-full rounded-full bg-slate-700" />
                        </div>
                        <div className="mt-1 h-1 w-full rounded-full bg-slate-800" />
                        <div className="h-1 w-2/3 rounded-full bg-slate-800" />
                    </div>
                    {/* Mini Main Content */}
                    <div className="ml-1.5 flex flex-1 flex-col justify-between">
                        <div className="flex h-3 w-full items-center rounded-md border border-slate-800 bg-slate-900 px-1.5 shadow-2xs">
                            <div className="h-1 w-1/3 rounded-full bg-slate-600" />
                        </div>
                        <div className="flex h-11 w-full flex-col justify-center gap-1 rounded-md border border-slate-800 bg-slate-900 p-1.5 shadow-2xs">
                            <div className="h-1.5 w-1/2 rounded-full bg-slate-600" />
                            <div className="h-1 w-3/4 rounded-full bg-slate-800" />
                        </div>
                    </div>
                </div>
            ),
        },
        {
            value: 'system',
            title: 'Sistem (System)',
            description:
                'Otomatis beralih antara Terang & Gelap mengikuti preferensi OS perangkat Anda.',
            icon: Monitor,
            accentColor:
                'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
            activeCardClass:
                'border-emerald-500/50 bg-emerald-500/10 ring-2 ring-emerald-500/20 shadow-xs',
            renderPreview: () => (
                <div className="relative flex h-20 w-full overflow-hidden rounded-lg border border-slate-300 bg-gradient-to-r from-slate-100 via-slate-400 to-slate-950 p-1 shadow-2xs dark:border-slate-700">
                    {/* Left Light Side */}
                    <div className="flex w-1/2 flex-col justify-between rounded-l-md border-r border-slate-300/80 bg-white/95 p-1.5 text-slate-800 shadow-2xs backdrop-blur-xs">
                        <div className="flex items-center gap-1">
                            <Sun className="size-3 text-amber-500" />
                            <span className="text-[10px] font-bold">Light</span>
                        </div>
                        <div className="h-1 w-3/4 rounded-full bg-slate-300" />
                    </div>
                    {/* Right Dark Side */}
                    <div className="flex w-1/2 flex-col justify-between rounded-r-md bg-slate-950/95 p-1.5 text-slate-100 shadow-2xs backdrop-blur-xs">
                        <div className="flex items-center justify-end gap-1">
                            <span className="text-[10px] font-bold">Dark</span>
                            <Moon className="size-3 text-indigo-400" />
                        </div>
                        <div className="h-1 w-3/4 self-end rounded-full bg-slate-700" />
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <Head title="Pengaturan Tampilan" />

            <Card className="min-w-0 overflow-hidden">
                <CardHeader className="border-b px-6 py-4">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                        <span className="flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                            <Sparkles className="size-4" />
                        </span>
                        Mode Antarmuka (Theme Mode)
                    </CardTitle>
                    <CardDescription className="text-xs">
                        Pilih mode tampilan antarmuka yang paling nyaman untuk
                        Anda.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-5 sm:p-6">
                    <div className="space-y-2">
                        <FieldInfoLabel
                            label="Pilihan Tema Aplikasi"
                            required
                            tooltip="Perubahan mode tema akan langsung memengaruhi seluruh tata letak antarmuka secara otomatis."
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {modeOptions.map((item) => {
                            const Icon = item.icon;
                            const isActive = appearance === item.value;

                            return (
                                <button
                                    key={item.value}
                                    type="button"
                                    onClick={() => updateAppearance(item.value)}
                                    className={`group relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 enabled:cursor-pointer ${
                                        isActive
                                            ? item.activeCardClass
                                            : 'border-border bg-card hover:border-border/80 hover:bg-muted/40'
                                    }`}
                                >
                                    <div className="space-y-3.5">
                                        {/* Dynamic UI Preview Box */}
                                        {item.renderPreview()}

                                        <div className="flex items-center justify-between gap-2 pt-1">
                                            <span className="flex items-center gap-2 text-xs font-bold text-foreground">
                                                <span
                                                    className={`flex size-6 items-center justify-center rounded-md border ${item.accentColor}`}
                                                >
                                                    <Icon className="size-3.5" />
                                                </span>
                                                {item.title}
                                            </span>
                                            {isActive && (
                                                <CheckCircle2
                                                    className={`size-4 shrink-0 ${
                                                        item.value === 'light'
                                                            ? 'text-amber-500'
                                                            : item.value ===
                                                                'dark'
                                                              ? 'text-indigo-400'
                                                              : 'text-emerald-500'
                                                    }`}
                                                />
                                            )}
                                        </div>

                                        <p className="line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
                                        <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                                            Status Tema
                                        </span>
                                        <Badge
                                            variant={
                                                isActive
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                            className="px-2 py-0 text-[10px]"
                                        >
                                            {isActive ? 'Aktif' : 'Pilih'}
                                        </Badge>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="rounded-lg border border-dashed bg-muted/20 p-4">
                        <div className="flex items-start gap-3">
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-500">
                                <Sparkles className="size-4" />
                            </span>
                            <div>
                                <p className="text-xs font-bold">
                                    Pintasan Mode Cepat
                                </p>
                                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                                    Anda juga dapat mengganti mode tampilan
                                    kapan saja melalui pemilih tema di navigasi
                                    atas (Header Nav) atau ikon sidebar footer.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
