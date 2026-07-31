import { Head, useForm } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import ConsoleLayout from '@/layouts/ConsoleLayout';
import { BrandingSettingsPanel } from './components/BrandingSettingsPanel';
import { EmailSettingsPanel } from './components/EmailSettingsPanel';
import { EnvironmentInfoPanel } from './components/EnvironmentInfoPanel';
import { LocalizationSettingsPanel } from './components/LocalizationSettingsPanel';
import { MaintenanceModePanel } from './components/MaintenanceModePanel';
import { MapSettingsPanel } from './components/MapSettingsPanel';
import { PaginationSettingsPanel } from './components/PaginationSettingsPanel';
import { PasswordPolicyPanel } from './components/PasswordPolicyPanel';
import { SecurityPolicyPanel } from './components/SecurityPolicyPanel';
import { SystemHealthPanel } from './components/SystemHealthPanel';
import { SystemSettingMenu } from './components/SystemSettingMenu';
import { retryMaximumSeconds, retryMinimumSeconds } from './options';
import type {
    BrandingForm,
    EmailSettingForm,
    LocalizationForm,
    MaintenanceModeForm,
    MapSettingForm,
    PaginationForm,
    PasswordPolicyForm,
    RetryUnit,
    SecurityPolicyForm,
    SystemSettingSection,
    SystemSettingsProps,
    TestEmailForm,
} from './types';
import {
    filePreview,
    formatSecondsBreakdown,
    retryPartsToSeconds,
    retrySecondsToParts,
} from './utils';

const sectionLabels: Record<SystemSettingSection, string> = {
    email: 'Email & SMTP',
    branding: 'App Name & Logo',
    localization: 'Timezone & Date',
    pagination: 'Default Pagination',
    security: 'Security Policy',
    password: 'Password Policy',
    maintenance: 'Maintenance Mode',
    map: 'Google Maps',
    health: 'System Health',
    environment: 'Environment Info',
};

const defaultEmailSettings = {
    enabled: false,
    mailer: 'log' as const,
    host: '',
    port: 587,
    username: '',
    password: '',
    password_configured: false,
    encryption: 'tls' as const,
    from_address: 'admin@example.com',
    from_name: 'Laravel Starter',
    send_credentials_on_create: true,
    send_credentials_on_password_update: true,
    credential_subject: 'Aktivasi Akun',
    credential_intro: 'Selamat datang.',
};

const defaultBrandingSettings = {
    app_name: 'Laravel Starter Kit',
    logo_url: null,
    favicon_url: null,
};

const defaultLocalizationSettings = {
    timezone: 'Asia/Jakarta',
    date_format: 'd M Y',
    time_format: 'H:i',
    datetime_format: 'd M Y H:i',
    preview_date: '31 Jan 2026',
    preview_time: '23:45',
    preview_datetime: '31 Jan 2026 23:45',
};

const defaultPaginationSettings = {
    default_per_page: 10,
    per_page_options: [5, 10, 15, 25, 50, 100],
    min_search_chars: 3,
};

const defaultSecurityPolicy = {
    require_email_verification: false,
    audit_sensitive_actions: true,
    single_session_per_user: false,
    allow_account_deletion: true,
    session_lifetime_minutes: 120,
    login_max_attempts: 5,
    login_decay_minutes: 1,
    password_confirmation_timeout_seconds: 10800,
};

const defaultPasswordPolicy = {
    min_length: 8,
    require_uppercase: true,
    require_lowercase: true,
    require_numbers: true,
    require_symbols: false,
    uncompromised: false,
    expiry_days: 0,
    history_count: 0,
};

const defaultMaintenanceMode = {
    enabled: false,
    active: false,
    message: 'Aplikasi sedang dalam pemeliharaan rutin.',
    page_style: 'aurora' as const,
    retry_seconds: 300,
    refresh_seconds: 60,
    secret: null,
    secret_configured: false,
    bypass_url: null,
};

const defaultMapSettings = {
    enabled: false,
    google_maps_api_key: null,
    google_maps_map_id: null,
    configured: false,
};

