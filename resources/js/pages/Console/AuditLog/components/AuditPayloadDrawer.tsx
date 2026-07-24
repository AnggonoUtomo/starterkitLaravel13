import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import React from 'react';

interface AuditLog {
    id: string;
    event_name: string;
    caused_by_user_id?: number | null;
    caused_by_user_name: string;
    payload: Record<string, any>;
    timestamp: string;
}

interface AuditPayloadDrawerProps {
    selectedLog: AuditLog | null;
    onClose: () => void;
}

export default function AuditPayloadDrawer({
    selectedLog,
    onClose,
}: AuditPayloadDrawerProps) {
    return (
        <AnimatePresence>
            {selectedLog && (
                <div className="fixed inset-0 z-50 flex justify-end bg-background/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{
                            type: 'spring',
                            damping: 25,
                            stiffness: 200,
                        }}
                        className="h-full w-full max-w-lg overflow-y-auto border-l border-border bg-card p-6 shadow-2xl"
                    >
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-foreground">
                                    {selectedLog.event_name}
                                </h3>
                                <div className="mt-0.5 font-mono text-xs font-semibold text-amber-500">
                                    Caused by: {selectedLog.caused_by_user_name}
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="cursor-pointer text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div>
                                <div className="mb-1 text-xs font-semibold text-muted-foreground">
                                    Timestamp
                                </div>
                                <div className="rounded-lg border border-border bg-muted/50 p-2.5 font-mono text-xs text-foreground">
                                    {selectedLog.timestamp}
                                </div>
                            </div>

                            <div>
                                <div className="mb-1 text-xs font-semibold text-muted-foreground">
                                    JSON Payload
                                </div>
                                <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 font-mono text-xs text-emerald-500">
                                    {JSON.stringify(
                                        selectedLog.payload,
                                        null,
                                        2,
                                    )}
                                </pre>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
