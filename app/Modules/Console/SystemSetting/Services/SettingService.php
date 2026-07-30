<?php

declare(strict_types=1);

namespace App\Modules\Console\SystemSetting\Services;

use App\Modules\Console\SystemSetting\Domain\Entities\SystemSetting;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\Rules\Password;

class SettingService
{
    /**
     * Default settings for all 10 domain panels.
     *
     * @return array<string, mixed>
     */
    public function defaultEmailSettings(): array
    {
        return [
            'enabled' => false,
            'mailer' => 'log',
            'host' => '127.0.0.1',
            'port' => 587,
            'username' => '',
            'password' => '',
            'password_configured' => false,
            'encryption' => 'tls',
            'from_address' => 'admin@example.com',
            'from_name' => config('app.name', 'Laravel Starter'),
            'send_credentials_on_create' => true,
            'send_credentials_on_password_update' => true,
            'credential_subject' => 'Aktivasi Akun & Credentials Portal',
            'credential_intro' => 'Selamat datang! Berikut kredensial masuk akun Anda:',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function defaultBrandingSettings(): array
    {
        return [
            'app_name' => config('app.name', 'Laravel Starter Kit'),
            'logo_url' => null,
            'favicon_url' => null,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function defaultLocalizationSettings(): array
    {
        return [
            'timezone' => 'Asia/Jakarta',
            'date_format' => 'd M Y',
            'time_format' => 'H:i',
            'datetime_format' => 'd M Y H:i',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function defaultPaginationSettings(): array
    {
        return [
            'default_per_page' => 10,
            'per_page_options' => [5, 10, 15, 25, 50, 100],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function defaultSecurityPolicy(): array
    {
        return [
            'require_email_verification' => false,
            'audit_sensitive_actions' => true,
            'single_session_per_user' => false,
            'allow_account_deletion' => true,
            'session_lifetime_minutes' => 120,
            'login_max_attempts' => 5,
            'login_decay_minutes' => 1,
            'password_confirmation_timeout_seconds' => 10800,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function defaultPasswordPolicy(): array
    {
        return [
            'min_length' => 8,
            'require_uppercase' => true,
            'require_lowercase' => true,
            'require_numbers' => true,
            'require_symbols' => false,
            'uncompromised' => false,
            'expiry_days' => 0,
            'history_count' => 0,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function defaultMaintenanceMode(): array
    {
        return [
            'enabled' => false,
            'active' => false,
            'message' => 'Aplikasi sedang dalam pemeliharaan rutin. Silakan kembali dalam beberapa saat.',
            'page_style' => 'aurora',
            'retry_seconds' => 300,
            'refresh_seconds' => 60,
            'secret' => null,
            'secret_configured' => false,
            'bypass_url' => null,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function defaultMapSettings(): array
    {
        return [
            'enabled' => false,
            'google_maps_api_key' => null,
            'google_maps_map_id' => null,
            'configured' => false,
        ];
    }

    /**
     * Runtime in-memory cache per HTTP request lifecycle.
     *
     * @var array<string, array<string, mixed>>
     */
    protected array $runtimeCache = [];

    /**
     * @param  array<string, mixed>  $default
     * @return array<string, mixed>
     */
    protected function getGroupCached(string $group, array $default): array
    {
        if (isset($this->runtimeCache[$group])) {
            return $this->runtimeCache[$group];
        }

        $settings = SystemSetting::getGroup($group, $default);
        $this->runtimeCache[$group] = $settings;

        return $settings;
    }

    public function clearRuntimeCache(?string $group = null): void
    {
        if ($group) {
            unset($this->runtimeCache[$group]);
        } else {
            $this->runtimeCache = [];
        }
    }

    /**
     * Get settings for a specific group.
     *
     * @return array<string, mixed>
     */
    public function getGroupSettings(string $group): array
    {
        return match ($group) {
            'email' => $this->getEmailSettings(),
            'branding' => $this->getBrandingSettings(),
            'localization' => $this->getLocalizationSettings(),
            'pagination' => $this->getPaginationSettings(),
            'security' => $this->getSecurityPolicy(),
            'password' => $this->getPasswordPolicy(),
            'maintenance' => $this->getMaintenanceMode(),
            'map' => $this->getMapSettings(),
            default => [],
        };
    }

    /**
     * Getters for each domain setting group.
     *
     * @return array<string, mixed>
     */
    public function getEmailSettings(): array
    {
        return $this->getGroupCached('email', $this->defaultEmailSettings());
    }

    private function formatRelativeMediaUrl(?string $url): ?string
    {
        if (! $url) {
            return null;
        }

        $path = parse_url($url, PHP_URL_PATH);

        return $path ?: $url;
    }

    /**
     * @return array<string, mixed>
     */
    public function getBrandingSettings(): array
    {
        $settings = $this->getGroupCached('branding', $this->defaultBrandingSettings());

        $settingModel = SystemSetting::query()->where('key', 'branding')->first();
        if ($settingModel) {
            $logoMedia = $settingModel->getFirstMediaUrl('logo');
            if (! empty($logoMedia)) {
                $settings['logo_url'] = $this->formatRelativeMediaUrl($logoMedia);
            }
            $faviconMedia = $settingModel->getFirstMediaUrl('favicon');
            if (! empty($faviconMedia)) {
                $settings['favicon_url'] = $this->formatRelativeMediaUrl($faviconMedia);
            }
        }

        if (! empty($settings['logo_url'])) {
            $settings['logo_url'] = $this->formatRelativeMediaUrl($settings['logo_url']);
        }
        if (! empty($settings['favicon_url'])) {
            $settings['favicon_url'] = $this->formatRelativeMediaUrl($settings['favicon_url']);
        }

        return $settings;
    }

    /**
     * @return array<string, mixed>
     */
    public function getLocalizationSettings(): array
    {
        $settings = $this->getGroupCached('localization', $this->defaultLocalizationSettings());

        $now = now()->setTimezone($settings['timezone'] ?? 'Asia/Jakarta');
        $settings['preview_date'] = $now->format($this->convertPhpDateFormat($settings['date_format'] ?? 'd M Y'));
        $settings['preview_time'] = $now->format($this->convertPhpDateFormat($settings['time_format'] ?? 'H:i'));
        $settings['preview_datetime'] = $now->format($this->convertPhpDateFormat($settings['datetime_format'] ?? 'd M Y H:i'));

        return $settings;
    }

    /**
     * @return array<string, mixed>
     */
    public function getPaginationSettings(): array
    {
        return $this->getGroupCached('pagination', $this->defaultPaginationSettings());
    }

    /**
     * @return array<string, mixed>
     */
    public function getSecurityPolicy(): array
    {
        return $this->getGroupCached('security', $this->defaultSecurityPolicy());
    }

    /**
     * @return array<string, mixed>
     */
    public function getPasswordPolicy(): array
    {
        return $this->getGroupCached('password', $this->defaultPasswordPolicy());
    }

    /**
     * @return array<string, mixed>
     */
    public function getMaintenanceMode(): array
    {
        return $this->getGroupCached('maintenance', $this->defaultMaintenanceMode());
    }

    /**
     * @return array<string, mixed>
     */
    public function getMapSettings(): array
    {
        return $this->getGroupCached('map', $this->defaultMapSettings());
    }

    /**
     * Updaters for each domain setting group.
     *
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public function updateEmailSettings(array $data): array
    {
        $current = $this->getEmailSettings();

        if (empty($data['password']) && ! empty($current['password'])) {
            $data['password'] = $current['password'];
            $data['password_configured'] = true;
        } else {
            $data['password_configured'] = ! empty($data['password']);
        }

        $this->clearRuntimeCache('email');

        return SystemSetting::setGroup('email', array_merge($current, $data));
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public function updateBrandingSettings(array $data, mixed $logoFile = null, mixed $faviconFile = null): array
    {
        $current = $this->getBrandingSettings();
        $appName = $data['app_name'] ?? $current['app_name'];
        $logoUrl = $current['logo_url'];
        $faviconUrl = $current['favicon_url'];

        $settingModel = SystemSetting::query()->firstOrCreate(
            ['key' => 'branding'],
            ['group' => 'branding']
        );

        if (! empty($data['remove_logo'])) {
            $settingModel->clearMediaCollection('logo');
            $logoUrl = null;
        }

        if (! empty($data['remove_favicon'])) {
            $settingModel->clearMediaCollection('favicon');
            $faviconUrl = null;
        }

        if ($logoFile) {
            $media = $settingModel->addMedia($logoFile)->toMediaCollection('logo');
            $logoUrl = $this->formatRelativeMediaUrl($media->getUrl());
        }

        if ($faviconFile) {
            $media = $settingModel->addMedia($faviconFile)->toMediaCollection('favicon');
            $faviconUrl = $this->formatRelativeMediaUrl($media->getUrl());
        }

        $payload = [
            'app_name' => $appName,
            'logo_url' => $logoUrl,
            'favicon_url' => $faviconUrl,
        ];

        $this->clearRuntimeCache('branding');
        $updated = SystemSetting::setGroup('branding', $payload);
        Config::set('app.name', $appName);

        return $updated;
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public function updateLocalizationSettings(array $data): array
    {
        $current = $this->getLocalizationSettings();
        $timezone = $data['timezone'] ?? 'Asia/Jakarta';
        $dateFormat = $data['date_format'] ?? 'd M Y';
        $timeFormat = $data['time_format'] ?? 'H:i';
        $dateTimeFormat = $dateFormat.' '.$timeFormat;

        $payload = [
            'timezone' => $timezone,
            'date_format' => $dateFormat,
            'time_format' => $timeFormat,
            'datetime_format' => $dateTimeFormat,
        ];

        $this->clearRuntimeCache('localization');

        return SystemSetting::setGroup('localization', array_merge($current, $payload));
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public function updatePaginationSettings(array $data): array
    {
        $current = $this->getPaginationSettings();
        $defaultPerPage = (int) ($data['default_per_page'] ?? 10);
        $options = array_map('intval', (array) ($data['per_page_options'] ?? [5, 10, 15, 25, 50, 100]));
        sort($options);

        if (! in_array($defaultPerPage, $options, true) && ! empty($options)) {
            $options[] = $defaultPerPage;
            sort($options);
        }

        $payload = [
            'default_per_page' => $defaultPerPage,
            'per_page_options' => array_values(array_unique($options)),
        ];

        $this->clearRuntimeCache('pagination');

        return SystemSetting::setGroup('pagination', $payload);
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public function updateSecurityPolicy(array $data): array
    {
        $current = $this->getSecurityPolicy();

        $payload = [
            'require_email_verification' => (bool) ($data['require_email_verification'] ?? false),
            'audit_sensitive_actions' => (bool) ($data['audit_sensitive_actions'] ?? true),
            'single_session_per_user' => (bool) ($data['single_session_per_user'] ?? false),
            'allow_account_deletion' => (bool) ($data['allow_account_deletion'] ?? true),
            'session_lifetime_minutes' => (int) ($data['session_lifetime_minutes'] ?? 120),
            'login_max_attempts' => (int) ($data['login_max_attempts'] ?? 5),
            'login_decay_minutes' => (int) ($data['login_decay_minutes'] ?? 1),
            'password_confirmation_timeout_seconds' => (int) ($data['password_confirmation_timeout_seconds'] ?? 10800),
        ];

        $this->clearRuntimeCache('security');

        return SystemSetting::setGroup('security', array_merge($current, $payload));
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public function updatePasswordPolicy(array $data): array
    {
        $current = $this->getPasswordPolicy();

        $payload = [
            'min_length' => (int) ($data['min_length'] ?? 8),
            'require_uppercase' => (bool) ($data['require_uppercase'] ?? true),
            'require_lowercase' => (bool) ($data['require_lowercase'] ?? true),
            'require_numbers' => (bool) ($data['require_numbers'] ?? true),
            'require_symbols' => (bool) ($data['require_symbols'] ?? false),
            'uncompromised' => (bool) ($data['uncompromised'] ?? false),
            'expiry_days' => (int) ($data['expiry_days'] ?? 0),
            'history_count' => (int) ($data['history_count'] ?? 0),
        ];

        $this->clearRuntimeCache('password');

        return SystemSetting::setGroup('password', array_merge($current, $payload));
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public function updateMaintenanceMode(array $data): array
    {
        $current = $this->getMaintenanceMode();
        $secret = $data['secret'] ?? null;
        $secretConfigured = ! empty($secret) || ! empty($current['secret']);

        $payload = [
            'enabled' => (bool) ($data['enabled'] ?? false),
            'active' => (bool) ($data['enabled'] ?? false),
            'message' => $data['message'] ?? 'Aplikasi sedang dalam pemeliharaan rutin.',
            'page_style' => $data['page_style'] ?? 'aurora',
            'retry_seconds' => (int) ($data['retry_seconds'] ?? 300),
            'refresh_seconds' => (int) ($data['refresh_seconds'] ?? 60),
            'secret' => $secret ?: ($current['secret'] ?? null),
            'secret_configured' => $secretConfigured,
            'bypass_url' => ($secret || ($current['secret'] ?? null)) ? url('/'.($secret ?: $current['secret'])) : null,
        ];

        $this->clearRuntimeCache('maintenance');

        return SystemSetting::setGroup('maintenance', array_merge($current, $payload));
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public function updateMapSettings(array $data): array
    {
        $current = $this->getMapSettings();
        $apiKey = $data['google_maps_api_key'] ?? null;
        $mapId = $data['google_maps_map_id'] ?? null;

        $payload = [
            'enabled' => (bool) ($data['enabled'] ?? false),
            'google_maps_api_key' => $apiKey,
            'google_maps_map_id' => $mapId,
            'configured' => ! empty($apiKey),
        ];

        $this->clearRuntimeCache('map');

        return SystemSetting::setGroup('map', array_merge($current, $payload));
    }

    /**
     * Apply all global settings to Laravel's runtime config on app boot.
     */
    public function applyGlobalSettings(): void
    {
        try {
            $this->applyBrandingSettings();
            $this->applyLocalizationSettings();
            $this->applyMailSettings();
            $this->applyPasswordPolicy();
            $this->applySecurityPolicy();
        } catch (\Throwable $e) {
            // Fail safe during early migration/cli execution
        }
    }

    public function applyBrandingSettings(): void
    {
        $branding = $this->getBrandingSettings();
        if (! empty($branding['app_name'])) {
            Config::set('app.name', $branding['app_name']);
        }
    }

    public function applyLocalizationSettings(): void
    {
        $localization = $this->getLocalizationSettings();
        if (! empty($localization['timezone'])) {
            date_default_timezone_set($localization['timezone']);
            Config::set('app.timezone', $localization['timezone']);
        }
    }

    public function applyMailSettings(): void
    {
        $email = $this->getEmailSettings();
        if (! empty($email['enabled']) && ! empty($email['mailer'])) {
            Config::set('mail.default', $email['mailer']);
            if ($email['mailer'] === 'smtp') {
                Config::set('mail.mailers.smtp.host', $email['host'] ?? '127.0.0.1');
                Config::set('mail.mailers.smtp.port', $email['port'] ?? 587);
                Config::set('mail.mailers.smtp.username', $email['username'] ?? '');
                if (! empty($email['password'])) {
                    Config::set('mail.mailers.smtp.password', $email['password']);
                }
                Config::set('mail.mailers.smtp.scheme', $email['encryption'] ?? 'tls');
            }
            if (! empty($email['from_address'])) {
                Config::set('mail.from.address', $email['from_address']);
                Config::set('mail.from.name', $email['from_name'] ?? config('app.name'));
            }
        }
    }

    public function applyPasswordPolicy(): void
    {
        $password = $this->getPasswordPolicy();
        Password::defaults(function () use ($password) {
            $rule = Password::min($password['min_length'] ?? 8);

            if (! empty($password['require_uppercase'])) {
                $rule->mixedCase();
            }
            if (! empty($password['require_numbers'])) {
                $rule->numbers();
            }
            if (! empty($password['require_symbols'])) {
                $rule->symbols();
            }
            if (! empty($password['uncompromised'])) {
                $rule->uncompromised();
            }

            return $rule;
        });
    }

    public function applySecurityPolicy(): void
    {
        $security = $this->getSecurityPolicy();
        if (! empty($security['session_lifetime_minutes'])) {
            Config::set('session.lifetime', $security['session_lifetime_minutes']);
        }
        if (! empty($security['password_confirmation_timeout_seconds'])) {
            Config::set('auth.password_timeout', $security['password_confirmation_timeout_seconds']);
        }
    }

    public function formatDateTime(?\DateTimeInterface $date, string $type = 'date'): ?string
    {
        if (! $date) {
            return null;
        }

        $localization = $this->getLocalizationSettings();
        $tz = $localization['timezone'] ?? 'Asia/Jakarta';

        $carbon = Carbon::instance($date)->setTimezone($tz);

        $format = match ($type) {
            'time' => $localization['time_format'] ?? 'H:i',
            'datetime' => $localization['datetime_format'] ?? 'd M Y H:i',
            default => $localization['date_format'] ?? 'd M Y',
        };

        return $carbon->format($format);
    }

    /**
     * @return array<string, mixed>
     */
    public function getSystemSettingsViewProps(SystemHealthService $healthService): array
    {
        return [
            'title' => 'System Settings & Health Status',
            'emailSettings' => $this->getEmailSettings(),
            'brandingSettings' => $this->getBrandingSettings(),
            'localizationSettings' => $this->getLocalizationSettings(),
            'paginationSettings' => $this->getPaginationSettings(),
            'securityPolicy' => $this->getSecurityPolicy(),
            'passwordPolicy' => $this->getPasswordPolicy(),
            'maintenanceMode' => $this->getMaintenanceMode(),
            'mapSettings' => $this->getMapSettings(),
            'systemHealth' => $healthService->getHealthStatus(),
            'environmentInfo' => $healthService->getEnvironmentInfo(),
            'can' => [
                'update' => true,
            ],
        ];
    }

    private function convertPhpDateFormat(string $format): string
    {
        return $format;
    }
}
