import { FileText } from 'lucide-react';
import React from 'react';
import ConsolePageHeader from '@/components/console/ConsolePageHeader';

import type { AuditLogHeaderProps } from '../types';

export default function AuditLogHeader({ title }: AuditLogHeaderProps) {
    return (
        <ConsolePageHeader
            title={title}
            description="Visual inspection of domain security events, user activity, and system changes."
            icon={FileText}
            iconColor="text-amber-500"
        />
    );
}
