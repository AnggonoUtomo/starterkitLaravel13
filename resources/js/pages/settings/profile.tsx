import { Form, Head, Link, usePage } from '@inertiajs/react';
import { AlertTriangle, CheckCircle2, Save, UserCircle } from 'lucide-react';
import React from 'react';
import DeleteUser from '@/components/delete-user';
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
import type { Auth } from '@/types';

type PageProps = {
    auth: Auth;
};

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<PageProps>().props;

    return (
        <div className="space-y-6">
            <Head title="Pengaturan Profil" />

            {/* Profile Information Card */}
            <Card className="min-w-0 overflow-hidden">
                <CardHeader className="border-b px-6 py-4">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                        <span className="flex size-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
                            <UserCircle className="size-4" />
                        </span>
                        Informasi Profil Pengguna
                    </CardTitle>
                    <CardDescription className="text-xs">
                        Perbarui nama lengkap dan alamat email utama akun Anda.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-5 sm:p-6">
                    <Form
                        action="/settings/profile"
                        method="patch"
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-5"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-2">
                                    <FieldInfoLabel
                                        htmlFor="name"
                                        label="Nama Lengkap"
                                        required
                                        tooltip="Nama lengkap resmi yang ditampilkan pada sistem dan catatan audit log."
                                    />
                                    <Input
                                        id="name"
                                        className="mt-1 block w-full text-xs font-medium"
                                        defaultValue={auth.user.name}
                                        name="name"
                                        required
                                        autoComplete="name"
                                        placeholder="Nama lengkap"
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <FieldInfoLabel
                                        htmlFor="email"
                                        label="Alamat Email Utama"
                                        required
                                        tooltip="Alamat email aktif untuk autentikasi login, notifikasi, dan verifikasi akun."
                                    />
                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full font-mono text-xs font-medium"
                                        defaultValue={auth.user.email}
                                        name="email"
                                        required
                                        autoComplete="username"
                                        placeholder="nama@email.com"
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.email}
                                    />
                                </div>

                                {mustVerifyEmail &&
                                    auth.user.email_verified_at === null && (
                                        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-600 dark:text-amber-400">
                                            <p className="flex items-center gap-1.5 font-semibold">
                                                <AlertTriangle className="size-4 shrink-0" />
                                                <span>
                                                    Alamat email Anda belum
                                                    diverifikasi.
                                                </span>
                                            </p>
                                            <p className="mt-1 leading-relaxed">
                                                <Link
                                                    href="/email/verification-notification"
                                                    method="post"
                                                    as="button"
                                                    className="font-bold underline underline-offset-4 transition-colors hover:text-foreground"
                                                >
                                                    Klik di sini untuk mengirim
                                                    ulang email verifikasi.
                                                </Link>
                                            </p>

                                            {status ===
                                                'verification-link-sent' && (
                                                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                                    <CheckCircle2 className="size-4" />
                                                    <span>
                                                        Tautan verifikasi baru
                                                        telah dikirim ke alamat
                                                        email Anda.
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                <div className="flex items-center gap-3 pt-2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    type="submit"
                                                    disabled={processing}
                                                    data-test="update-profile-button"
                                                    className="cursor-pointer gap-2"
                                                >
                                                    <Save className="size-4" />
                                                    <span>
                                                        Simpan Perubahan
                                                    </span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent
                                                side="top"
                                                className="text-xs"
                                            >
                                                Simpan pembaruan nama dan email
                                                profil
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </>
                        )}
                    </Form>
                </CardContent>
            </Card>

            {/* Danger Zone: Delete Account */}
            <DeleteUser />
        </div>
    );
}
