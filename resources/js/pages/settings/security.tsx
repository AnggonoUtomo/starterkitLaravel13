import { Form, Head } from '@inertiajs/react';
import { KeyRound, Save } from 'lucide-react';
import React, { useRef } from 'react';
import { FieldInfoLabel } from '@/components/field-info-label';
import InputError from '@/components/input-error';
import type { Props as ManagePasskeysProps } from '@/components/manage-passkeys';
import ManagePasskeys from '@/components/manage-passkeys';
import type { Props as ManageTwoFactorProps } from '@/components/manage-two-factor';
import ManageTwoFactor from '@/components/manage-two-factor';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

type Props = {
    passwordRules: string;
} & ManagePasskeysProps &
    ManageTwoFactorProps;

export default function Security(props: Props) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    return (
        <div className="space-y-6">
            <Head title="Pengaturan Kata Sandi & Keamanan" />

            {/* Change Password Card - Adapted from Console/Profile bottom panel */}
            <Card className="min-w-0 overflow-hidden">
                <CardHeader className="border-b px-6 py-4">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                        <span className="flex size-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                            <KeyRound className="size-4" />
                        </span>
                        <span>Kata Sandi</span>
                    </CardTitle>
                    <CardDescription className="text-xs">
                        Gunakan kata sandi yang kuat agar akun tetap aman.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-5 sm:p-6">
                    <Form
                        action="/user/password"
                        method="put"
                        options={{
                            preserveScroll: true,
                        }}
                        resetOnError={[
                            'password',
                            'password_confirmation',
                            'current_password',
                        ]}
                        resetOnSuccess
                        onError={(errors) => {
                            if (errors.password) {
                                passwordInput.current?.focus();
                            }

                            if (errors.current_password) {
                                currentPasswordInput.current?.focus();
                            }
                        }}
                        className="space-y-4"
                    >
                        {({ errors, processing }) => (
                            <>
                                <div className="space-y-1.5">
                                    <FieldInfoLabel
                                        htmlFor="current_password"
                                        label="Kata sandi saat ini"
                                        required
                                        tooltip="Kata sandi saat ini"
                                    />
                                    <PasswordInput
                                        id="current_password"
                                        ref={currentPasswordInput}
                                        name="current_password"
                                        className="mt-1 block w-full font-mono text-xs"
                                        autoComplete="current-password"
                                        placeholder="Kata sandi saat ini"
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.current_password}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <FieldInfoLabel
                                        htmlFor="password"
                                        label="Kata sandi baru"
                                        required
                                        tooltip="Kata sandi baru"
                                    />
                                    <PasswordInput
                                        id="password"
                                        ref={passwordInput}
                                        name="password"
                                        className="mt-1 block w-full font-mono text-xs"
                                        autoComplete="new-password"
                                        placeholder="Kata sandi baru"
                                        passwordrules={props.passwordRules}
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.password}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <FieldInfoLabel
                                        htmlFor="password_confirmation"
                                        label="Konfirmasi kata sandi"
                                        required
                                        tooltip="Konfirmasi kata sandi"
                                    />
                                    <PasswordInput
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        className="mt-1 block w-full font-mono text-xs"
                                        autoComplete="new-password"
                                        placeholder="Konfirmasi kata sandi"
                                        passwordrules={props.passwordRules}
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.password_confirmation}
                                    />
                                </div>

                                <div className="flex items-center gap-3 pt-2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    disabled={processing}
                                                    data-test="update-password-button"
                                                    className="cursor-pointer gap-2"
                                                >
                                                    <Save className="size-4" />
                                                    <span>
                                                        Simpan kata sandi
                                                    </span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent
                                                side="top"
                                                className="text-xs"
                                            >
                                                Simpan pembaruan kata sandi akun
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </>
                        )}
                    </Form>
                </CardContent>
            </Card>

            {/* Manage 2FA & Passkeys */}
            <ManageTwoFactor
                canManageTwoFactor={props.canManageTwoFactor}
                requiresConfirmation={props.requiresConfirmation}
                twoFactorEnabled={props.twoFactorEnabled}
            />

            <ManagePasskeys
                canManagePasskeys={props.canManagePasskeys}
                passkeys={props.passkeys}
            />
        </div>
    );
}
