<?php

namespace App\Modules\Console\UserManagement\Transactions;

use App\Models\User;
use App\Modules\Console\UserManagement\Events\UserCreated;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CreateUserTransaction
{
    /**
     * Execute atomic user creation transaction.
     *
     * @param  array<string, mixed>  $data
     */
    public function execute(array $data): User
    {
        return DB::transaction(function () use ($data) {
            /** @var User $user */
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            if (! empty($data['roles'])) {
                $user->syncRoles($data['roles']);
            }

            if (! empty($data['permissions'])) {
                $user->syncPermissions($data['permissions']);
            }

            event(new UserCreated([
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $data['roles'] ?? [],
            ]));

            return $user;
        });
    }
}
