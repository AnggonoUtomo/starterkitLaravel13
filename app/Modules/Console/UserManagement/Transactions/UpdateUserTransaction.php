<?php

declare(strict_types=1);

namespace App\Modules\Console\UserManagement\Transactions;

use App\Modules\Console\UserManagement\Domain\Entities\User;
use App\Modules\Console\UserManagement\Domain\Events\UserUpdated;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

final class UpdateUserTransaction
{
    /**
     * Execute atomic user update transaction.
     *
     * @param  array<string, mixed>  $data
     */
    public function execute(User $user, array $data): User
    {
        return DB::transaction(function () use ($user, $data) {
            $payload = [
                'name' => $data['name'],
                'email' => $data['email'],
            ];

            if (! empty($data['password'])) {
                $payload['password'] = Hash::make($data['password']);
            }

            $user->update($payload);

            if (isset($data['roles'])) {
                $user->syncRoles($data['roles']);
            }

            if (isset($data['permissions'])) {
                $user->syncPermissions($data['permissions']);
            }

            event(new UserUpdated([
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]));

            return $user;
        });
    }
}
