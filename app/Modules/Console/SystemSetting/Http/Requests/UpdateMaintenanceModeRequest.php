<?php

namespace App\Modules\Console\SystemSetting\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMaintenanceModeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'enabled' => ['required', 'boolean'],
            'message' => ['nullable', 'string', 'max:500'],
            'page_style' => ['required', 'string', 'in:aurora,minimal,modern'],
            'retry_seconds' => ['nullable', 'integer', 'min:5', 'max:86400'],
            'refresh_seconds' => ['nullable', 'integer', 'min:5', 'max:3600'],
            'secret' => ['nullable', 'string', 'alpha_dash', 'min:6', 'max:64'],
        ];
    }
}
