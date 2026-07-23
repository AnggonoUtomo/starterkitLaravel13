import { Head, useForm, usePage } from '@inertiajs/react';
import { KeyRound, Save, User } from 'lucide-react';
import React from 'react';
import ConsoleLayout from '@/layouts/ConsoleLayout';

interface SharedAuth {
    user?: {
        name: string;
        email: string;
    } | null;
}

interface Props {
    title: string;
}

export default function Index({ title }: Props) {
    const { auth } = usePage<{ auth: SharedAuth }>().props;

    const profileForm = useForm({
        name: auth?.user?.name || '',
        email: auth?.user?.email || '',
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        profileForm.put('/user/profile-information');
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        passwordForm.put('/user/password', {
            onSuccess: () => passwordForm.reset(),
        });
    };

    return (
        <ConsoleLayout>
            <Head title={title} />
            <div className="mx-auto max-w-4xl space-y-6 p-6">
                <div>
                    <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-100">
                        <User className="h-6 w-6 text-emerald-400" />
                        <span>{title}</span>
                    </h1>
                    <p className="mt-1 text-sm text-slate-400">
                        Manage your account information and update security
                        credentials.
                    </p>
                </div>

                {/* Profile Information Section */}
                <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-3 font-semibold text-slate-100">
                        <User className="h-4 w-4 text-emerald-400" />
                        <span>Personal Information</span>
                    </div>

                    <form
                        onSubmit={handleProfileSubmit}
                        className="max-w-lg space-y-4"
                    >
                        <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-300">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={profileForm.data.name}
                                onChange={(e) =>
                                    profileForm.setData('name', e.target.value)
                                }
                                required
                                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-300">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={profileForm.data.email}
                                onChange={(e) =>
                                    profileForm.setData('email', e.target.value)
                                }
                                required
                                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={profileForm.processing}
                            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-600"
                        >
                            <Save className="h-3.5 w-3.5" />
                            Save Profile
                        </button>
                    </form>
                </div>

                {/* Security Password Section */}
                <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-3 font-semibold text-slate-100">
                        <KeyRound className="h-4 w-4 text-amber-400" />
                        <span>Change Password</span>
                    </div>

                    <form
                        onSubmit={handlePasswordSubmit}
                        className="max-w-lg space-y-4"
                    >
                        <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-300">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={passwordForm.data.current_password}
                                onChange={(e) =>
                                    passwordForm.setData(
                                        'current_password',
                                        e.target.value,
                                    )
                                }
                                required
                                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-amber-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-300">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={passwordForm.data.password}
                                onChange={(e) =>
                                    passwordForm.setData(
                                        'password',
                                        e.target.value,
                                    )
                                }
                                required
                                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-amber-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-300">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={passwordForm.data.password_confirmation}
                                onChange={(e) =>
                                    passwordForm.setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                required
                                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-amber-500 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={passwordForm.processing}
                            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-amber-600"
                        >
                            <Save className="h-3.5 w-3.5" />
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </ConsoleLayout>
    );
}
