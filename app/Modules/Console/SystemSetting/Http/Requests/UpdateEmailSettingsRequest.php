<?php

declare(strict_types=1);

namespace App\Modules\Console\SystemSetting\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmailSettingsRequest extends FormRequest
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
            'enabled' => ['required', 'boolean'],
            'mailer' => ['required', 'string', 'in:log,smtp,array'],
            'host' => ['nullable', 'string'],
            'port' => ['nullable', 'integer', 'min:1', 'max:65535'],
            'username' => ['nullable', 'string'],
            'password' => ['nullable', 'string'],
            'encryption' => ['nullable', 'string', 'in:none,ssl,tls'],
            'from_address' => ['required', 'email'],
            'from_name' => ['required', 'string', 'max:100'],
            'send_credentials_on_create' => ['required', 'boolean'],
            'send_credentials_on_password_update' => ['required', 'boolean'],
            'credential_subject' => ['nullable', 'string', 'max:150'],
            'credential_intro' => ['nullable', 'string', 'max:500'],
        ];
    }
}
