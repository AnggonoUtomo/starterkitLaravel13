<?php

namespace App\Modules\Console\AuditLog\Services;

use App\Models\User;
use App\Modules\Console\AuditLog\DTO\AuditLogDTO;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\File;

class AuditLogQueryService
{
    /**
     * Get paginated audit logs from daily log files.
     */
    public function getPaginatedLogs(int $perPage = 15, ?string $search = null): LengthAwarePaginator
    {
        $logFiles = File::glob(storage_path('logs/*.log'));
        $entries = collect();

        foreach ($logFiles as $file) {
            $content = File::get($file);
            preg_match_all('/\[(.*?)\] local\.INFO: \[AUDIT_TRAIL\] (.*?) (\{.*?\})/', $content, $matches, PREG_SET_ORDER);

            foreach ($matches as $index => $match) {
                $timestamp = $match[1] ?? now()->toIso8601String();
                $eventName = $match[2] ?? 'System Event';
                $rawPayload = json_decode($match[3] ?? '{}', true) ?: [];

                $causedUserId = $rawPayload['caused_by_user_id'] ?? null;
                $payloadData = $rawPayload['payload'] ?? [];
                $causedUserName = null;

                if ($causedUserId) {
                    $user = User::find($causedUserId);
                    $causedUserName = $user?->name ?? "User #{$causedUserId}";
                }

                $dto = new AuditLogDTO(
                    id: md5($file.$index.$timestamp),
                    event_name: $eventName,
                    caused_by_user_id: $causedUserId,
                    caused_by_user_name: $causedUserName ?? 'System',
                    payload: $payloadData,
                    timestamp: $timestamp
                );

                $entries->push($dto->toArray());
            }
        }

        // Reverse to show latest logs first
        $sorted = $entries->reverse()->values();

        if ($search) {
            $sorted = $sorted->filter(function ($item) use ($search) {
                return str_contains(strtolower($item['event_name']), strtolower($search))
                    || str_contains(strtolower($item['caused_by_user_name'] ?? ''), strtolower($search));
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
