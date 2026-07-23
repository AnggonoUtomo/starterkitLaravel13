<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class MakeModuleCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:module {name : Module and Submodule path (e.g. Console/UserManagement)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate a new DDD-Lite Module and Submodule scaffold for Backend and Frontend';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $input = trim($this->argument('name'));
        $parts = explode('/', str_replace('\\', '/', $input));

        if (count($parts) < 2) {
            $this->error('Please specify both Module and Submodule (e.g. Console/UserManagement)');

            return Command::FAILURE;
        }

        $module = Str::studly($parts[0]);
        $submodule = Str::studly($parts[1]);

        $backendPath = app_path("Modules/{$module}/{$submodule}");
        $frontendPath = resource_path("js/pages/{$module}/{$submodule}");

        if (File::exists($backendPath)) {
            $this->error("Submodule {$module}/{$submodule} already exists at {$backendPath}");

            return Command::FAILURE;
        }

        $this->info("Creating DDD-Lite Submodule: {$module}/{$submodule}...");

        // Backend directories to create
        $directories = [
            'Database/Migrations',
            'Database/Factories',
            'Database/Seeders',
            'DTO',
            'Http/Controllers',
            'Http/Requests',
            'Http/Resources',
            'Integration',
            'Models',
            'Policies',
            'Providers',
            'Services',
            'Support',
            'Transactions',
        ];

        foreach ($directories as $dir) {
            File::makeDirectory("{$backendPath}/{$dir}", 0755, true, true);
        }

        // Generate Backend routes.php
        $routeNamePrefix = Str::kebab($module).'.'.Str::kebab($submodule);
        $routePathPrefix = Str::kebab($module).'/'.Str::kebab($submodule);
        $controllerName = "{$submodule}Controller";

        $routesContent = "<?php\n\nuse App\\Modules\\{$module}\\{$submodule}\\Http\\Controllers\\{$controllerName};\nuse Illuminate\\Support\\Facades\\Route;\n\nRoute::middleware(['auth', 'verified'])\n    ->prefix('{$routePathPrefix}')\n    ->name('{$routeNamePrefix}.')\n    ->group(function () {\n        Route::get('/', [{$controllerName}::class, 'index'])->name('index');\n    });\n";
        File::put("{$backendPath}/routes.php", $routesContent);

        // Generate Backend permissions.php
        $permPrefix = Str::lower($submodule);
        $permissionsContent = "<?php\n\nreturn [\n    '{$permPrefix}.view',\n    '{$permPrefix}.create',\n    '{$permPrefix}.edit',\n    '{$permPrefix}.delete',\n];\n";
        File::put("{$backendPath}/permissions.php", $permissionsContent);

        // Generate Controller skeleton
        $controllerContent = <<<PHP
<?php

namespace App\Modules\\{$module}\\{$submodule}\\Http\\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class {$controllerName} extends Controller
{
    public function index(): Response
    {
        return Inertia::render('{$module}/{$submodule}/Index', [
            'title' => '{$submodule} Management',
        ]);
    }
}
PHP;
        File::put("{$backendPath}/Http/Controllers/{$controllerName}.php", $controllerContent);

        // Generate Frontend directories & Index.tsx
        File::makeDirectory("{$frontendPath}/components", 0755, true, true);
        File::makeDirectory("{$frontendPath}/types", 0755, true, true);

        $frontendIndexContent = <<<TSX
import React from 'react';
import ConsoleLayout from '@/layouts/ConsoleLayout';
import { Head } from '@inertiajs/react';

interface Props {
    title: string;
}

export default function Index({ title }: Props) {
    return (
        <ConsoleLayout>
            <Head title={title} />
            <div className="p-6">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{title}</h1>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    Welcome to the {$submodule} submodule of {$module}.
                </p>
            </div>
        </ConsoleLayout>
    );
}
TSX;
        File::put("{$frontendPath}/Index.tsx", $frontendIndexContent);

        $this->info("✓ Backend scaffold created at: {$backendPath}");
        $this->info("✓ Frontend scaffold created at: {$frontendPath}");
        $this->info("Submodule {$module}/{$submodule} created successfully!");

        return Command::SUCCESS;
    }
}
