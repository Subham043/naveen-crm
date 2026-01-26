<?php

namespace App\Features\ServiceTeam\Services;

use App\Features\Order\Enums\OrderStatus;
use App\Features\Order\Models\Order;
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
        return Order::select('id', 'name', 'email', 'phone', 'country_code', 'billing_address', 'part_name', 'part_description', 'lead_source', 'sales_user_id', 'is_created_by_agent', 'assigned_at', 'payment_status', 'yard_located', 'total_price', 'cost_price', 'shipping_cost', 'tracking_details', 'invoice_status', 'shipment_status', 'order_status', 'approval_by_id', 'approval_at', 'is_active', 'created_at', 'updated_at')
        ->with([
            'salesUser' => function($query){
                $query->select('id', 'name', 'email', 'phone');
            },
            'approvalBy' => function($query){
                $query->select('id', 'name', 'email', 'phone');
            },
            'comments' => function($query){
                $query->select('id', 'comment', 'created_at', 'updated_at')->where('service_team_id', Auth::guard(Guards::API->value())->user()->id);
            },
            'yards' => function($query){
                $query->select('id', 'yard', 'created_at', 'updated_at');
            }
        ])
        ->whereHas('salesUser')
        ->whereHas('approvalBy')
        ->where('is_active', true)
        ->where('order_status', OrderStatus::Approved->value());
    }

    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'name')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ]);
    }


    public function syncYards(array $data, $order)
    {
        $order->yards()->sync($data);
    }

    public function createComment(array $data, $order)
    {
        $order->comments()->create($data);
    }

}

class CommonFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->where(function($q) use($value){
            $q->where('name', 'LIKE', '%' . $value . '%')
            ->orWhere('email', 'LIKE', '%' . $value . '%')
            ->orWhere('phone', 'LIKE', '%' . $value . '%')
            ->orWhere('part_name', 'LIKE', '%' . $value . '%')
            ->orWhere('part_description', 'LIKE', '%' . $value . '%')
            ->orWhere('billing_address', 'LIKE', '%' . $value . '%');
        });
    }
}
