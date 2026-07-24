import { Form, Head } from '@inertiajs/react';
import { KeyRound, ShieldCheck } from 'lucide-react';
import React from 'react';
import { FieldInfoLabel } from '@/components/field-info-label';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export default function ConfirmPassword() {
    return (
        <div className="space-y-6">
            <Head title="Konfirmasi Kata Sandi" />

            <Card className="min-w-0 overflow-hidden">
                <CardHeader className="border-b px-6 py-4">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                        <span className="flex size-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                            <ShieldCheck className="size-4" />
                        </span>
                        Konfirmasi Kata Sandi
                    </CardTitle>
                    <CardDescription className="text-xs">
                        Ini adalah area keamanan terproteksi. Silakan konfirmasi
                        kata sandi atau Passkey Anda untuk melanjutkan.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-5 sm:p-6">
                    <PasskeyVerify
                        routes={{
                            options: {
                                url: '/user/confirm-password/options',
                                method: 'get',
                            },
                            submit: {
                                url: '/user/confirm-password',
                                method: 'post',
                            },
                        }}
                        label="Konfirmasi dengan Passkey"
                        loadingLabel="Mengonfirmasi..."
                        separator="Atau konfirmasi dengan kata sandi"
                    />

                    <Form
                        action="/user/confirm-password"
                        method="post"
                        resetOnSuccess={['password']}
                    >
                        {({ processing, errors }) => (
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <FieldInfoLabel
                                        htmlFor="password"
                                        label="Kata Sandi Saat Ini"
                                        required
                                        tooltip="Kata sandi saat ini"
                                    />
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        placeholder="Masukkan kata sandi Anda"
                                        autoComplete="current-password"
                                        autoFocus
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center pt-2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    className="w-full cursor-pointer gap-2"
                                                    disabled={processing}
                                                    data-test="confirm-password-button"
                                                >
                                                    {processing ? (
                                                        <Spinner />
                                                    ) : (
                                                        <KeyRound className="size-4" />
                                                    )}
                                                    <span>
                                                        Konfirmasi & Lanjutkan
                                                    </span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent
                                                side="top"
                                                className="text-xs"
                                            >
                                                Verifikasi kata sandi akun Anda
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                        )}
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
