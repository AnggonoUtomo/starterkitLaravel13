<?php

declare(strict_types=1);

namespace App\Modules\Console\UserManagement\Events;

use App\Modules\Console\UserManagement\Domain\Events\UserCreated as DomainUserCreated;

class UserCreated extends DomainUserCreated {}
