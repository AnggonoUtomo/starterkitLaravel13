<?php

namespace App\Modules\Console\SystemSetting\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class SystemSetting extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $table = 'system_settings';

    protected $fillable = [
        'group',
        'key',
        'payload',
    ];

    protected function casts(): array
    {
        return [
            'payload' => 'array',
        ];
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('logo')
            ->singleFile();

        $this->addMediaCollection('favicon')
            ->singleFile();
    }

    /**
     * Cache key prefix.
     */
    public const CACHE_PREFIX = 'system_setting_group_';

    /**
     * Get settings payload by group name.
     */
    public static function getGroup(string $group, array $default = []): array
    {
        return Cache::rememberForever(self::CACHE_PREFIX.$group, function () use ($group, $default) {
            $setting = self::query()->where('key', $group)->first();

            if (! $setting || ! is_array($setting->payload)) {
                return $default;
            }

            return array_merge($default, $setting->payload);
        });
    }

    /**
     * Save settings payload by group name.
     */
    public static function setGroup(string $group, array $payload): array
    {
        $setting = self::query()->updateOrCreate(
            ['key' => $group],
            [
                'group' => $group,
                'payload' => $payload,
            ]
        );

        Cache::forget(self::CACHE_PREFIX.$group);

        return array_merge($payload, $setting->payload ?? []);
    }

    /**
     * Clear all cached settings.
     */
    public static function forgetAllCache(): void
    {
        $groups = [
            'email',
            'branding',
            'localization',
            'pagination',
            'security',
            'password',
            'maintenance',
            'map',
        ];

        foreach ($groups as $group) {
            Cache::forget(self::CACHE_PREFIX.$group);
        }
    }
}
