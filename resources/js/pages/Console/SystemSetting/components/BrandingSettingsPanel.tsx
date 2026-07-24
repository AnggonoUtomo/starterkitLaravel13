import type { InertiaFormProps } from '@inertiajs/react';
import { ImageIcon, Palette, Save, Send, Upload, X } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import type { BrandingForm } from '../types';

type Props = {
    can: { update: boolean };
    form: InertiaFormProps<BrandingForm>;
    logoPreview: string | null;
    faviconPreview: string | null;
    submit: (event: FormEvent) => void;
};

export function BrandingSettingsPanel({
    can,
    form,
    logoPreview,
    faviconPreview,
    submit,
}: Props) {
    return (
        <TooltipProvider>
            <Card data-dashboard-card className="min-w-0 overflow-hidden">
                <CardHeader className="border-b px-6 py-4">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                            <Palette className="size-5" />
                        </span>
                        Branding & Identitas Aplikasi
                    </CardTitle>
                    <CardDescription className="text-xs">
                        Atur nama aplikasi, logo sidebar, dan favicon browser.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-5 sm:p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <FieldInfoLabel
                                htmlFor="app_name"
                                label="Nama Aplikasi"
                                required
                                tooltip="Nama ini dipakai pada title halaman dan identitas aplikasi di layout."
                            />
                            <Input
                                id="app_name"
                                value={form.data.app_name}
                                disabled={!can.update || form.processing}
                                placeholder="Laravel Starter Kit"
                                onChange={(event) =>
                                    form.setData('app_name', event.target.value)
                                }
                            />
                            <InputError message={form.errors.app_name} />
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                            <ImageUploadCard
                                title="Logo Aplikasi"
                                description="Logo utama untuk area sidebar/header. Format PNG, JPG, WEBP, atau SVG."
                                hint="Rekomendasi rasio kotak atau horizontal ringkas."
                                preview={logoPreview}
                                accept=".png,.jpg,.jpeg,.webp,.svg"
                                disabled={!can.update || form.processing}
                                emptyIcon={
                                    <ImageIcon className="size-7 text-muted-foreground" />
                                }
                                imageClassName="max-h-12 max-w-12 object-contain"
                                onRemove={() => {
                                    form.setData('logo', null);
                                    form.setData('remove_logo', true);
                                }}
                                onChange={(file) => {
                                    form.setData('logo', file);
                                    form.setData('remove_logo', false);
                                }}
                                error={form.errors.logo}
                            />
                            <ImageUploadCard
                                title="Favicon"
                                description="Ikon kecil yang muncul di tab browser. Format ICO, PNG, JPG, WEBP, atau SVG."
                                hint="Rekomendasi 32x32 atau 64x64 pixel."
                                preview={faviconPreview}
                                accept=".ico,.png,.jpg,.jpeg,.webp,.svg"
                                disabled={!can.update || form.processing}
                                emptyIcon={
                                    <ImageIcon className="size-7 text-muted-foreground" />
                                }
                                imageClassName="max-h-10 max-w-10 object-contain"
                                onRemove={() => {
                                    form.setData('favicon', null);
                                    form.setData('remove_favicon', true);
                                }}
                                onChange={(file) => {
                                    form.setData('favicon', file);
                                    form.setData('remove_favicon', false);
                                }}
                                error={form.errors.favicon}
                            />
                        </div>

                        <div className="rounded-lg border border-dashed bg-muted/20 p-4">
                            <div className="flex items-start gap-3">
                                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400">
                                    <Upload className="size-4" />
                                </span>
                                <div>
                                    <p className="text-xs font-bold">
                                        Preview Runtime
                                    </p>
                                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                                        Setelah disimpan, nama aplikasi langsung
                                        dipakai sebagai title halaman dan logo
                                        akan muncul pada identitas layout.
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
                                                Simpan Branding
                                            </>
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Simpan nama aplikasi, logo, dan favicon baru
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </TooltipProvider>
    );
}

type ImageUploadCardProps = {
    title: string;
    description: string;
    hint: string;
    preview: string | null;
    accept: string;
    disabled: boolean;
    emptyIcon: React.ReactNode;
    imageClassName: string;
    onRemove: () => void;
    onChange: (file: File | null) => void;
    error?: string;
};

function ImageUploadCard({
    title,
    description,
    hint,
    preview,
    accept,
    disabled,
    emptyIcon,
    imageClassName,
    onRemove,
    onChange,
    error,
}: ImageUploadCardProps) {
    return (
        <div className="space-y-3 rounded-lg border bg-muted/20 p-4">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <FieldInfoLabel label={title} tooltip={description} />
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {hint}
                    </p>
                </div>
                {preview && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                disabled={disabled}
                                onClick={onRemove}
                                className="size-7 enabled:cursor-pointer"
                            >
                                <X className="size-3.5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Hapus gambar</TooltipContent>
                    </Tooltip>
                )}
            </div>
            <div className="flex items-center gap-3">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
                    {preview ? (
                        <img
                            src={preview}
                            alt={title}
                            className={imageClassName}
                        />
                    ) : (
                        emptyIcon
                    )}
                </div>
                <div className="min-w-0 flex-1 space-y-1.5">
                    <Input
                        type="file"
                        accept={accept}
                        disabled={disabled}
                        onChange={(event) =>
                            onChange(event.target.files?.[0] ?? null)
                        }
                        className="text-xs file:text-xs"
                    />
                    <InputError message={error} />
                </div>
            </div>
        </div>
    );
}
