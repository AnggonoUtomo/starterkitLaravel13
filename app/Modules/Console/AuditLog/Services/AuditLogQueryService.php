<?php

declare(strict_types=1);

namespace App\Modules\Console\AuditLog\Services;

use App\Modules\Console\AuditLog\DTO\AuditLogDTO;
use App\Modules\Console\SystemSetting\Services\SettingService;
use App\Modules\Console\UserManagement\Contracts\UserModuleContract;
use App\Modules\Console\UserManagement\Domain\Entities\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;

class AuditLogQueryService
{
    public function __construct(
        protected UserModuleContract $userModuleContract
    ) {}

    /**
     * Get paginated audit logs from daily log files.
     *
     * @return LengthAwarePaginator<int, array<string, mixed>>
     */
    public function getPaginatedLogs(int $perPage = 15, ?string $search = null): LengthAwarePaginator
    {
        $logFiles = File::glob(storage_path('logs/*.log'));
        $entries = collect();

        $rawItems = [];
        $userIds = [];

        foreach ($logFiles as $file) {
            $content = File::get($file);
            preg_match_all('/\[(.*?)\] \w+\.INFO: \[AUDIT_TRAIL\] (.*?) (\{.*?\})/', $content, $matches, PREG_SET_ORDER);

            foreach ($matches as $index => $match) {
                $rawPayload = json_decode($match[3], true) ?: [];
                $causedUserId = $rawPayload['caused_by_user_id'] ?? null;

                if ($causedUserId) {
                    $userIds[] = (int) $causedUserId;
                }

                $rawItems[] = [
                    'file' => $file,
                    'index' => $index,
                    'timestamp' => $match[1],
                    'event_name' => $match[2],
                    'caused_by_user_id' => $causedUserId ? (int) $causedUserId : null,
                    'payload' => $rawPayload['payload'] ?? [],
                ];
            }
        }

        // Batch fetch user names via UserModuleContract (Module Integration Layer)
        $userNamesMap = ! empty($userIds)
            ? $this->userModuleContract->getUserNamesByIds($userIds)
            : [];

        $settingService = app(SettingService::class);

        foreach ($rawItems as $item) {
            $causedUserId = $item['caused_by_user_id'];
            $causedUserName = null;

            if ($causedUserId) {
                $causedUserName = $userNamesMap[$causedUserId] ?? "User #{$causedUserId}";
            }

            $parsedDate = Carbon::parse($item['timestamp']);
            $formattedTimestamp = $settingService->formatDateTime($parsedDate, 'datetime') ?? $item['timestamp'];

            $dto = new AuditLogDTO(
                id: md5($item['file'].$item['index'].$item['timestamp']),
                event_name: $item['event_name'],
                caused_by_user_id: $causedUserId,
                caused_by_user_name: $causedUserName ?? 'System',
                payload: $item['payload'],
                timestamp: $formattedTimestamp
            );

            $entries->push($dto->toArray());
        }

        // Reverse to show latest logs first
        $sorted = $entries->reverse()->values();

        if (! empty(trim($search ?? ''))) {
            $term = mb_strtolower(trim((string) $search));

            $sorted = $sorted->filter(function ($item) use ($term) {
                $eventName = mb_strtolower($item['event_name'] ?? '');
                $userName = mb_strtolower($item['caused_by_user_name'] ?? '');
                $userEmail = mb_strtolower($item['caused_by_user_email'] ?? '');
                $subject = mb_strtolower($item['subject_type'] ?? '');

                return str_contains($eventName, $term)
                    || str_contains($userName, $term)
                    || str_contains($userEmail, $term)
                    || str_contains($subject, $term);
            })->values();
        }

        $page = LengthAwarePaginator::resolveCurrentPage();
        $slice = $sorted->slice(($page - 1) * $perPage, $perPage)->values();

        return new LengthAwarePaginator(
            $slice,
            $sorted->count(),
            $perPage,
            $page,
            ['path' => LengthAwarePaginator::resolveCurrentPath()]
        );
    }
}
