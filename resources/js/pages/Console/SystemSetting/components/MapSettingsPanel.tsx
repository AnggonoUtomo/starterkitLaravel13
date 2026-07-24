import type { InertiaFormProps } from '@inertiajs/react';
import { CheckCircle2, Map, Save, Send } from 'lucide-react';
import type { FormEvent } from 'react';
import { FieldInfoLabel } from '@/components/field-info-label';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import type { MapSettingForm, MapSettings } from '../types';

type Props = {
    can: { update: boolean };
    mapSettings: MapSettings;
    form: InertiaFormProps<MapSettingForm>;
    submit: (event: FormEvent) => void;
};

export function MapSettingsPanel({ can, mapSettings, form, submit }: Props) {
    return (
        <TooltipProvider>
            <Card data-dashboard-card className="min-w-0 overflow-hidden">
                <CardHeader className="border-b px-6 py-4">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <Map className="size-5" />
                        </span>
                        Google Maps Integration
                    </CardTitle>
                    <CardDescription className="text-xs">
                        Konfigurasi peta untuk modul yang membutuhkan titik
                        lokasi, geofencing, atau preview area.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-5 sm:p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-4 lg:grid-cols-3">
                            <SummaryTile
                                label="Status Map"
                                value={form.data.enabled ? 'Aktif' : 'Nonaktif'}
                            />
                            <SummaryTile
                                label="API Key"
                                value={
                                    mapSettings.configured
                                        ? 'Tersimpan'
                                        : 'Belum diisi'
                                }
                            />
                            <SummaryTile
                                label="Map ID"
                                value={
                                    form.data.google_maps_map_id || 'Opsional'
                                }
                            />
                        </div>

                        <label className="flex cursor-pointer items-start gap-3 rounded-lg border bg-muted/20 p-4">
                            <Checkbox
                                checked={form.data.enabled}
                                disabled={!can.update || form.processing}
                                onCheckedChange={(checked) =>
                                    form.setData('enabled', Boolean(checked))
                                }
                            />
                            <span>
                                <span className="flex items-center gap-2 text-xs font-bold">
                                    Aktifkan Google Maps
                                    {mapSettings.configured && (
                                        <Badge
                                            variant="secondary"
                                            className="text-[10px]"
                                        >
                                            Configured
                                        </Badge>
                                    )}
                                </span>
                                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                                    Jika aktif dan API Key tersedia, modul
                                    lokasi dapat menampilkan map interaktif.
                                </span>
                            </span>
                        </label>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <FieldInfoLabel
                                    htmlFor="google_maps_api_key"
                                    label="Google Maps API Key"
                                    tooltip="API Key Google Maps JavaScript API. Key ini dipakai frontend untuk memuat peta."
                                />
                                <Input
                                    id="google_maps_api_key"
                                    type="password"
                                    value={form.data.google_maps_api_key}
                                    disabled={!can.update || form.processing}
                                    placeholder={
                                        mapSettings.configured
                                            ? 'API Key sudah tersimpan'
                                            : 'AIza...'
                                    }
                                    onChange={(event) =>
                                        form.setData(
                                            'google_maps_api_key',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={form.errors.google_maps_api_key}
                                />
                            </div>

                            <div className="space-y-2">
                                <FieldInfoLabel
                                    htmlFor="google_maps_map_id"
                                    label="Google Maps Map ID"
                                    tooltip="Map ID Google untuk styling vector map atau Advanced Marker. Kosongkan jika belum memakai style custom."
                                />
                                <Input
                                    id="google_maps_map_id"
                                    value={form.data.google_maps_map_id}
                                    disabled={!can.update || form.processing}
                                    placeholder="Contoh: 8f348e..."
                                    onChange={(event) =>
                                        form.setData(
                                            'google_maps_map_id',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={form.errors.google_maps_map_id}
                                />
                            </div>
                        </div>

                        <div className="rounded-lg border border-dashed bg-muted/20 p-4">
                            <div className="flex items-start gap-3">
                                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                    <CheckCircle2 className="size-4" />
                                </span>
                                <div>
                                    <p className="text-xs font-bold">
                                        Dipakai Modul Lokasi
                                    </p>
                                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                                        Konfigurasi ini digunakan untuk memilih
                                        latitude dan longitude pada modul
                                        geofencing & lokasi kantor.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end border-t pt-4">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        type="submit"
                                        disabled={
                                            !can.update || form.processing
                                        }
                                        className="h-10 min-w-40 enabled:cursor-pointer"
                                    >
                                        {form.processing ? (
                                            <>
                                                <Send className="size-4 animate-pulse" />
                                                Menyimpan...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="size-4" />
                                                Simpan Maps
                                            </>
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Simpan API Key dan Map ID Google Maps
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </TooltipProvider>
    );
}

function SummaryTile({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {
    return (
        <div className="rounded-lg border bg-muted/20 p-4">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 truncate text-base font-bold">{value}</p>
        </div>
    );
}
