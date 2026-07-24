<?php

namespace App\Modules\Console\SystemSetting\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePasswordPolicyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'min_length' => ['required', 'integer', 'min:6', 'max:64'],
            'require_uppercase' => ['required', 'boolean'],
            'require_lowercase' => ['required', 'boolean'],
            'require_numbers' => ['required', 'boolean'],
            'require_symbols' => ['required', 'boolean'],
            'uncompromised' => ['required', 'boolean'],
            'expiry_days' => ['required', 'integer', 'min:0', 'max:365'],
            'history_count' => ['required', 'integer', 'min:0', 'max:24'],
        ];
    }
}
