<?php

namespace App\Features\Timeline\Services;

use App\Features\Order\Models\Order;
use App\Features\Timeline\Collections\YardTimelineDTOCollection;
use App\Features\Timeline\Collections\TimelineChangeCollection;
use App\Features\Timeline\DTO\TimelineChange;
use App\Features\Timeline\Models\Timeline;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
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

    /**
	 * @param YardTimelineDTOCollection $oldYardValues
	 * @param YardTimelineDTOCollection $incomingYards
	 */
    public function prepareYardChanges(YardTimelineDTOCollection $oldYardValues, YardTimelineDTOCollection $incomingYards): TimelineChangeCollection
    {
        $changes = new TimelineChangeCollection();

        // Existing yards from DB
        // Convert to plain arrays FIRST
        $existing = collect($oldYardValues->toDatabaseArray())
            ->mapWithKeys(fn ($yard) => [
                $yard['id'] => trim((string) $yard['yard']),
            ]);

        // Incoming yards (keep index, not keyBy id)
        $incoming = collect($incomingYards->toDatabaseArray());

        /**
         * UPDATED + REMOVED
         */
        foreach ($existing as $id => $oldValue) {
            $incomingRow = $incoming->firstWhere('id', $id);

            // REMOVED
            if (!$incomingRow) {
                $changes->pushChange(
                    new TimelineChange('yard', $oldValue, null)
                );
                continue;
            }

            // UPDATED
            $newValue = trim((string) $incomingRow['yard']);

            if ($oldValue !== $newValue) {
                $changes->pushChange(
                    new TimelineChange('yard', $oldValue, $newValue)
                );
            }
        }

        /**
         * ADDED
         */
        foreach ($incoming as $row) {
            if (empty($row['id'])) {
                $changes->pushChange(
                    new TimelineChange('yard', null, trim((string) $row['yard']))
                );
            }
        }

        return $changes;
    }

    public function createTimeline(Order $order, TimelineChangeCollection $changes, string $timeline_message, ?string $comment = null, ?int $user_id = null){
        $order->timelines()->create([
            'comment'    => $comment ?? null,
            'properties' => json_encode($changes->toArray()),
            'message'    => $timeline_message,
            'user_id'    => $user_id,
        ]);
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
