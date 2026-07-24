import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import React from 'react';

interface CreateRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    roleName: string;
    onRoleNameChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export default function CreateRoleModal({
    isOpen,
    onClose,
    roleName,
    onRoleNameChange,
    onSubmit,
}: CreateRoleModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl"
                    >
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <h3 className="text-lg font-bold text-foreground">
                                Create New Role
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
                                    Role Name
                                </label>
                                <input
                                    type="text"
                                    value={roleName}
                                    onChange={(e) =>
                                        onRoleNameChange(e.target.value)
                                    }
                                    placeholder="e.g. Editor, Supervisor"
                                    required
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="flex justify-end gap-2 border-t border-border pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 cursor-pointer"
                                >
                                    Create Role
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
