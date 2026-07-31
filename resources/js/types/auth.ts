export type User = {
    id: number | string;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type Auth = {
    user: User | null;
    super?: boolean;
    roles?: Record<string, boolean>;
    permissions?: Record<string, boolean>;
    impersonator?: {
        id: string;
        name: string;
    } | null;
};

export type SharedData = {
    name?: string;
    branding?: {
        app_name?: string;
        logo_url?: string;
        favicon_url?: string;
    };
    auth: Auth;
    flash?: {
        success?: string | null;
        error?: string | null;
    };
    [key: string]: unknown;
};

/* @chisel-passkeys */
export type Passkey = {
    id: number;
    name: string;
    authenticator: string | null;
    created_at_diff: string;
    last_used_at_diff: string | null;
};
/* @end-chisel-passkeys */

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
