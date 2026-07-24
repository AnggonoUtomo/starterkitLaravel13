import { HelpCircle } from 'lucide-react';
import React from 'react';
import { Label } from '@/components/ui/label';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

type FieldInfoLabelProps = {
    htmlFor?: string;
    label: string;
    required?: boolean;
    tooltip?: string;
    className?: string;
};

export function FieldInfoLabel({
    htmlFor,
    label,
    required = false,
    tooltip,
    className = '',
}: FieldInfoLabelProps) {
    return (
        <TooltipProvider>
            <div className={`flex items-center gap-1.5 ${className}`}>
                <Label
                    htmlFor={htmlFor}
                    className="text-xs font-semibold text-foreground"
                >
                    {label}
                    {required && (
                        <span className="ml-0.5 font-bold text-rose-500">
                            *
                        </span>
                    )}
                </Label>
                {tooltip && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                type="button"
                                tabIndex={-1}
                                onFocus={(e) => e.preventDefault()}
                                className="inline-flex items-center justify-center rounded text-muted-foreground/70 transition-colors hover:text-foreground focus:ring-1 focus:ring-ring focus:outline-none"
                                aria-label={`Informasi untuk ${label}`}
                            >
                                <HelpCircle className="size-3.5" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs text-xs">
                            <p>{tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                )}
            </div>
        </TooltipProvider>
    );
}
