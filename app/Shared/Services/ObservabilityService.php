<?php

namespace App\Shared\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use Throwable;

class ObservabilityService
{
    /**
     * Get system health and runtime performance metrics.
     *
     * @return array<string, mixed>
     */
    public function getMetrics(): array
    {
        $startTime = microtime(true);

        $dbStatus = 'healthy';
        try {
            DB::connection()->getPdo();
        } catch (Throwable $e) {
            $dbStatus = 'unhealthy: '.$e->getMessage();
        }

        $redisLatencyMs = null;
        $redisStatus = 'healthy';
        try {
            $redisStart = microtime(true);
            Redis::ping();
            $redisLatencyMs = round((microtime(true) - $redisStart) * 1000, 2);
        } catch (Throwable $e) {
            $redisStatus = 'unhealthy: '.$e->getMessage();
        }

        $executionTimeMs = round((microtime(true) - $startTime) * 1000, 2);

        return [
            'status' => ($dbStatus === 'healthy' && str_starts_with($redisStatus, 'healthy')) ? 'ok' : 'degraded',
            'timestamp' => now()->toIso8601String(),
            'environment' => config('app.env'),
            'php_version' => PHP_VERSION,
            'laravel_version' => app()->version(),
            'memory_usage_mb' => round(memory_get_usage(true) / 1024 / 1024, 2),
            'peak_memory_mb' => round(memory_get_peak_usage(true) / 1024 / 1024, 2),
            'health' => [
                'database' => $dbStatus,
                'redis' => $redisStatus,
                'redis_latency_ms' => $redisLatencyMs,
            ],
            'check_execution_ms' => $executionTimeMs,
        ];
    }

    /**
     * Instrument execution duration of a callback function.
     *
     * @template T
     *
     * @param  callable(): T  $callback
     * @return T
     */
    public function measure(string $operationName, callable $callback)
    {
        $start = microtime(true);
        try {
            return $callback();
        } finally {
            $durationMs = round((microtime(true) - $start) * 1000, 2);
            Log::info("[METRICS] Operation `{$operationName}` completed in {$durationMs}ms", [
                'operation' => $operationName,
                'duration_ms' => $durationMs,
                'memory_mb' => round(memory_get_usage(true) / 1024 / 1024, 2),
            ]);
        }
    }
}
