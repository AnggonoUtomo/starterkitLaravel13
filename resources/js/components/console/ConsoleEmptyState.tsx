import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';
import React from 'react';

interface ConsoleEmptyStateProps {
    title?: string;
    description?: string;
    icon?: LucideIcon;
    colSpan?: number;
}

export default function ConsoleEmptyState({
    title = 'No data found',
    description = 'Try adjusting your search or filter to find what you looking for.',
    icon: Icon = Inbox,
    colSpan = 1,
}: ConsoleEmptyStateProps) {
    return (
        <tr>
            <td colSpan={colSpan} className="px-6 py-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center space-y-3"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/60 text-muted-foreground ring-8 ring-muted/20">
                        <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-foreground">
                            {title}
                        </h4>
                        <p className="max-w-sm text-xs text-muted-foreground">
                            {description}
                        </p>
                    </div>
                </motion.div>
            </td>
        </tr>
    );
}
