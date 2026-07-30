<?php

declare(strict_types=1);

namespace App\Modules\Console\SystemSetting\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMapSettingsRequest extends FormRequest
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
            'google_maps_api_key' => ['nullable', 'string', 'max:255'],
            'google_maps_map_id' => ['nullable', 'string', 'max:255'],
        ];
    }
}
