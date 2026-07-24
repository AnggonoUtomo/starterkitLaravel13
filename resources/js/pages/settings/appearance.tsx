import { Head } from '@inertiajs/react';
import {
    CheckCircle2,
    Monitor,
    Moon,
    Palette,
    Sparkles,
    Sun,
} from 'lucide-react';
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
import type { Appearance, ColorTheme } from '@/hooks/use-appearance';

export default function AppearancePage() {
    const { appearance, updateAppearance, colorTheme, updateColorTheme } =
        useAppearance();

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
                    <div className="flex w-1/3 flex-col gap-1 rounded-md border border-slate-200 bg-white p-1.5 shadow-2xs">
                        <div className="flex items-center gap-1">
                            <span className="size-2 rounded-full bg-amber-500" />
                            <span className="h-1.5 w-full rounded-full bg-slate-300" />
                        </div>
                        <div className="mt-1 h-1 w-full rounded-full bg-slate-200" />
                        <div className="h-1 w-2/3 rounded-full bg-slate-200" />
                    </div>
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
                    <div className="flex w-1/3 flex-col gap-1 rounded-md border border-slate-800 bg-slate-900 p-1.5 shadow-2xs">
                        <div className="flex items-center gap-1">
                            <span className="size-2 rounded-full bg-indigo-400" />
                            <span className="h-1.5 w-full rounded-full bg-slate-700" />
                        </div>
                        <div className="mt-1 h-1 w-full rounded-full bg-slate-800" />
                        <div className="h-1 w-2/3 rounded-full bg-slate-800" />
                    </div>
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
                    <div className="flex w-1/2 flex-col justify-between rounded-l-md border-r border-slate-300/80 bg-white/95 p-1.5 text-slate-800 shadow-2xs backdrop-blur-xs">
                        <div className="flex items-center gap-1">
                            <Sun className="size-3 text-amber-500" />
                            <span className="text-[10px] font-bold">Light</span>
                        </div>
                        <div className="h-1 w-3/4 rounded-full bg-slate-300" />
                    </div>
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

    const colorThemeOptions: {
        value: ColorTheme;
        name: string;
        description: string;
        primaryBg: string;
        accentBg: string;
        borderHighlight: string;
    }[] = [
        {
            value: 'urban',
            name: 'Urban (Indigo)',
            description: 'Aksen indigo modern dan profesional.',
            primaryBg: 'bg-indigo-600 dark:bg-indigo-500',
            accentBg: 'bg-indigo-500/20 text-indigo-500',
            borderHighlight: 'border-indigo-500/50 ring-2 ring-indigo-500/20',
        },
        {
            value: 'saffron',
            name: 'Saffron (Amber Yellow)',
            description: 'Warna saffron hangat & ceria.',
            primaryBg: 'bg-amber-500',
            accentBg: 'bg-amber-500/20 text-amber-500',
            borderHighlight: 'border-amber-500/50 ring-2 ring-amber-500/20',
        },
        {
            value: 'ruby',
            name: 'Ruby (Crimson Red)',
            description: 'Aksen merah ruby berani dan elegan.',
            primaryBg: 'bg-rose-600 dark:bg-rose-500',
            accentBg: 'bg-rose-500/20 text-rose-500',
            borderHighlight: 'border-rose-500/50 ring-2 ring-rose-500/20',
        },
        {
            value: 'ocean',
            name: 'Ocean (Pacific Blue)',
            description: 'Warna biru samudra segar dan tenang.',
            primaryBg: 'bg-sky-500',
            accentBg: 'bg-sky-500/20 text-sky-500',
            borderHighlight: 'border-sky-500/50 ring-2 ring-sky-500/20',
        },
        {
            value: 'forest',
            name: 'Forest (Emerald Green)',
            description: 'Hijau zamrud alami dan sejuk.',
            primaryBg: 'bg-emerald-600 dark:bg-emerald-500',
            accentBg: 'bg-emerald-500/20 text-emerald-500',
            borderHighlight: 'border-emerald-500/50 ring-2 ring-emerald-500/20',
        },
        {
            value: 'plum',
            name: 'Plum (Purple Violet)',
            description: 'Ungu anggun dan berkelas.',
            primaryBg: 'bg-purple-600 dark:bg-purple-500',
            accentBg: 'bg-purple-500/20 text-purple-500',
            borderHighlight: 'border-purple-500/50 ring-2 ring-purple-500/20',
        },
        {
            value: 'copper',
            name: 'Copper (Terracotta)',
            description: 'Tembaga hangat & terrakota.',
            primaryBg: 'bg-orange-600 dark:bg-orange-500',
            accentBg: 'bg-orange-500/20 text-orange-500',
            borderHighlight: 'border-orange-500/50 ring-2 ring-orange-500/20',
        },
        {
            value: 'aurora',
            name: 'Aurora (Teal Cyan)',
            description: 'Kombinasi cyan & hijau aurora.',
            primaryBg: 'bg-teal-500',
            accentBg: 'bg-teal-500/20 text-teal-500',
            borderHighlight: 'border-teal-500/50 ring-2 ring-teal-500/20',
        },
        {
            value: 'harbor',
            name: 'Harbor (Navy Blue)',
            description: 'Biru navy tua klasik.',
            primaryBg: 'bg-blue-600 dark:bg-blue-500',
            accentBg: 'bg-blue-500/20 text-blue-500',
            borderHighlight: 'border-blue-500/50 ring-2 ring-blue-500/20',
        },
        {
            value: 'graphite',
            name: 'Graphite (Steel Gray)',
            description: 'Baja grafit netral & tegas.',
            primaryBg: 'bg-slate-700 dark:bg-slate-400',
            accentBg: 'bg-slate-500/20 text-slate-500',
            borderHighlight: 'border-slate-500/50 ring-2 ring-slate-500/20',
        },
        {
            value: 'mist',
            name: 'Mist (Mint Sage)',
            description: 'Hijau sage lembut & segar.',
            primaryBg: 'bg-lime-600 dark:bg-lime-500',
            accentBg: 'bg-lime-500/20 text-lime-500',
            borderHighlight: 'border-lime-500/50 ring-2 ring-lime-500/20',
        },
        {
            value: 'quartz',
            name: 'Quartz (Monochrome)',
            description: 'Monokrom minimalis & bersih.',
            primaryBg: 'bg-zinc-900 dark:bg-zinc-100',
            accentBg: 'bg-zinc-500/20 text-zinc-500',
            borderHighlight: 'border-zinc-500/50 ring-2 ring-zinc-500/20',
        },
    ];

    return (
        <div className="space-y-6">
            <Head title="Pengaturan Tampilan" />

            {/* Theme Mode Card */}
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
                            label="Pilihan Mode Tampilan"
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
                                            Status Mode
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
                </CardContent>
            </Card>

            {/* Global Color Theme Palette Card */}
            <Card className="min-w-0 overflow-hidden">
                <CardHeader className="border-b px-6 py-4">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                        <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                            <Palette className="size-4" />
                        </span>
                        Skema Warna Tema Global (Color Palette)
                    </CardTitle>
                    <CardDescription className="text-xs">
                        Pilih palet warna aksen global aplikasi (Saffron, Ruby,
                        Ocean, Forest, dll.) untuk mengubah seluruh komponen
                        aplikasi secara terpusat.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-5 sm:p-6">
                    <div className="space-y-2">
                        <FieldInfoLabel
                            label="Pilihan Preset Warna Aksen"
                            required
                            tooltip="Perubahan palet warna tema secara instan menginfeksi warna primary, button, badge, border, dan chart di seluruh aplikasi."
                        />
                    </div>

                    <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                        {colorThemeOptions.map((item) => {
                            const isSelected = colorTheme === item.value;

                            return (
                                <button
                                    key={item.value}
                                    type="button"
                                    onClick={() => updateColorTheme(item.value)}
                                    className={`group flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 enabled:cursor-pointer ${
                                        isSelected
                                            ? `${item.borderHighlight} bg-muted/60 shadow-xs`
                                            : 'border-border bg-card hover:border-border/80 hover:bg-muted/30'
                                    }`}
                                >
                                    <div
                                        className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg p-1 shadow-2xs ${item.primaryBg}`}
                                    >
                                        <span className="size-4 rounded-full bg-white/30 backdrop-blur-xs" />
                                    </div>

                                    <div className="min-w-0 flex-1 space-y-1">
                                        <div className="flex items-center justify-between gap-1">
                                            <span className="text-xs font-bold text-foreground">
                                                {item.name}
                                            </span>
                                            {isSelected && (
                                                <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                                            )}
                                        </div>

                                        <p className="line-clamp-2 text-[11px] leading-tight text-muted-foreground">
                                            {item.description}
                                        </p>

                                        <div className="pt-1">
                                            <span
                                                className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold ${item.accentBg}`}
                                            >
                                                data-theme=&quot;{item.value}
                                                &quot;
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
