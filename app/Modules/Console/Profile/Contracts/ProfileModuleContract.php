<?php

namespace App\Modules\Console\Profile\Contracts;

use App\Models\User;

interface ProfileModuleContract
{
    /**
     * @return array<string, mixed>
     */
    public function getProfileSummary(User $user): array;
}
