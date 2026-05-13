<?php

namespace App\Features\ServiceTeam\Services;

use App\Features\Order\Models\Order;
use App\Features\Order\Models\Yard;
use App\Features\Quotation\Enums\QuotationStatus;
use App\Features\Timeline\Collections\YardTimelineDTOCollection;
use App\Http\Abstracts\AbstractService;
use App\Http\Enums\Guards;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Support\Facades\Auth;


class ServiceTeamOrderService extends AbstractService
{

    public function model(): Builder
    {
        return Order::select('id', 'quotation_id', 'payment_status', 'payment_card_type', 'payment_gateway', 'transaction_id', 'yard_located', 'tracking_details', 'tracking_status', 'invoice_status', 'po_status', 'order_status', 'created_at', 'updated_at')
        ->with([
            'quotation' => function($query){
                $query
                ->with([
                    'salesUser' => function($query){
                        $query->select('id', 'name', 'email', 'phone');
                    },
                    'approvalBy' => function($query){
                        $query->select('id', 'name', 'email', 'phone');
                    },
                ])
                ->select('id', 'name', 'email', 'phone', 'country_code', 'billing_address', 'shipping_address', 'part_year', 'part_model', 'part_make', 'part_name', 'part_number', 'part_warranty', 'part_vin', 'part_description', 'lead_source', 'sales_user_id', 'is_created_by_agent', 'assigned_at', 'sale_price', 'cost_price', 'shipping_cost', 'quotation_status', 'approval_by_id', 'approval_at', 'is_active', 'quotation_sent', 'created_at', 'updated_at');
            },
            'yards' => function($query){
                $query->select('id', 'yard', 'order_id', 'service_team_id', 'created_at', 'updated_at');
            }
        ])
        ->whereHas('quotation', function($query){
            $query
                ->whereHas('salesUser')
                ->whereHas('approvalBy')
                ->where('quotation_status', QuotationStatus::Approved->value())
                ->where('is_active', true);
        });
    }

    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'name')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                    AllowedFilter::callback('payment_status', function (Builder $query, $value) {
                        $query->where('payment_status', $value);
                    }),
                    AllowedFilter::callback('payment_card_type', function (Builder $query, $value) {
                        $query->where('payment_card_type', $value);
                    }),
                    AllowedFilter::callback('payment_gateway', function (Builder $query, $value) {
                        $query->where('payment_gateway', $value);
                    }),
                    AllowedFilter::callback('invoice_status', function (Builder $query, $value) {
                        $query->where('invoice_status', $value);
                    }),
                    AllowedFilter::callback('po_status', function (Builder $query, $value) {
                        $query->where('po_status', $value);
                    }),
                    AllowedFilter::callback('order_status', function (Builder $query, $value) {
                        $query->where('order_status', $value);
                    }),
                    AllowedFilter::callback('lead_source', function (Builder $query, $value) {
                        $query->whereHas('quotation', function($q) use($value){
                            $q->where('lead_source', $value);
                        });
                    }),
                ]);
    }


    /**
	 * @param YardTimelineDTOCollection $data
	 * @param Order $order
	 */
    public function syncYards(YardTimelineDTOCollection $data, $order)
    {
        $yard_array = $data->toDatabaseArray();
        // 1. Collect incoming IDs
        $incomingIds = collect($yard_array)
            ->pluck('id')
            ->filter()
            ->values();

        // 2. Delete removed yards
        $order->yards()
            ->whereNotIn('id', $incomingIds)
            ->delete();

        // 3. Prepare data
        $yards = collect($yard_array)->map(function ($yard) use ($order) {
            return [
                'id' => $yard['id'] ?? null, // important for update
                'order_id' => $order->id,
                'yard' => $yard['yard'],
                'service_team_id' => Auth::guard(Guards::API->value())->user()->id,
                'updated_at' => now(),
                'created_at' => now(),
            ];
        })->toArray();

        // 4. Upsert
        Yard::upsert($yards, ['id'], ['yard', 'updated_at']);
    }

}

class CommonFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->where(function($q) use($value){
            $q->whereHas('quotation', function($q) use($value){
                $q->where('name', 'LIKE', '%' . $value . '%')
                ->orWhere('email', 'LIKE', '%' . $value . '%')
                ->orWhere('phone', 'LIKE', '%' . $value . '%')
                ->orWhere('part_year', 'LIKE', '%' . $value . '%')
                ->orWhere('part_make', 'LIKE', '%' . $value . '%')
                ->orWhere('part_model', 'LIKE', '%' . $value . '%')
                ->orWhere('part_name', 'LIKE', '%' . $value . '%')
                ->orWhere('part_number', 'LIKE', '%' . $value . '%')
                ->orWhereHas('salesUser', function($q) use($value){
                    $q->where('name', 'LIKE', '%' . $value . '%')
                    ->orWhere('email', 'LIKE', '%' . $value . '%')
                    ->orWhere('phone', 'LIKE', '%' . $value . '%');
                });
            })
            ->orWhere('id', 'LIKE', '%' . preg_replace('/\D/', '', $value) . '%');
        });
    }
}
