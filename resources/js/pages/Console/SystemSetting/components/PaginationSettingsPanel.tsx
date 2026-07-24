import type { InertiaFormProps } from '@inertiajs/react';
import { ListFilter, Save, Send } from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';
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
import { perPageOptions } from '../options';
import type { PaginationForm, PaginationSettings } from '../types';

type Props = {
    can: { update: boolean };
    paginationSettings: PaginationSettings;
    form: InertiaFormProps<PaginationForm>;
    togglePerPageOption: (option: number, checked: boolean) => void;
    submit: (event: FormEvent) => void;
};

export function PaginationSettingsPanel({
    can,
    paginationSettings,
    form,
    togglePerPageOption,
    submit,
}: Props) {
    return (
        <TooltipProvider>
            <Card data-dashboard-card className="min-w-0 overflow-hidden">
                <CardHeader className="border-b px-6 py-4">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <ListFilter className="size-5" />
                        </span>
                        Default Pagination Tabel
                    </CardTitle>
                    <CardDescription className="text-xs">
                        Atur jumlah row default dan opsi pilihan row pada tabel
                        aplikasi.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-5 sm:p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-4 lg:grid-cols-3">
                            <SummaryTile
                                label="Default Row"
                                value={paginationSettings.default_per_page}
                            />
                            <SummaryTile
                                label="Opsi Aktif"
                                value={paginationSettings.per_page_options.join(
                                    ', ',
                                )}
                            />
                            <SummaryTile
                                label="Dipakai Oleh"
                                value="Table Pagination"
                            />
                        </div>

                        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
                            <div className="space-y-3">
                                <FieldInfoLabel
                                    label="Opsi Jumlah Row"
                                    required
                                    tooltip="Pilih opsi jumlah row yang boleh muncul di pagination bar."
                                />
                                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                    {perPageOptions.map((option) => (
                                        <label
                                            key={option}
                                            className="flex cursor-pointer items-center gap-3 rounded-lg border bg-muted/20 p-3"
                                        >
                                            <Checkbox
                                                checked={form.data.per_page_options.includes(
                                                    option,
                                                )}
                                                disabled={
                                                    !can.update ||
                                                    form.processing
                                                }
                                                onCheckedChange={(value) =>
                                                    togglePerPageOption(
                                                        option,
                                                        Boolean(value),
                                                    )
                                                }
                                            />
                                            <span className="text-xs font-bold">
                                                {option} rows
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                <InputError
                                    message={form.errors.per_page_options}
                                />
                            </div>

                            <div className="space-y-2">
                                <FieldInfoLabel
                                    label="Default Row Initial"
                                    required
                                    tooltip="Jumlah row awal saat halaman tabel dibuka tanpa parameter per_page."
                                />
                                <Select
                                    value={form.data.default_per_page}
                                    onValueChange={(value) =>
                                        form.setData('default_per_page', value)
                                    }
                                    disabled={
                                        !can.update ||
                                        form.processing ||
                                        form.data.per_page_options.length === 0
                                    }
                                >
                                    <SelectTrigger className="enabled:cursor-pointer">
                                        <SelectValue placeholder="Pilih default" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {form.data.per_page_options.map(
                                            (option) => (
                                                <SelectItem
                                                    key={option}
                                                    value={String(option)}
                                                >
                                                    {option} rows
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={form.errors.default_per_page}
                                />
                            </div>
                        </div>

                        <div className="rounded-lg border border-dashed bg-muted/20 p-4">
                            <div className="flex items-start gap-3">
                                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                    <ListFilter className="size-4" />
                                </span>
                                <div>
                                    <p className="text-xs font-bold">
                                        Efek Global
                                    </p>
                                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                                        User Management dan Audit Logs akan
                                        memakai default ini saat URL tidak
                                        memiliki parameter{' '}
                                        <span className="font-semibold">
                                            per_page
                                        </span>
                                        .
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
                                                Simpan Pagination
                                            </>
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Simpan pengaturan default row tabel
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
            <p className="mt-1 text-base font-bold">{value}</p>
        </div>
    );
}