const defaultSystemHealth = {
    summary: {
        status: 'ok' as const,
        ok: 6,
        warning: 0,
        error: 0,
        checked_at: new Date().toLocaleString('id-ID'),
    },
    runtime: { environment: 'local', debug: true },
    checks: [],
};

const defaultEnvironmentInfo = {
    summary: {
        mode: 'local',
        generated_at: new Date().toLocaleString('id-ID'),
        notice: 'Read-only environment diagnostics',
    },
    groups: [],
};

export default function Index(props: Partial<SystemSettingsProps>) {
    const emailSettings = props.emailSettings ?? defaultEmailSettings;
    const brandingSettings = props.brandingSettings ?? defaultBrandingSettings;
    const localizationSettings =
        props.localizationSettings ?? defaultLocalizationSettings;
    const paginationSettings =
        props.paginationSettings ?? defaultPaginationSettings;
    const securityPolicy = props.securityPolicy ?? defaultSecurityPolicy;
    const passwordPolicy = props.passwordPolicy ?? defaultPasswordPolicy;
    const maintenanceMode = props.maintenanceMode ?? defaultMaintenanceMode;
    const mapSettings = props.mapSettings ?? defaultMapSettings;
    const systemHealth = props.systemHealth ?? defaultSystemHealth;
    const environmentInfo = props.environmentInfo ?? defaultEnvironmentInfo;
    const can = props.can ?? { update: true };

    const [activeSection, setActiveSection] =
        useState<SystemSettingSection>('email');

    const form = useForm<EmailSettingForm>({
        enabled: emailSettings.enabled,
        mailer: emailSettings.mailer,
        host: emailSettings.host ?? '',
        port: emailSettings.port ? String(emailSettings.port) : '',
        username: emailSettings.username ?? '',
        password: '',
        encryption: emailSettings.encryption ?? 'none',
        from_address: emailSettings.from_address,
        from_name: emailSettings.from_name,
        send_credentials_on_create: emailSettings.send_credentials_on_create,
        send_credentials_on_password_update:
            emailSettings.send_credentials_on_password_update,
        credential_subject: emailSettings.credential_subject ?? '',
        credential_intro: emailSettings.credential_intro ?? '',
    });

    const brandingForm = useForm<BrandingForm>({
        app_name: brandingSettings.app_name,
        logo: null,
        favicon: null,
        remove_logo: false,
        remove_favicon: false,
    });

    const localizationForm = useForm<LocalizationForm>({
        timezone: localizationSettings.timezone,
        date_format: localizationSettings.date_format,
        time_format: localizationSettings.time_format,
    });

    const paginationForm = useForm<PaginationForm>({
        default_per_page: String(paginationSettings.default_per_page),
        per_page_options: paginationSettings.per_page_options,
        min_search_chars: String(paginationSettings.min_search_chars ?? 3),
    });

    const securityForm = useForm<SecurityPolicyForm>({
        require_email_verification: securityPolicy.require_email_verification,
        audit_sensitive_actions: securityPolicy.audit_sensitive_actions,
        single_session_per_user: securityPolicy.single_session_per_user,
        allow_account_deletion: securityPolicy.allow_account_deletion,
        session_lifetime_minutes: String(
            securityPolicy.session_lifetime_minutes,
        ),
        login_max_attempts: String(securityPolicy.login_max_attempts),
        login_decay_minutes: String(securityPolicy.login_decay_minutes),
        password_confirmation_timeout_seconds: String(
            securityPolicy.password_confirmation_timeout_seconds,
        ),
    });

    const passwordPolicyForm = useForm<PasswordPolicyForm>({
        min_length: String(passwordPolicy.min_length),
        require_uppercase: passwordPolicy.require_uppercase,
        require_lowercase: passwordPolicy.require_lowercase,
        require_numbers: passwordPolicy.require_numbers,
        require_symbols: passwordPolicy.require_symbols,
        uncompromised: passwordPolicy.uncompromised,
        expiry_days: String(passwordPolicy.expiry_days),
        history_count: String(passwordPolicy.history_count),
    });

    const maintenanceForm = useForm<MaintenanceModeForm>({
        enabled: maintenanceMode.enabled,
        message: maintenanceMode.message ?? '',
        page_style: maintenanceMode.page_style ?? 'aurora',
        retry_seconds: maintenanceMode.retry_seconds
            ? String(maintenanceMode.retry_seconds)
            : '',
        refresh_seconds: maintenanceMode.refresh_seconds
            ? String(maintenanceMode.refresh_seconds)
            : '',
        secret: '',
    });

    const mapForm = useForm<MapSettingForm>({
        enabled: mapSettings.enabled,
        google_maps_api_key: mapSettings.google_maps_api_key ?? '',
        google_maps_map_id: mapSettings.google_maps_map_id ?? '',
    });

    const testForm = useForm<TestEmailForm>({
        recipient: '',
    });

    const initialRetry = retrySecondsToParts(maintenanceMode.retry_seconds);
    const [retryAmount, setRetryAmount] = useState(initialRetry.amount);
    const [retryUnit, setRetryUnit] = useState<RetryUnit>(initialRetry.unit);
    const retrySecondsPreview =
        Number(retryPartsToSeconds(retryAmount, retryUnit)) || null;
    const retryBreakdownPreview = formatSecondsBreakdown(retrySecondsPreview);
    const retryIsOutOfRange =
        retrySecondsPreview !== null &&
        (retrySecondsPreview < retryMinimumSeconds ||
            retrySecondsPreview > retryMaximumSeconds);

    const logoPreview = useMemo(
        () =>
            filePreview(
                brandingForm.data.logo,
                brandingSettings.logo_url,
                brandingForm.data.remove_logo,
            ),
        [
            brandingForm.data.logo,
            brandingForm.data.remove_logo,
            brandingSettings.logo_url,
        ],
    );
    const faviconPreview = useMemo(
        () =>
            filePreview(
                brandingForm.data.favicon,
                brandingSettings.favicon_url,
                brandingForm.data.remove_favicon,
            ),
        [
            brandingForm.data.favicon,
            brandingForm.data.remove_favicon,
            brandingSettings.favicon_url,
        ],
    );

    const submit = (event: FormEvent) => {
        event.preventDefault();
        form.put('/console/system-settings/email', { preserveScroll: true });
    };

    const submitBranding = (event: FormEvent) => {
        event.preventDefault();
        brandingForm.post('/console/system-settings/branding', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const submitLocalization = (event: FormEvent) => {
        event.preventDefault();
        localizationForm.put('/console/system-settings/localization', {
            preserveScroll: true,
        });
    };

    const submitPagination = (event: FormEvent) => {
        event.preventDefault();
        paginationForm.put('/console/system-settings/pagination', {
            preserveScroll: true,
        });
    };

    const submitSecurityPolicy = (event: FormEvent) => {
        event.preventDefault();
        securityForm.put('/console/system-settings/security-policy', {
            preserveScroll: true,
        });
    };

    const submitPasswordPolicy = (event: FormEvent) => {
        event.preventDefault();
        passwordPolicyForm.put('/console/system-settings/password-policy', {
            preserveScroll: true,
        });
    };

    const submitMaintenanceMode = (event: FormEvent) => {
        event.preventDefault();
        maintenanceForm.transform((data) => ({
            ...data,
            retry_seconds: retryPartsToSeconds(retryAmount, retryUnit),
        }));
        maintenanceForm.put('/console/system-settings/maintenance-mode', {
            preserveScroll: true,
        });
    };

    const submitMapSettings = (event: FormEvent) => {
        event.preventDefault();
        mapForm.put('/console/system-settings/map', { preserveScroll: true });
    };

    const togglePerPageOption = (option: number, checked: boolean) => {
        const nextOptions = checked
            ? [...paginationForm.data.per_page_options, option]
            : paginationForm.data.per_page_options.filter(
                  (item) => item !== option,
              );

        const sortedOptions = [...new Set(nextOptions)].sort((a, b) => a - b);
        paginationForm.setData('per_page_options', sortedOptions);

        if (
            !sortedOptions.includes(
                Number(paginationForm.data.default_per_page),
            ) &&
            sortedOptions.length > 0
        ) {
            paginationForm.setData(
                'default_per_page',
                String(sortedOptions[0]),
            );
        }
    };

    const submitTestEmail = (event: FormEvent) => {
        event.preventDefault();
        testForm.post('/console/system-settings/email/test', {
            preserveScroll: true,
        });
    };

    const mailerUsesSmtp = form.data.mailer === 'smtp';

    return (
        <ConsoleLayout>
            <Head title="System Settings" />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6">
                {/* Header Submodul */}
                <div className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
                            <Settings className="size-6 text-emerald-600 dark:text-emerald-400" />
                            <span>System Settings</span>
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            Kelola identitas aplikasi, email, kebijakan
                            keamanan, dan konfigurasi sistem inti secara
                            terpusat.
                        </p>
                    </div>
                    <Badge
                        variant="outline"
                        className="w-fit px-3 py-1 font-mono text-xs"
                    >
                        {sectionLabels[activeSection]}
                    </Badge>
                </div>

                {/* Grid Split View: Sidebar Menu (Left) & Main Active Panel (Right) */}
                <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
                    <SystemSettingMenu
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                    />

                    {activeSection === 'email' ? (
                        <EmailSettingsPanel
                            can={can}
                            emailSettings={emailSettings}
                            form={form}
                            testForm={testForm}
                            mailerUsesSmtp={mailerUsesSmtp}
                            submit={submit}
                            submitTestEmail={submitTestEmail}
                        />
                    ) : activeSection === 'branding' ? (
                        <BrandingSettingsPanel
                            can={can}
                            form={brandingForm}
                            logoPreview={logoPreview}
                            faviconPreview={faviconPreview}
                            submit={submitBranding}
                        />
                    ) : activeSection === 'localization' ? (
                        <LocalizationSettingsPanel
                            can={can}
                            localizationSettings={localizationSettings}
                            form={localizationForm}
                            submit={submitLocalization}
                        />
                    ) : activeSection === 'pagination' ? (
                        <PaginationSettingsPanel
                            can={can}
                            paginationSettings={paginationSettings}
                            form={paginationForm}
                            togglePerPageOption={togglePerPageOption}
                            submit={submitPagination}
                        />
                    ) : activeSection === 'security' ? (
                        <SecurityPolicyPanel
                            can={can}
                            securityPolicy={securityPolicy}
                            form={securityForm}
                            submit={submitSecurityPolicy}
                        />
                    ) : activeSection === 'password' ? (
                        <PasswordPolicyPanel
                            can={can}
                            passwordPolicy={passwordPolicy}
                            form={passwordPolicyForm}
                            submit={submitPasswordPolicy}
                        />
                    ) : activeSection === 'health' ? (
                        <SystemHealthPanel systemHealth={systemHealth} />
                    ) : activeSection === 'environment' ? (
                        <EnvironmentInfoPanel
                            environmentInfo={environmentInfo}
                        />
                    ) : activeSection === 'map' ? (
                        <MapSettingsPanel
                            can={can}
                            mapSettings={mapSettings}
                            form={mapForm}
                            submit={submitMapSettings}
                        />
                    ) : (
                        <MaintenanceModePanel
                            can={can}
                            maintenanceMode={maintenanceMode}
                            form={maintenanceForm}
                            retryAmount={retryAmount}
                            retryUnit={retryUnit}
                            retrySecondsPreview={retrySecondsPreview}
                            retryBreakdownPreview={retryBreakdownPreview}
                            retryIsOutOfRange={retryIsOutOfRange}
                            setRetryAmount={setRetryAmount}
                            setRetryUnit={setRetryUnit}
                            submit={submitMaintenanceMode}
                        />
                    )}
                </div>
            </div>
        </ConsoleLayout>
    );
}
