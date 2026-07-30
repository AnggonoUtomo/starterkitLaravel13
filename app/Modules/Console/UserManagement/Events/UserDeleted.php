<?php

declare(strict_types=1);

namespace App\Modules\Console\UserManagement\Events;

use App\Modules\Console\UserManagement\Domain\Events\UserDeleted as DomainUserDeleted;

class UserDeleted extends DomainUserDeleted {}
