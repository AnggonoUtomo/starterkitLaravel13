<?php

namespace App\Modules\Console\SystemSetting\Services;

use App\Shared\Providers\ModuleServiceProvider;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class SystemHealthService
{
    /**
     * Get system health metrics and diagnostic checks.
     */
    public function getHealthStatus(): array
    {
        $checks = [];
        $okCount = 0;
        $warningCount = 0;
        $errorCount = 0;

        // 1. Database Check
        try {
            DB::connection()->getPdo();
            $checks[] = [
                'name' => 'Database Connection',
                'description' => 'Koneksi ke basis data MySQL/SQLite utama',
                'status' => 'ok',
                'value' => 'Terhubung ('.DB::connection()->getDriverName().')',
                'meta' => DB::connection()->getDatabaseName(),
                'message' => 'Koneksi ke database berjalan normal dan stabil.',
            ];
            $okCount++;
        } catch (\Throwable $e) {
            $checks[] = [
                'name' => 'Database Connection',
                'description' => 'Koneksi ke basis data MySQL/SQLite utama',
                'status' => 'error',
                'value' => 'Gagal',
                'meta' => null,
                'message' => 'Gagal terhubung ke database: '.$e->getMessage(),
            ];
            $errorCount++;
        }

        // 2. Cache Driver Check
        try {
            Cache::put('health_test_key', true, 10);
            $cacheVal = Cache::get('health_test_key');
            $checks[] = [
                'name' => 'Cache System',
                'description' => 'Driver cache ('.config('cache.default').')',
                'status' => $cacheVal ? 'ok' : 'warning',
                'value' => config('cache.default'),
                'meta' => 'TTL Test Passed',
                'message' => 'Penyimpanan cache berfungsi dengan baik.',
            ];
            $okCount++;
        } catch (\Throwable $e) {
            $checks[] = [
                'name' => 'Cache System',
                'description' => 'Driver cache ('.config('cache.default').')',
                'status' => 'error',
                'value' => config('cache.default'),
                'meta' => null,
                'message' => 'Error pada sistem cache: '.$e->getMessage(),
            ];
            $errorCount++;
        }

        // 3. Storage Disk Check
        try {
            $diskWrite = Storage::disk('public')->put('health_check.txt', 'OK');
            Storage::disk('public')->delete('health_check.txt');
            $checks[] = [
                'name' => 'Storage Public Disk',
                'description' => 'Akses tulis/hapus ke direktori storage/app/public',
                'status' => $diskWrite ? 'ok' : 'error',
                'value' => 'Writable',
                'meta' => 'public disk',
                'message' => 'Direktori penyimpanan media memiliki hak akses yang sesuai.',
            ];
            $okCount++;
        } catch (\Throwable $e) {
            $checks[] = [
                'name' => 'Storage Public Disk',
                'description' => 'Akses tulis/hapus ke direktori storage/app/public',
                'status' => 'error',
                'value' => 'Read-Only / Error',
                'meta' => null,
                'message' => 'Gagal menulis ke storage disk: '.$e->getMessage(),
            ];
            $errorCount++;
        }

        // 4. Session Lifetime Check
        $sessionLifetime = config('session.lifetime', 120);
        $checks[] = [
            'name' => 'Session Security',
            'description' => 'Lifetime sesi pengguna ('.config('session.driver').')',
            'status' => 'ok',
            'value' => $sessionLifetime.' menit',
            'meta' => config('session.driver'),
            'message' => 'Durasi sesi terkonfigurasi secara aman.',
        ];
        $okCount++;

        // 5. Environment & Debug Check
        $isProduction = app()->isProduction();
        $debugMode = config('app.debug');
        $checks[] = [
            'name' => 'App Runtime Environment',
            'description' => 'Status environment dan mode debug',
            'status' => ($isProduction && $debugMode) ? 'warning' : 'ok',
            'value' => config('app.env'),
            'meta' => 'Debug: '.($debugMode ? 'ON' : 'OFF'),
            'message' => ($isProduction && $debugMode)
                ? 'PERINGATAN: Mode Debug aktif pada environment Produksi!'
                : 'Status environment aman.',
        ];
        if ($isProduction && $debugMode) {
            $warningCount++;
        } else {
            $okCount++;
        }

        $overallStatus = $errorCount > 0 ? 'error' : ($warningCount > 0 ? 'warning' : 'ok');

        return [
            'summary' => [
                'status' => $overallStatus,
                'ok' => $okCount,
                'warning' => $warningCount,
                'error' => $errorCount,
                'checked_at' => now()->format('d M Y H:i:s'),
            ],
            'runtime' => [
                'environment' => config('app.env'),
                'debug' => (bool) config('app.debug'),
                'php_version' => PHP_VERSION,
                'laravel_version' => app()->version(),
                'timezone' => config('app.timezone'),
                'locale' => config('app.locale'),
            ],
            'checks' => $checks,
        ];
    }

    /**
     * Get read-only environment diagnostics group.
     */
    public function getEnvironmentInfo(): array
    {
        return [
            'summary' => [
                'mode' => config('app.env'),
                'generated_at' => now()->format('d M Y H:i:s'),
                'notice' => 'Read-only environment diagnostics & PHP configuration',
            ],
            'groups' => [
                [
                    'title' => 'Core Application Runtime',
                    'description' => 'Informasi versi framework, PHP, dan server',
                    'items' => [
                        ['label' => 'Laravel Framework', 'value' => 'v'.app()->version(), 'status' => 'ok'],
                        ['label' => 'PHP Version', 'value' => PHP_VERSION, 'status' => 'ok'],
                        ['label' => 'Environment Mode', 'value' => config('app.env'), 'status' => app()->isProduction() ? 'ok' : 'warning'],
                        ['label' => 'Debug Mode', 'value' => config('app.debug') ? 'TRUE (Active)' : 'FALSE (Disabled)', 'status' => config('app.debug') ? 'warning' : 'ok'],
                        ['label' => 'Application URL', 'value' => config('app.url'), 'status' => 'ok'],
                    ],
                ],
                [
                    'title' => 'Database & Storage Services',
                    'description' => 'Konfigurasi driver basis data dan direktori berkas',
                    'items' => [
                        ['label' => 'Database Driver', 'value' => config('database.default'), 'status' => 'ok'],
                        ['label' => 'Cache Driver', 'value' => config('cache.default'), 'status' => 'ok'],
                        ['label' => 'Session Driver', 'value' => config('session.driver'), 'status' => 'ok'],
                        ['label' => 'Queue Connection', 'value' => config('queue.default'), 'status' => 'ok'],
                        ['label' => 'Filesystem Disk', 'value' => config('filesystems.default'), 'status' => 'ok'],
                    ],
                ],
                [
                    'title' => 'PHP Extensions & Server Memory',
                    'description' => 'Status ekstensi PHP pendukung',
                    'items' => [
                        ['label' => 'Memory Limit', 'value' => ini_get('memory_limit'), 'status' => 'ok'],
                        ['label' => 'Max Execution Time', 'value' => ini_get('max_execution_time').'s', 'status' => 'ok'],
                        ['label' => 'OPcache Extension', 'value' => extension_loaded('Zend OPcache') ? 'Installed' : 'Disabled', 'status' => extension_loaded('Zend OPcache') ? 'ok' : 'warning'],
                        ['label' => 'PDO MySQL Extension', 'value' => extension_loaded('pdo_mysql') ? 'Installed' : 'Disabled', 'status' => 'ok'],
                        ['label' => 'GD Image Extension', 'value' => extension_loaded('gd') ? 'Installed' : 'Disabled', 'status' => extension_loaded('gd') ? 'ok' : 'warning'],
                    ],
                ],
            ],
        ];
    }

    /**
     * Get auto-discovered modules and submodules list.
     */
    public function getDiscoveredModules(): array
    {
        $permissions = ModuleServiceProvider::getDiscoveredPermissions();
        $modules = [];

        foreach ($permissions as $submoduleKey => $perms) {
            $parts = explode('/', $submoduleKey);
            $moduleName = $parts[0];
            $submoduleName = $parts[1] ?? $submoduleKey;

            $modules[$moduleName][] = [
                'submodule' => $submoduleName,
                'path' => "app/Modules/{$moduleName}/{$submoduleName}",
                'permission_count' => count($perms),
                'permissions' => $perms,
            ];
        }

        return $modules;
    }
}
