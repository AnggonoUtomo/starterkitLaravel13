import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import React from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    created_at: string;
}

interface EditUserModalProps {
    editingUser: User | null;
    onClose: () => void;
    formData: {
        name: string;
        email: string;
        password: string;
        roles: string[];
    };
    onFieldChange: (field: string, value: any) => void;
    availableRoles: string[];
    onSubmit: (e: React.FormEvent) => void;
    isProcessing: boolean;
}

export default function EditUserModal({
    editingUser,
    onClose,
    formData,
    onFieldChange,
    availableRoles,
    onSubmit,
    isProcessing,
}: EditUserModalProps) {
    const handleRoleToggle = (role: string) => {
        const isSelected = formData.roles.includes(role);

        if (isSelected) {
            onFieldChange(
                'roles',
                formData.roles.filter((r) => r !== role),
            );
        } else {
            onFieldChange('roles', [...formData.roles, role]);
        }
    };

    return (
        <AnimatePresence>
            {editingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl"
                    >
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <h3 className="text-lg font-bold text-foreground">
                                Edit User: {editingUser.name}
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-muted-foreground hover:text-foreground cursor-pointer"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={onSubmit} className="mt-4 space-y-4">
                            <div>
                                <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        onFieldChange('name', e.target.value)
                                    }
                                    required
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        onFieldChange('email', e.target.value)
                                    }
                                    required
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                                    Password (Leave empty to keep current)
                                </label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        onFieldChange(
                                            'password',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-semibold text-muted-foreground">
                                    Assign Roles
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {availableRoles.map((role) => {
                                        const isSelected =
                                            formData.roles.includes(role);

                                        return (
                                            <button
                                                key={role}
                                                type="button"
                                                onClick={() =>
                                                    handleRoleToggle(role)
                                                }
                                                className={`rounded-lg border px-3 py-1 text-xs font-medium transition cursor-pointer ${
                                                    isSelected
                                                        ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-500'
                                                        : 'border-border bg-muted/30 text-muted-foreground hover:border-muted-foreground'
                                                }`}
                                            >
                                                {role}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 border-t border-border pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={isProcessing}
                                    className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? 'Memproses...' : 'Perbarui Pengguna'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
