<?php

declare(strict_types=1);

namespace App\Modules\Console\SystemSetting\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePaginationSettingsRequest extends FormRequest
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
            'default_per_page' => ['required', 'integer', 'min:1', 'max:500'],
            'per_page_options' => ['required', 'array', 'min:1'],
            'per_page_options.*' => ['integer', 'min:1', 'max:500'],
        ];
    }
}
