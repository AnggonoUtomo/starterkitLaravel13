import type { InertiaFormProps } from '@inertiajs/react';
import { Clock3, Save, Send } from 'lucide-react';
import type { FormEvent } from 'react';
import { FieldInfoLabel } from '@/components/field-info-label';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {
    dateFormatOptions,
    timeFormatOptions,
    timezoneOptions,
} from '../options';
import type { LocalizationForm, LocalizationSettings } from '../types';

type Props = {
    can: { update: boolean };
    localizationSettings: LocalizationSettings;
    form: InertiaFormProps<LocalizationForm>;
    submit: (event: FormEvent) => void;
};

export function LocalizationSettingsPanel({
    can,
    localizationSettings,
    form,
    submit,
}: Props) {
    return (
        <TooltipProvider>
            <Card data-dashboard-card className="min-w-0 overflow-hidden">
                <CardHeader className="border-b px-6 py-4">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            <Clock3 className="size-5" />
                        </span>
                        Timezone & Format Tanggal
                    </CardTitle>
                    <CardDescription className="text-xs">
                        Atur zona waktu dan format tampilan tanggal untuk
                        aplikasi.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-5 sm:p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-4 lg:grid-cols-3">
                            <SummaryTile
                                label="Tanggal"
                                value={localizationSettings.preview_date}
                            />
                            <SummaryTile
                                label="Jam"
                                value={localizationSettings.preview_time}
                            />
                            <SummaryTile
                                label="Timezone Aktif"
                                value={localizationSettings.timezone}
                            />
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                            <div className="space-y-2">
                                <FieldInfoLabel
                                    label="Timezone Utama"
                                    required
                                    tooltip="Zona waktu utama aplikasi. Ini memengaruhi tanggal/jam runtime setelah disimpan."
                                />
                                <Select
                                    value={form.data.timezone}
                                    onValueChange={(value) =>
                                        form.setData('timezone', value)
                                    }
                                    disabled={!can.update || form.processing}
                                >
                                    <SelectTrigger className="enabled:cursor-pointer">
                                        <SelectValue placeholder="Pilih timezone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timezoneOptions.map((timezone) => (
                                            <SelectItem
                                                key={timezone}
                                                value={timezone}
                                            >
                                                {timezone}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={form.errors.timezone} />
                            </div>

                            <div className="space-y-2">
                                <FieldInfoLabel
                                    label="Preview Format Aktif"
                                    tooltip="Gabungan format tanggal dan jam yang akan dipakai sebagai default tampilan."
                                />
                                <div className="flex min-h-10 items-center rounded-md border border-input bg-muted/40 px-3 font-mono text-xs">
                                    {localizationSettings.preview_datetime}
                                </div>
                            </div>

                            <FormatSelect
                                label="Format Tanggal"
                                description="Format tanggal default untuk tabel, detail, dan laporan."
                                value={form.data.date_format}
                                disabled={!can.update || form.processing}
                                options={dateFormatOptions}
                                error={form.errors.date_format}
                                onChange={(value) =>
                                    form.setData('date_format', value)
                                }
                            />
                            <FormatSelect
                                label="Format Jam"
                                description="Format jam default, 24 jam atau 12 jam dengan AM/PM."
                                value={form.data.time_format}
                                disabled={!can.update || form.processing}
                                options={timeFormatOptions}
                                error={form.errors.time_format}
                                onChange={(value) =>
                                    form.setData('time_format', value)
                                }
                            />
                        </div>

                        <div className="rounded-lg border border-dashed bg-muted/20 p-4">
                            <div className="flex items-start gap-3">
                                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                                    <Clock3 className="size-4" />
                                </span>
                                <div>
                                    <p className="text-xs font-bold">
                                        Format Tersimpan
                                    </p>
                                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                                        Format aktif saat ini adalah{' '}
                                        <span className="font-semibold">
                                            {
                                                localizationSettings.datetime_format
                                            }
                                        </span>
                                        . Setelah disimpan, modul lain dapat
                                        membaca format ini.
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
                                        className="h-10 min-w-44 enabled:cursor-pointer"
                                    >
                                        {form.processing ? (
                                            <>
                                                <Send className="size-4 animate-pulse" />
                                                Menyimpan...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="size-4" />
                                                Simpan Timezone
                                            </>
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Simpan pengaturan timezone & format tanggal
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </TooltipProvider>
    );
}

function SummaryTile({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg border bg-muted/20 p-4">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 text-base font-bold">{value}</p>
        </div>
    );
}

function FormatSelect({
    label,
    description,
    value,
    disabled,
    options,
    error,
    onChange,
}: {
    label: string;
    description: string;
    value: string;
    disabled: boolean;
    options: { value: string; label: string }[];
    error?: string;
    onChange: (value: string) => void;
}) {
    return (
        <div className="space-y-2">
            <FieldInfoLabel label={label} required tooltip={description} />
            <Select value={value} onValueChange={onChange} disabled={disabled}>
                <SelectTrigger className="enabled:cursor-pointer">
                    <SelectValue placeholder={`Pilih ${label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <InputError message={error} />
        </div>
    );
}
