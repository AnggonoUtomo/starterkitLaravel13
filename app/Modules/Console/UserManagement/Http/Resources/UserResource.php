<?php

namespace App\Modules\Console\UserManagement\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin User
 */
class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'initials' => strtoupper(substr($this->name, 0, 2)),
            'roles' => $this->getRoleNames()->values()->toArray(),
            'permissions' => $this->getPermissionNames()->values()->toArray(),
            'created_at' => $this->created_at?->format('d M Y H:i'),
        ];
    }
}
