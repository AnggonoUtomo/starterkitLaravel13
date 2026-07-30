<?php

declare(strict_types=1);

use App\Modules\Console\Profile\Integration\ProfileIntegrationService;
use App\Modules\Console\UserManagement\Domain\Entities\User;

test('profile integration service generates profile summary array', function () {
    $user = User::factory()->create(['name' => 'Profile User', 'email' => 'profile@example.com']);

    $service = app(ProfileIntegrationService::class);
    $summary = $service->getProfileSummary($user);

    expect($summary)->toHaveKeys(['id', 'name', 'email', 'initials']);
    expect($summary['name'])->toBe('Profile User');
});

test('profile route displays settings page for authenticated user', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('profile.edit'));

    $response->assertStatus(200);
});
