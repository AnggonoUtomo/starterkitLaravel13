<?php

namespace App\Modules\Console\UserManagement\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        /** @var User $targetUser */
        $targetUser = $this->route('user');

        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$targetUser->id,
            'password' => ['nullable', 'string', Password::default()],
            'roles' => 'nullable|array',
            'permissions' => 'nullable|array',
        ];
    }
}
