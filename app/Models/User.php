<?php

declare(strict_types=1);

namespace App\Models;

use App\Modules\Console\UserManagement\Domain\Entities\User as DomainUser;

/**
 * @deprecated Use App\Modules\Console\UserManagement\Domain\Entities\User per SAKAAI LAR001 specification.
 */
class User extends DomainUser {}
