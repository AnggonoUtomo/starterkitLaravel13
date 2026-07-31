import { Head, usePage } from '@inertiajs/react';
import ConsoleLayout from '@/layouts/ConsoleLayout';
import DashboardHeader from './components/DashboardHeader';
import QuickAccessGrid from './components/QuickAccessGrid';
import RecentActivityWidget from './components/RecentActivityWidget';
import SummaryStatCards from './components/SummaryStatCards';
import SystemHealthWidget from './components/SystemHealthWidget';
import type { DashboardPageProps } from './types';

export default function DashboardIndex({ stats }: DashboardPageProps) {
    const { auth } = usePage<{ auth?: { user?: { name: string } } }>().props;

    return (
        <ConsoleLayout>
            <Head title="Dashboard - Console Admin" />

            <div className="flex flex-col gap-6 p-6">
                {/* Header Welcome */}
                <DashboardHeader userName={auth?.user?.name} />

                {/* 4 Summary Cards */}
                <SummaryStatCards stats={stats} />

                {/* 2-Column Grid: System Health & Recent Activity */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <SystemHealthWidget healthData={stats.system_health} />
                    <RecentActivityWidget activities={stats.recent_activities} />
                </div>

                {/* 10 Submodules Quick Access */}
                <QuickAccessGrid />
            </div>
        </ConsoleLayout>
    );
}
