import { Link, router } from '@inertiajs/react';
import { LogOut, Settings, Palette } from 'lucide-react';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import type { User } from '@/types';

type Props = {
    user: User;
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <div className="flex flex-col">
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 rounded-t-lg bg-gradient-to-r from-emerald-500/10 to-transparent p-2 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-0" />
            <DropdownMenuGroup className="p-1">
                <DropdownMenuItem asChild>
                    <Link
                        className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium"
                        href="/console/profile"
                        prefetch
                        onClick={cleanup}
                    >
                        <UserInfo user={user} showEmail={false} />
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-0" />

            {/* Card Footer: Settings, Appearance, Logout */}
            <div className="flex items-center justify-between gap-1 rounded-b-lg border-t border-border bg-muted/30 p-2">
                <Link
                    href="/console/system-settings"
                    onClick={cleanup}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-md border border-border/60 bg-background px-2 py-1 text-[11px] font-semibold text-foreground shadow-2xs transition hover:bg-blue-500/10 hover:text-blue-500"
                >
                    <Settings className="size-3 text-blue-500" />
                    <span>Setting</span>
                </Link>

                <Link
                    href="/settings/appearance"
                    onClick={cleanup}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-md border border-border/60 bg-background px-2 py-1 text-[11px] font-semibold text-foreground shadow-2xs transition hover:bg-amber-500/10 hover:text-amber-500"
                >
                    <Palette className="size-3 text-amber-500" />
                    <span>Appearance</span>
                </Link>

                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                    className="flex cursor-pointer items-center justify-center rounded-md border border-rose-500/30 bg-rose-500/10 px-2 py-1 text-[11px] font-semibold text-rose-500 shadow-2xs transition hover:bg-rose-500/20"
                >
                    <LogOut className="size-3" />
                    <span className="sr-only">Log out</span>
                </Link>
            </div>
        </div>
    );
}
