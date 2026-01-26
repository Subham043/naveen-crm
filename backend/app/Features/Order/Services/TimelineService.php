<?php

namespace App\Features\Order\Services;

use App\Features\Order\Models\Order;
use App\Features\Order\Models\Timeline;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class TimelineService
{

    public function model($order_id): Builder
    {
        return Timeline::select('id', 'comment', 'properties', 'message', 'user_id', 'order_id', 'created_at', 'updated_at')
            ->with([
                'doneBy' => function ($query) {
                    $query->select('id', 'name', 'email', 'phone')->with(['roles', 'permissions']);
                }
            ])
            ->whereHas('doneBy')
            ->where('order_id', $order_id);
    }

    public function query($order_id): QueryBuilder
    {
        return QueryBuilder::for($this->model($order_id))
            ->defaultSort('-id')
            ->allowedSorts('id', 'created_at')
            ->allowedFilters([
                AllowedFilter::custom('search', new CommonFilter, null, false),
            ]);
    }

    public function paginate($order_id, Int $total = 10): LengthAwarePaginator
    {
        return $this->query($order_id)
            ->paginate($total)
            ->appends(request()->query());
    }

    public function createTimeline(FormRequest $request, Order $order, $yard = null, ?string $event_type = 'update', ?string $message = null)
    {
        $user = Auth::guard(Guards::API->value())->user();

        // Fields actually sent in request (validated only)
        $requestedFields = array_keys($request->validated());

        $changes = collect();

        // ---- Order changes ----
        foreach ($order->getDirty() as $field => $newValue) {
            if (!in_array($field, $requestedFields, true)) {
                continue;
            }

            $changes->push([
                'old' => [
                    'field' => $field,
                    'value' => $order->getOriginal($field),
                ],
                'new' => [
                    'field' => $field,
                    'value' => $newValue,
                ],
            ]);
        }

        // ---- Yard changes (if exists) ----
        if (is_array($yard)) {
            foreach ($yard as $yard) {
                $changes->push([
                    'old' => [
                        'field' => 'yard',
                        'value' => $yard['old'],
                    ],
                    'new' => [
                        'field' => 'yard',
                        'value' => $yard['new'],
                    ],
                ]);
            }
        }

        // If nothing changed and no comment, skip timeline
        if ($changes->isEmpty()) {
            return;
        }

        $timeline_message = $message ? $message : "Order#{$order->id} was {$event_type} by {$user->name}<{$user->email}>";

        $order->timelines()->create([
            'comment'    => $request->comment ?? null,
            'properties' => json_encode($changes->values()->all()),
            'message'    => $timeline_message,
            'user_id'    => $user->id,
        ]);
    }

    public function prepareYardChanges(Order $order, array $incomingYards): array
    {
        $changes = [];

        // Existing yards from DB
        $existing = $order->yards->mapWithKeys(fn ($y) => [
            $y->id => trim((string) $y->yard),
        ]);

        // Incoming yards (keep index, not keyBy id)
        $incoming = collect($incomingYards);

        /**
         * UPDATED + REMOVED
         */
        foreach ($existing as $id => $oldValue) {
            $incomingRow = $incoming->firstWhere('id', $id);

            // REMOVED
            if (!$incomingRow) {
                $changes[] = [
                    'old' => $oldValue,
                    'new' => null,
                ];
                continue;
            }

            // UPDATED
            $newValue = trim((string) $incomingRow['yard']);

            if ($oldValue !== $newValue) {
                $changes[] = [
                    'old' => $oldValue,
                    'new' => $newValue,
                ];
            }
        }

        /**
         * ADDED
         */
        foreach ($incoming as $row) {
            if (empty($row['id'])) {
                $changes[] = [
                    'old' => null,
                    'new' => trim((string) $row['yard']),
                ];
            }
        }

        return $changes;
    }
}

class CommonFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->where(function ($q) use ($value) {
            $q->where('comment', 'LIKE', '%' . $value . '%')
                ->orWhere('message', 'LIKE', '%' . $value . '%')
                ->orWhereHas('doneBy', function ($q) use ($value) {
                    $q->where('name', 'LIKE', '%' . $value . '%')
                        ->orWhere('email', 'LIKE', '%' . $value . '%')
                        ->orWhere('phone', 'LIKE', '%' . $value . '%');
                });
        });
    }
}
