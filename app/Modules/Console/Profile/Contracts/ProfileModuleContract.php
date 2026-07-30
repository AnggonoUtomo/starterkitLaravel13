<?php

declare(strict_types=1);

namespace App\Modules\Console\Profile\Contracts;

use App\Modules\Console\UserManagement\Domain\Entities\User;

interface ProfileModuleContract
{
    /**
     * @return array<string, mixed>
     */
    public function getProfileSummary(User $user): array;
}
