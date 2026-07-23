<?php

namespace Database\Seeders;

use App\Models\User;
use App\Shared\Providers\ModuleServiceProvider;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Discover and create permissions from all submodules
        $discovered = ModuleServiceProvider::getDiscoveredPermissions();
        foreach ($discovered as $submodule => $permissions) {
            foreach ($permissions as $permName) {
                Permission::findOrCreate($permName, 'web');
            }
        }

        // 2. Create Roles
        $superAdminRole = Role::findOrCreate('Super Admin', 'web');
        $adminRole = Role::findOrCreate('Admin', 'web');
        $userRole = Role::findOrCreate('User', 'web');

        // Give all permissions to Super Admin & Admin
        $allPermissions = Permission::all();
        $superAdminRole->syncPermissions($allPermissions);
        $adminRole->syncPermissions($allPermissions);

        // 3. Create Super Admin User
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'System Administrator',
                'password' => bcrypt('password'),
            ]
        );
        $adminUser->assignRole($superAdminRole);

        // 4. Create Standard Sample User
        $sampleUser = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Jane Doe',
                'password' => bcrypt('password'),
            ]
        );
        $sampleUser->assignRole($userRole);
    }
}
