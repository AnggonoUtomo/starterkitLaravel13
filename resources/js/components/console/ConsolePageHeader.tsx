import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import React from 'react';

interface ConsolePageHeaderProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    iconColor?: string;
    action?: ReactNode;
}

export default function ConsolePageHeader({
    title,
    description,
    icon: Icon,
    iconColor = 'text-indigo-500',
    action,
}: ConsolePageHeaderProps) {
    return (
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
                <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-foreground">
                    {Icon && <Icon className={`h-6 w-6 ${iconColor}`} />}
                    <span>{title}</span>
                </h1>
                {description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}
