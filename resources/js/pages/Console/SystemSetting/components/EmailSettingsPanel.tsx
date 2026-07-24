import type { InertiaFormProps } from '@inertiajs/react';
import {
    CheckCircle2,
    Mail,
    MailCheck,
    Save,
    Send,
    ServerCog,
    ShieldCheck,
} from 'lucide-react';
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
import type { EmailSettingForm, EmailSettings, TestEmailForm } from '../types';
import { boolLabel } from '../utils';

type Props = {
    can: { update: boolean };
    emailSettings: EmailSettings;
    form: InertiaFormProps<EmailSettingForm>;
    testForm: InertiaFormProps<TestEmailForm>;
    mailerUsesSmtp: boolean;
    submit: (event: FormEvent) => void;
    submitTestEmail: (event: FormEvent) => void;
};

export function EmailSettingsPanel({
    can,
    emailSettings,
    form,
    testForm,
    mailerUsesSmtp,
    submit,
    submitTestEmail,
}: Props) {
    return (
        <TooltipProvider>
            <Card data-dashboard-card className="min-w-0 overflow-hidden">
                <CardHeader className="border-b px-6 py-4">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                            <ServerCog className="size-5" />
                        </span>
                        Konfigurasi SMTP & Email
                    </CardTitle>
                    <CardDescription className="text-xs">
                        Simpan pengaturan email yang akan dipakai runtime
                        aplikasi.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-5 sm:p-6">
                    <div className="mb-8 grid gap-4 lg:grid-cols-2">
                        <div className="rounded-lg border bg-muted/30 p-4">
                            <div className="flex items-start gap-3">
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400">
                                    <Mail className="size-4" />
                                </span>
                                <div className="min-w-0 flex-1 space-y-3">
                                    <div>
                                        <p className="text-xs font-bold">
                                            Status Email
                                        </p>
                                        <p className="mt-0.5 text-xs text-muted-foreground">
                                            Kondisi konfigurasi pengiriman
                                            email.
                                        </p>
                                    </div>
                                    <div className="grid gap-2 text-xs">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-muted-foreground">
                                                Pengiriman
                                            </span>
                                            <Badge
                                                variant={
                                                    emailSettings.enabled
                                                        ? 'default'
                                                        : 'secondary'
                                                }
                                            >
                                                {boolLabel(
                                                    emailSettings.enabled,
                                                )}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-muted-foreground">
                                                Mailer
                                            </span>
                                            <span className="font-semibold uppercase">
                                                {emailSettings.mailer}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-muted-foreground">
                                                Password SMTP
                                            </span>
                                            <span className="flex items-center gap-1.5 font-medium">
                                                {emailSettings.password_configured && (
                                                    <CheckCircle2 className="size-4 text-emerald-500" />
                                                )}
                                                {emailSettings.password_configured
                                                    ? 'Tersimpan'
                                                    : 'Belum ada'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border bg-muted/30 p-4">
                            <div className="flex items-start gap-3">
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                    <ShieldCheck className="size-4" />
                                </span>
                                <div className="min-w-0 flex-1 space-y-3">
                                    <div>
                                        <p className="text-xs font-bold">
                                            Otomasi Aktivasi
                                        </p>
                                        <p className="mt-0.5 text-xs text-muted-foreground">
                                            Dipakai saat user baru dibuat atau
                                            admin mengirim tautan atur password.
                                        </p>
                                    </div>
                                    <div className="grid gap-2 text-xs">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-muted-foreground">
                                                User baru
                                            </span>
                                            <Badge variant="secondary">
                                                {boolLabel(
                                                    emailSettings.send_credentials_on_create,
                                                )}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-muted-foreground">
                                                Link reset
                                            </span>
                                            <Badge variant="secondary">
                                                {boolLabel(
                                                    emailSettings.send_credentials_on_password_update,
                                                )}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={submitTestEmail}
                        className="mb-8 rounded-lg border bg-muted/20 p-4"
                    >
                        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                            <div className="space-y-2">
                                <FieldInfoLabel
                                    htmlFor="test_recipient"
                                    label="Test Email SMTP"
                                    required
                                    tooltip="Email tujuan untuk memastikan konfigurasi mailer yang tersimpan dapat mengirim pesan."
                                />
                                <Input
                                    id="test_recipient"
                                    type="email"
                                    value={testForm.data.recipient}
                                    disabled={
                                        !can.update || testForm.processing
                                    }
                                    placeholder="admin@example.com"
                                    onChange={(event) =>
                                        testForm.setData(
                                            'recipient',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={testForm.errors.recipient}
                                />
                            </div>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        type="submit"
                                        variant="outline"
                                        disabled={
                                            !can.update || testForm.processing
                                        }
                                        className="h-10 min-w-36 enabled:cursor-pointer"
                                    >
                                        {testForm.processing ? (
                                            <>
                                                <Send className="size-4 animate-pulse" />
                                                Mengirim...
                                            </>
                                        ) : (
                                            <>
                                                <MailCheck className="size-4" />
                                                Kirim Test
                                            </>
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Test pengiriman email sungguhan via SMTP
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                            Test memakai konfigurasi email yang sudah tersimpan.
                            Simpan perubahan SMTP terlebih dahulu sebelum
                            menekan tombol ini.
                        </p>
                    </form>

                    <form onSubmit={submit} className="space-y-6">
                        <section className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="flex cursor-pointer items-start gap-3 rounded-lg border bg-muted/20 p-4">
                                    <Checkbox
                                        checked={form.data.enabled}
                                        onCheckedChange={(checked) =>
                                            form.setData(
                                                'enabled',
                                                Boolean(checked),
                                            )
                                        }
                                    />
                                    <span>
                                        <span className="block text-xs font-bold">
                                            Aktifkan pengiriman email
                                        </span>
                                        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                                            Jika nonaktif, tautan aktivasi dan
                                            tautan atur password tidak akan
                                            dikirim.
                                        </span>
                                    </span>
                                </label>

                                <div className="space-y-2">
                                    <FieldInfoLabel
                                        label="Mailer Driver"
                                        required
                                        tooltip="Gunakan SMTP untuk email sungguhan, log/array untuk development."
                                    />
                                    <Select
                                        value={form.data.mailer}
                                        onValueChange={(
                                            value: EmailSettingForm['mailer'],
                                        ) => form.setData('mailer', value)}
                                        disabled={!can.update}
                                    >
                                        <SelectTrigger className="enabled:cursor-pointer">
                                            <SelectValue placeholder="Pilih mailer" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="smtp">
                                                SMTP
                                            </SelectItem>
                                            <SelectItem value="log">
                                                Log
                                            </SelectItem>
                                            <SelectItem value="array">
                                                Array
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={form.errors.mailer} />
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <FieldInfoLabel
                                        htmlFor="host"
                                        label="SMTP Host"
                                        required={mailerUsesSmtp}
                                        tooltip="Alamat SMTP server, misalnya smtp.gmail.com atau smtp.mailtrap.io."
                                    />
                                    <Input
                                        id="host"
                                        value={form.data.host}
                                        disabled={
                                            !can.update || !mailerUsesSmtp
                                        }
                                        placeholder="smtp.example.com"
                                        onChange={(event) =>
                                            form.setData(
                                                'host',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    <InputError message={form.errors.host} />
                                </div>

                                <div className="space-y-2">
                                    <FieldInfoLabel
                                        htmlFor="port"
                                        label="SMTP Port"
                                        required={mailerUsesSmtp}
                                        tooltip="Port umum SMTP adalah 587, 465, atau 2525."
                                    />
                                    <Input
                                        id="port"
                                        type="number"
                                        min="1"
                                        max="65535"
                                        value={form.data.port}
                                        disabled={
                                            !can.update || !mailerUsesSmtp
                                        }
                                        placeholder="587"
                                        onChange={(event) =>
                                            form.setData(
                                                'port',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    <InputError message={form.errors.port} />
                                </div>

                                <div className="space-y-2">
                                    <FieldInfoLabel
                                        htmlFor="username"
                                        label="SMTP Username"
                                        tooltip="Username SMTP, biasanya sama dengan email provider."
                                    />
                                    <Input
                                        id="username"
                                        value={form.data.username}
                                        disabled={
                                            !can.update || !mailerUsesSmtp
                                        }
                                        placeholder="apikey atau email"
                                        onChange={(event) =>
                                            form.setData(
                                                'username',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={form.errors.username}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <FieldInfoLabel
                                        htmlFor="password"
                                        label="SMTP Password"
                                        tooltip="Kosongkan jika tidak ingin mengubah password SMTP yang sudah tersimpan."
                                    />
                                    <Input
                                        id="password"
                                        type="password"
                                        value={form.data.password}
                                        disabled={
                                            !can.update || !mailerUsesSmtp
                                        }
                                        placeholder={
                                            emailSettings.password_configured
                                                ? 'Password sudah tersimpan'
                                                : 'Masukkan password SMTP'
                                        }
                                        onChange={(event) =>
                                            form.setData(
                                                'password',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={form.errors.password}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <FieldInfoLabel
                                        label="Enkripsi"
                                        tooltip="Pilih TLS/SSL sesuai provider SMTP."
                                    />
                                    <Select
                                        value={form.data.encryption}
                                        onValueChange={(
                                            value: EmailSettingForm['encryption'],
                                        ) => form.setData('encryption', value)}
                                        disabled={
                                            !can.update || !mailerUsesSmtp
                                        }
                                    >
                                        <SelectTrigger className="enabled:cursor-pointer">
                                            <SelectValue placeholder="Pilih encryption" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tls">
                                                TLS
                                            </SelectItem>
                                            <SelectItem value="ssl">
                                                SSL
                                            </SelectItem>
                                            <SelectItem value="none">
                                                None
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError
                                        message={form.errors.encryption}
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <FieldInfoLabel
                                        htmlFor="from_address"
                                        label="From Address"
                                        required
                                        tooltip="Alamat email pengirim yang terlihat oleh penerima."
                                    />
                                    <Input
                                        id="from_address"
                                        type="email"
                                        value={form.data.from_address}
                                        disabled={!can.update}
                                        placeholder="noreply@example.com"
                                        onChange={(event) =>
                                            form.setData(
                                                'from_address',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={form.errors.from_address}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <FieldInfoLabel
                                        htmlFor="from_name"
                                        label="From Name"
                                        required
                                        tooltip="Nama pengirim yang tampil di inbox penerima."
                                    />
                                    <Input
                                        id="from_name"
                                        value={form.data.from_name}
                                        disabled={!can.update}
                                        placeholder="Urbanclap Admin"
                                        onChange={(event) =>
                                            form.setData(
                                                'from_name',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={form.errors.from_name}
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="flex cursor-pointer items-start gap-3 rounded-lg border bg-muted/20 p-4">
                                    <Checkbox
                                        checked={
                                            form.data.send_credentials_on_create
                                        }
                                        disabled={!can.update}
                                        onCheckedChange={(checked) =>
                                            form.setData(
                                                'send_credentials_on_create',
                                                Boolean(checked),
                                            )
                                        }
                                    />
                                    <span>
                                        <span className="block text-xs font-bold">
                                            Kirim tautan aktivasi saat user
                                            dibuat
                                        </span>
                                        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                                            User menerima email berisi tautan
                                            untuk aktivasi akun dan mengatur
                                            password.
                                        </span>
                                    </span>
                                </label>

                                <label className="flex cursor-pointer items-start gap-3 rounded-lg border bg-muted/20 p-4">
                                    <Checkbox
                                        checked={
                                            form.data
                                                .send_credentials_on_password_update
                                        }
                                        disabled={!can.update}
                                        onCheckedChange={(checked) =>
                                            form.setData(
                                                'send_credentials_on_password_update',
                                                Boolean(checked),
                                            )
                                        }
                                    />
                                    <span>
                                        <span className="block text-xs font-bold">
                                            Izinkan tautan atur password dari
                                            edit user
                                        </span>
                                        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                                            Email diproses saat admin mencentang
                                            kirim tautan atur password pada edit
                                            user.
                                        </span>
                                    </span>
                                </label>
                            </div>

                            <div className="space-y-2">
                                <FieldInfoLabel
                                    htmlFor="credential_subject"
                                    label="Subject Email Aktivasi"
                                    tooltip="Subject email aktivasi yang dikirim ke user."
                                />
                                <Input
                                    id="credential_subject"
                                    value={form.data.credential_subject}
                                    disabled={!can.update}
                                    placeholder="Aktivasi akun dan atur password"
                                    onChange={(event) =>
                                        form.setData(
                                            'credential_subject',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={form.errors.credential_subject}
                                />
                            </div>

                            <div className="space-y-2">
                                <FieldInfoLabel
                                    htmlFor="credential_intro"
                                    label="Intro Email Aktivasi"
                                    tooltip="Kalimat pembuka sebelum tombol aktivasi dan atur password."
                                />
                                <textarea
                                    id="credential_intro"
                                    value={form.data.credential_intro}
                                    disabled={!can.update}
                                    rows={3}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Akun kamu sudah dibuat. Gunakan tautan berikut untuk aktivasi dan mengatur password."
                                    onChange={(event) =>
                                        form.setData(
                                            'credential_intro',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={form.errors.credential_intro}
                                />
                            </div>
                        </section>

                        <div className="flex items-center justify-end border-t pt-4">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        type="submit"
                                        disabled={
                                            !can.update || form.processing
                                        }
                                        className="h-10 min-w-36 enabled:cursor-pointer"
                                    >
                                        {form.processing ? (
                                            <>
                                                <Send className="size-4 animate-pulse" />
                                                Menyimpan...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="size-4" />
                                                Simpan Setting
                                            </>
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Simpan perubahan konfigurasi SMTP & Email
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </TooltipProvider>
    );
}
