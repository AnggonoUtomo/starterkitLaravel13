import { Form } from '@inertiajs/react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import React, { useRef } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);

    return (
        <Card className="min-w-0 overflow-hidden border-destructive/30">
            <CardContent className="space-y-4 p-5 sm:p-6">
                <div className="space-y-1 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-xs text-destructive">
                    <p className="flex items-center gap-1.5 font-bold">
                        <AlertTriangle className="size-4 shrink-0" />
                        <span>Peringatan Penting:</span>
                    </p>
                    <p className="leading-relaxed">
                        Harap berhati-hati. Setelah akun Anda dihapus, seluruh
                        data dan akses tidak dapat dipulihkan kembali.
                    </p>
                </div>

                <Dialog>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="destructive"
                                        data-test="delete-user-button"
                                        className="cursor-pointer gap-2"
                                    >
                                        <Trash2 className="size-4" />
                                        <span>Hapus Akun Permanen</span>
                                    </Button>
                                </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs">
                                Buka konfirmasi penghapusan akun permanen
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <DialogContent>
                        <DialogTitle>
                            Apakah Anda yakin ingin menghapus akun ini?
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Setelah akun dihapus, seluruh resource dan data
                            terkait akan dihapus secara permanen. Silakan
                            masukkan kata sandi Anda untuk mengonfirmasi
                            tindakan ini.
                        </DialogDescription>

                        <Form
                            action="/settings/profile"
                            method="delete"
                            options={{
                                preserveScroll: true,
                            }}
                            onError={() => passwordInput.current?.focus()}
                            resetOnSuccess
                            className="space-y-4"
                        >
                            {({ resetAndClearErrors, processing, errors }) => (
                                <>
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="password"
                                            className="text-xs font-semibold"
                                        >
                                            Kata Sandi Konfirmasi
                                        </Label>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            ref={passwordInput}
                                            placeholder="Masukkan kata sandi Anda"
                                            autoComplete="current-password"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <DialogFooter className="gap-2">
                                        <DialogClose asChild>
                                            <Button
                                                variant="secondary"
                                                type="button"
                                                onClick={() =>
                                                    resetAndClearErrors()
                                                }
                                            >
                                                Batal
                                            </Button>
                                        </DialogClose>

                                        <Button
                                            variant="destructive"
                                            disabled={processing}
                                            type="submit"
                                            data-test="confirm-delete-user-button"
                                        >
                                            Ya, Hapus Akun Saya
                                        </Button>
                                    </DialogFooter>
                                </>
                            )}
                        </Form>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
