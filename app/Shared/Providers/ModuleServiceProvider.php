<?php

namespace App\Shared\Providers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class ModuleServiceProvider extends ServiceProvider
{
    /**
     * Cache for discovered permissions from submodules.
     *
     * @var array<string, array<string>>
     */
    protected static array $discoveredPermissions = [];

    public function register(): void
    {
        // Register any shared kernel bindings if needed
    }

    public function boot(): void
    {
        $this->bootModuleRoutes();
        $this->bootModulePermissions();
    }

    /**
     * Auto-discover and load routes from app/Modules/{Module}/{Submodule}/routes.php
     */
    protected function bootModuleRoutes(): void
    {
        $modulesPath = app_path('Modules');

        if (! File::isDirectory($modulesPath)) {
            return;
        }

        $routeFiles = File::glob($modulesPath.'/*/*/routes.php');

        foreach ($routeFiles as $routeFile) {
            Route::middleware('web')
                ->group($routeFile);
        }
    }

    /**
     * Auto-discover and register permissions from app/Modules/{Module}/{Submodule}/permissions.php
     */
    protected function bootModulePermissions(): void
    {
        $modulesPath = app_path('Modules');

        if (! File::isDirectory($modulesPath)) {
            return;
        }

        $permissionFiles = File::glob($modulesPath.'/*/*/permissions.php');

        foreach ($permissionFiles as $file) {
            $permissions = require $file;
            if (is_array($permissions)) {
                $normalizedPath = str_replace('\\', '/', $file);
                $parts = explode('/Modules/', $normalizedPath);
                $relative = end($parts);
                $submoduleKey = str_replace('/permissions.php', '', $relative);
                static::$discoveredPermissions[$submoduleKey] = $permissions;
            }
        }
    }

    /**
     * Get all discovered module permissions grouped by submodule.
     *
     * @return array<string, array<string>>
     */
    public static function getDiscoveredPermissions(): array
    {
        return static::$discoveredPermissions;
    }
}
