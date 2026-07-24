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

        $routeNamePrefix = Str::kebab($module).'.'.Str::kebab($submodule);
        $routePathPrefix = Str::kebab($module).'/'.Str::kebab($submodule);
        $controllerName = "{$submodule}Controller";
        $serviceName = "{$submodule}Service";
        $dtoName = "{$submodule}Data";
        $permPrefix = Str::lower($submodule);

        // 1. Generate Backend routes.php
        $routesContent = "<?php\n\nuse App\\Modules\\{$module}\\{$submodule}\\Http\\Controllers\\{$controllerName};\nuse Illuminate\\Support\\Facades\\Route;\n\nRoute::middleware(['auth', 'verified'])\n    ->prefix('{$routePathPrefix}')\n    ->name('{$routeNamePrefix}.')\n    ->group(function () {\n        Route::get('/', [{$controllerName}::class, 'index'])->name('index');\n    });\n";
        File::put("{$backendPath}/routes.php", $routesContent);

        // 2. Generate Backend permissions.php
        $permissionsContent = "<?php\n\nreturn [\n    '{$permPrefix}.view',\n    '{$permPrefix}.create',\n    '{$permPrefix}.edit',\n    '{$permPrefix}.delete',\n];\n";
        File::put("{$backendPath}/permissions.php", $permissionsContent);

        // 3. Generate Backend module.php
        $moduleManifestContent = "<?php\n\nreturn [\n    'name' => '{$submodule}',\n    'label' => '".Str::headline($submodule)."',\n    'module' => '{$module}',\n    'description' => 'Submodul {$submodule} untuk domain {$module}.',\n];\n";
        File::put("{$backendPath}/module.php", $moduleManifestContent);

        // 4. Generate Backend navigation.php
        $navigationContent = "<?php\n\nreturn [\n    'label' => '".Str::headline($submodule)."',\n    'route' => '{$routeNamePrefix}.index',\n    'icon' => 'box',\n    'order' => 10,\n];\n";
        File::put("{$backendPath}/navigation.php", $navigationContent);

        // 5. Generate DTO
        $dtoContent = <<<PHP
<?php

namespace App\Modules\\{$module}\\{$submodule}\\DTO;

final readonly class {$dtoName}
{
    /**
     * @param  array<string, mixed>  \$data
     */
    public function __construct(
        public array \$data = []
    ) {}

    /**
     * @param  array<string, mixed>  \$input
     */
    public static function fromArray(array \$input): self
    {
        return new self(data: \$input);
    }
}

PHP;
        File::put("{$backendPath}/DTO/{$dtoName}.php", $dtoContent);

        // 6. Generate Service
        $serviceContent = <<<PHP
<?php

namespace App\Modules\\{$module}\\{$submodule}\\Services;

use App\Modules\\{$module}\\{$submodule}\\DTO\\{$dtoName};

class {$serviceName}
{
    /**
     * @return array<string, mixed>
     */
    public function getPageData(): array
    {
        return [
            'title' => '{$submodule} Management',
        ];
    }

    public function process({$dtoName} \$dto): void
    {
        // Execute business logic with DTO payload
    }
}

PHP;
        File::put("{$backendPath}/Services/{$serviceName}.php", $serviceContent);

        // 7. Generate Controller
        $controllerContent = <<<PHP
<?php

namespace App\Modules\\{$module}\\{$submodule}\\Http\\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\\{$module}\\{$submodule}\\Services\\{$serviceName};
use Inertia\Inertia;
use Inertia\Response;

class {$controllerName} extends Controller
{
    public function __construct(
        protected {$serviceName} \$service
    ) {}

    public function index(): Response
    {
        return Inertia::render('{$module}/{$submodule}/Index', \$this->service->getPageData());
    }
}

PHP;
        File::put("{$backendPath}/Http/Controllers/{$controllerName}.php", $controllerContent);

        // 8. Generate Frontend directories & Index.tsx & types.ts
        File::makeDirectory("{$frontendPath}/components", 0755, true, true);

        $frontendTypesContent = <<<TS
export interface {$submodule}Item {
    id: number;
    name: string;
}
TS;
        File::put("{$frontendPath}/types.ts", $frontendTypesContent);

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
                <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Submodul {$submodule} ({$module}).
                </p>
            </div>
        </ConsoleLayout>
    );
}
TSX;
        File::put("{$frontendPath}/Index.tsx", $frontendIndexContent);

        // 9. Generate Submodule Docs in docs/project/{module}/{submodule}/ (frontend/ & backend/)
        $backendDocsPath = base_path("docs/project/{$module}/{$submodule}/backend");
        $frontendDocsPath = base_path("docs/project/{$module}/{$submodule}/frontend");
        File::makeDirectory($backendDocsPath, 0755, true, true);
        File::makeDirectory($frontendDocsPath, 0755, true, true);

        File::put("{$backendDocsPath}/spec.md", "# Spesifikasi Backend Submodul: {$module}/{$submodule}\n\n## Tujuan\nSpesifikasi domain backend, DTO, Service, dan Otorisasi untuk submodul {$submodule}.\n");
        File::put("{$backendDocsPath}/plan.md", "# Rencana Backend Submodul: {$module}/{$submodule}\n\n## Rencana Implementasi\n- [ ] Pembuatan Service, DTO, dan Request.\n");
        File::put("{$backendDocsPath}/todo.md", "# Checklist Backend Submodul: {$module}/{$submodule}\n\n- [ ] Pengaturan dasar backend.\n");

        File::put("{$frontendDocsPath}/spec.md", "# Spesifikasi Frontend Submodul: {$module}/{$submodule}\n\n## Tujuan\nSpesifikasi tampilan UI dan state management React untuk submodul {$submodule}.\n");
        File::put("{$frontendDocsPath}/plan.md", "# Rencana Frontend Submodul: {$module}/{$submodule}\n\n## Rencana Implementasi\n- [ ] Pembuatan komponen UI.\n");
        File::put("{$frontendDocsPath}/todo.md", "# Checklist Frontend Submodul: {$module}/{$submodule}\n\n- [ ] Pengaturan dasar frontend.\n");

        $this->info("✓ Backend scaffold created at: {$backendPath}");
        $this->info("✓ Submodule documentation created at: docs/project/{$module}/{$submodule}/");
        $this->info("✓ Frontend scaffold created at: {$frontendPath}");
        $this->info("Submodule {$module}/{$submodule} created successfully!");

        return Command::SUCCESS;
    }
}
