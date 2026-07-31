import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

export function usePermission() {
    const { auth } = usePage<SharedData>().props;

    const permissions = auth?.permissions ?? {};
    const roles = auth?.roles ?? {};
    const isSuperSystem = auth?.super === true;

    const can = (permission: string): boolean => {
        return isSuperSystem || permissions[permission] === true;
    };

    const canAny = (permissionList: string[]): boolean => {
        return isSuperSystem || permissionList.some((permission) => permissions[permission] === true);
    };

    const hasRole = (role: string): boolean => {
        return isSuperSystem || roles[role] === true;
    };

    return {
        user: auth?.user ?? null,
        roles,
        permissions,
        isSuperSystem,
        can,
        canAny,
        hasRole,
    };
}
