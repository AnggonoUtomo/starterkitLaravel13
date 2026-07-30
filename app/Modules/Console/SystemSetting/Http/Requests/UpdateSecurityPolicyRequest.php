<?php

declare(strict_types=1);

namespace App\Modules\Console\SystemSetting\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSecurityPolicyRequest extends FormRequest
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
        return [
            'require_email_verification' => ['required', 'boolean'],
            'audit_sensitive_actions' => ['required', 'boolean'],
            'single_session_per_user' => ['required', 'boolean'],
            'allow_account_deletion' => ['required', 'boolean'],
            'session_lifetime_minutes' => ['required', 'integer', 'min:5', 'max:525600'],
            'login_max_attempts' => ['required', 'integer', 'min:1', 'max:50'],
            'login_decay_minutes' => ['required', 'integer', 'min:1', 'max:1440'],
            'password_confirmation_timeout_seconds' => ['required', 'integer', 'min:60', 'max:86400'],
        ];
    }
}
