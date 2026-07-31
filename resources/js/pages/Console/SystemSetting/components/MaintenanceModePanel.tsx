import type { InertiaFormProps } from '@inertiajs/react';
import { Power, Save, Send } from 'lucide-react';
import type { Dispatch, FormEvent, SetStateAction } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
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
import { maintenanceStyleOptions, retryUnitOptions } from '../options';
import type { MaintenanceMode, MaintenanceModeForm, RetryUnit } from '../types';
import { formatRetryDuration, retryPartsToSeconds } from '../utils';

type Props = {
    can: { update: boolean };
    maintenanceMode: MaintenanceMode;
    form: InertiaFormProps<MaintenanceModeForm>;
    retryAmount: string;
    retryUnit: RetryUnit;
    retrySecondsPreview: number | null;
    retryBreakdownPreview: string | null;
    retryIsOutOfRange: boolean;
    setRetryAmount: Dispatch<SetStateAction<string>>;
    setRetryUnit: Dispatch<SetStateAction<RetryUnit>>;
    submit: (event: FormEvent) => void;
};

export function MaintenanceModePanel({
    can,
    maintenanceMode,
    form,
    retryAmount,
    retryUnit,
    retrySecondsPreview,
    retryBreakdownPreview,
    retryIsOutOfRange,
    setRetryAmount,
    setRetryUnit,
    submit,
}: Props) {
    const disabled = !can.update || form.processing;

    return (
        <TooltipProvider>
            <Card data-dashboard-card className="min-w-0 overflow-hidden">
                <CardHeader className="border-b px-6 py-4">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            <Power className="size-5" />
                        </span>
                        Maintenance Mode System
                    </CardTitle>
                    <CardDescription className="text-xs">
                        Aktifkan mode perawatan aplikasi dengan secret bypass
                        untuk admin.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-5 sm:p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="rounded-lg border border-dashed bg-muted/20 p-4">
                            <p className="text-xs font-bold">
                                Cara Kerja Maintenance Mode
                            </p>
                            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                                Saat aktif, aplikasi ditutup sementara untuk
                                user umum. Gunakan ini saat deploy, migrasi
                                database, perbaikan urgent, atau perawatan
                                server. Admin/developer tetap bisa masuk melalui
                                secret bypass jika disiapkan.
                            </p>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-3">
                            <SummaryTile
                                label="Stored Status"
                                value={maintenanceMode.enabled ? 'On' : 'Off'}
                            />
                            <SummaryTile
                                label="Runtime Status"
                                value={maintenanceMode.active ? 'Down' : 'Live'}
                            />
                            <SummaryTile
                                label="Retry Duration"
                                value={formatRetryDuration(
                                    maintenanceMode.retry_seconds,
                                )}
                            />
                        </div>

                        <label className="flex cursor-pointer items-start gap-3 rounded-lg border bg-muted/20 p-4">
                            <Checkbox
                                checked={form.data.enabled}
                                disabled={disabled}
                                onCheckedChange={(checked) =>
                                    form.setData('enabled', Boolean(checked))
                                }
                            />
                            <span>
                                <span className="block text-xs font-bold">
                                    Aktifkan maintenance mode
                                </span>
                                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                                    Saat aktif, Laravel akan menjalankan mode
                                    down. Gunakan secret bypass agar admin tetap
                                    bisa masuk.
                                </span>
                            </span>
                        </label>

                        <div className="space-y-2">
                            <FieldInfoLabel
                                label="Maintenance Message"
                                tooltip="Pesan yang tampil pada halaman maintenance."
                            />
                            <textarea
                                value={form.data.message}
                                disabled={disabled}
                                rows={3}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Aplikasi sedang dalam mode maintenance."
                                onChange={(event) =>
                                    form.setData('message', event.target.value)
                                }
                            />
                            <InputError message={form.errors.message} />
                        </div>

                        <div className="space-y-3">
                            <FieldInfoLabel
                                label="Style Halaman Maintenance"
                                tooltip="Pilih visual halaman yang ditampilkan saat aplikasi masuk maintenance mode."
                            />
                            <Select
                                value={form.data.page_style}
                                disabled={disabled}
                                onValueChange={(value) =>
                                    form.setData(
                                        'page_style',
                                        value as MaintenanceModeForm['page_style'],
                                    )
                                }
                            >
                                <SelectTrigger className="enabled:cursor-pointer">
                                    <SelectValue placeholder="Pilih style halaman maintenance" />
                                </SelectTrigger>
                                <SelectContent>
                                    {maintenanceStyleOptions.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="grid gap-3 md:grid-cols-3">
                                {maintenanceStyleOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        disabled={disabled}
                                        onClick={() =>
                                            form.setData(
                                                'page_style',
                                                option.value as MaintenanceModeForm['page_style'],
                                            )
                                        }
                                        className={
                                            form.data.page_style ===
                                            option.value
                                                ? 'rounded-lg border border-primary bg-primary/10 p-3 text-left text-primary transition enabled:cursor-pointer'
                                                : 'rounded-lg border p-3 text-left transition hover:bg-muted/60 enabled:cursor-pointer'
                                        }
                                    >
                                        <span className="block text-xs font-bold">
                                            {option.label}
                                        </span>
                                        <span className="mt-1 block text-[13px] leading-relaxed text-muted-foreground">
                                            {option.description}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            <InputError message={form.errors.page_style} />
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <RetryField
                                form={form}
                                disabled={disabled}
                                retryAmount={retryAmount}
                                retryUnit={retryUnit}
                                retrySecondsPreview={retrySecondsPreview}
                                retryBreakdownPreview={retryBreakdownPreview}
                                retryIsOutOfRange={retryIsOutOfRange}
                                setRetryAmount={setRetryAmount}
                                setRetryUnit={setRetryUnit}
                            />
                            <div className="space-y-2">
                                <FieldInfoLabel
                                    label="Refresh Seconds"
                                    tooltip="Auto refresh browser saat maintenance. Kosongkan untuk nonaktif."
                                />
                                <Input
                                    type="number"
                                    min="5"
                                    max="3600"
                                    value={form.data.refresh_seconds}
                                    disabled={disabled}
                                    onChange={(event) =>
                                        form.setData(
                                            'refresh_seconds',
                                            event.target.value,
                                        )
                                    }
                                />
                                <p className="text-[13px] leading-relaxed text-muted-foreground">
                                    Membuat halaman maintenance auto reload
                                    berkala.
                                </p>
                                <InputError
                                    message={form.errors.refresh_seconds}
                                />
                            </div>
                            <div className="space-y-2">
                                <FieldInfoLabel
                                    label="Secret Bypass"
                                    tooltip="Slug rahasia untuk bypass maintenance. Kosongkan jika tidak ingin mengubah."
                                />
                                <Input
                                    type="password"
                                    value={form.data.secret}
                                    disabled={disabled}
                                    placeholder={
                                        maintenanceMode.secret_configured
                                            ? 'Secret bypass tersimpan'
                                            : 'admin-bypass-2026'
                                    }
                                    onChange={(event) =>
                                        form.setData(
                                            'secret',
                                            event.target.value,
                                        )
                                    }
                                />
                                <p className="text-[13px] leading-relaxed text-muted-foreground">
                                    Secret tidak ditampilkan ulang untuk
                                    keamanan.
                                </p>
                                <InputError message={form.errors.secret} />
                            </div>
                        </div>

                        {maintenanceMode.secret_configured ? (
                            <div className="rounded-lg border border-dashed bg-muted/20 p-4">
                                <p className="text-xs font-bold">
                                    Secret Bypass Tersimpan
                                </p>
                                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                    Nilai secret dan bypass URL disembunyikan.
                                    Jika perlu mengubah, isi secret baru lalu
                                    simpan.
                                </p>
                            </div>
                        ) : null}

                        <div className="flex items-center justify-end border-t pt-4">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        type="submit"
                                        disabled={disabled}
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
                                                Simpan Maintenance
                                            </>
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Simpan pengaturan mode perawatan aplikasi
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

function RetryField({
    form,
    disabled,
    retryAmount,
    retryUnit,
    retrySecondsPreview,
    retryBreakdownPreview,
    retryIsOutOfRange,
    setRetryAmount,
    setRetryUnit,
}: {
    form: InertiaFormProps<MaintenanceModeForm>;
    disabled: boolean;
    retryAmount: string;
    retryUnit: RetryUnit;
    retrySecondsPreview: number | null;
    retryBreakdownPreview: string | null;
    retryIsOutOfRange: boolean;
    setRetryAmount: Dispatch<SetStateAction<string>>;
    setRetryUnit: Dispatch<SetStateAction<RetryUnit>>;
}) {
    return (
        <div className="space-y-2">
            <FieldInfoLabel
                label="Retry Setelah"
                tooltip="Waktu tunggu yang dikirim sebagai header Retry-After."
            />
            <div className="grid grid-cols-[minmax(0,1fr)_120px] gap-2">
                <Input
                    type="number"
                    step="1"
                    value={retryAmount}
                    disabled={disabled}
                    onChange={(event) => {
                        const amount = event.target.value;

                        setRetryAmount(amount);
                        form.setData(
                            'retry_seconds',
                            retryPartsToSeconds(amount, retryUnit),
                        );
                    }}
                />
                <Select
                    value={retryUnit}
                    disabled={disabled}
                    onValueChange={(value) => {
                        const unit = value as RetryUnit;

                        setRetryUnit(unit);
                        form.setData(
                            'retry_seconds',
                            retryPartsToSeconds(retryAmount, unit),
                        );
                    }}
                >
                    <SelectTrigger className="enabled:cursor-pointer">
                        <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                        {retryUnitOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {retryBreakdownPreview ? (
                <div
                    className={
                        retryIsOutOfRange
                            ? 'rounded-md border border-destructive/40 bg-destructive/10 p-2.5 text-xs leading-relaxed'
                            : 'rounded-md border bg-muted/50 p-2.5 text-xs leading-relaxed'
                    }
                >
                    <p className="font-semibold">Konversi Retry</p>
                    <p className="mt-0.5 text-muted-foreground">
                        {retryAmount}{' '}
                        {retryUnitOptions
                            .find((option) => option.value === retryUnit)
                            ?.label.toLowerCase()}{' '}
                        = {retrySecondsPreview} detik ({retryBreakdownPreview})
                    </p>
                    {retryIsOutOfRange ? (
                        <p className="mt-1 font-semibold text-destructive">
                            Nilai retry harus antara 30 detik s/d 30 hari.
                        </p>
                    ) : null}
                </div>
            ) : null}
            <InputError message={form.errors.retry_seconds} />
        </div>
    );
}
