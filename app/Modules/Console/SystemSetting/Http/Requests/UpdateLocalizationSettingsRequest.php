<?php

namespace App\Modules\Console\SystemSetting\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLocalizationSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'timezone' => ['required', 'string', 'timezone'],
            'date_format' => ['required', 'string', 'max:30'],
            'time_format' => ['required', 'string', 'max:30'],
        ];
    }
}
