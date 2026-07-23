<?php

namespace App\Modules\Console\SystemSetting\Services;

use App\Shared\Providers\ModuleServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class SystemHealthService
{
    /**
     * Get system health and environment metrics.
     *
     * @return array<string, mixed>
     */
    public function getHealthStatus(): array
    {
        $dbConnected = false;
        try {
            DB::connection()->getPdo();
            $dbConnected = true;
        } catch (\Exception $e) {
            $dbConnected = false;
        }

        $redisConnected = false;
        try {
            Redis::ping();
            $redisConnected = true;
        } catch (\Throwable $e) {
            $redisConnected = false;
        }

        return [
            'php_version' => PHP_VERSION,
            'laravel_version' => app()->version(),
            'database_status' => $dbConnected ? 'Healthy' : 'Disconnected',
            'redis_status' => $redisConnected ? 'Healthy' : 'Disconnected',
            'cache_driver' => config('cache.default'),
            'session_driver' => config('session.driver'),
            'queue_driver' => config('queue.default'),
            'environment' => config('app.env'),
            'debug_mode' => config('app.debug'),
        ];
    }

    /**
     * Get auto-discovered modules and submodules list.
     *
     * @return array<string, mixed>
     */
    public function getDiscoveredModules(): array
    {
        $permissions = ModuleServiceProvider::getDiscoveredPermissions();
        $modules = [];

        foreach ($permissions as $submoduleKey => $perms) {
            $parts = explode('/', $submoduleKey);
            $moduleName = $parts[0] ?? 'Global';
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
