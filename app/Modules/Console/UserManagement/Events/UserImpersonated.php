<?php

declare(strict_types=1);

namespace App\Modules\Console\UserManagement\Events;

use App\Modules\Console\UserManagement\Domain\Events\UserImpersonated as DomainUserImpersonated;

class UserImpersonated extends DomainUserImpersonated {}
