import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

const shortcuts = [
    { keys: 'Ctrl / Cmd + Shift + A', label: 'Tambah role baru' },
    { keys: 'Alt + R', label: 'Fokus pilihan role' },
    { keys: 'Alt + P', label: 'Fokus pencarian izin' },
    { keys: 'Ctrl / Cmd + S', label: 'Simpan matriks izin' },
    { keys: 'Delete', label: 'Hapus role aktif' },
];

export default function AccessControlShortcutPanel() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left transition hover:bg-muted/30 cursor-pointer"
            >
                <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-500">
                        <Keyboard className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">
                            Keyboard Shortcuts
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Perintah cepat papan ketik untuk mengelola role dan izin submodul.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="hidden text-xs font-medium text-indigo-500 sm:inline-block">
                        {isOpen ? 'Sembunyikan' : 'Tampilkan Pintasan'}
                    </span>
                    <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-indigo-500' : ''
                        }`}
                    />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="border-t border-border bg-muted/20 p-4">
                            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                {shortcuts.map((shortcut) => (
                                    <div
                                        key={shortcut.keys}
                                        className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2 text-xs shadow-xs"
                                    >
                                        <span className="text-muted-foreground font-medium">
                                            {shortcut.label}
                                        </span>
                                        <kbd className="shrink-0 rounded border border-border bg-muted px-2 py-0.5 font-mono text-[11px] font-semibold text-foreground">
                                            {shortcut.keys}
                                        </kbd>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
