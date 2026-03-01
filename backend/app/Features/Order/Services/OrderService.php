<?php

namespace App\Features\Order\Services;

use App\Features\Order\Models\Order;
use App\Features\Quotation\Enums\QuotationStatus;
use App\Http\Abstracts\AbstractService;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class OrderService extends AbstractService
{

    public function model(): Builder
    {
        return Order::select('id', 'quotation_id', 'payment_status', 'payment_card_type', 'payment_gateway', 'transaction_id', 'yard_located', 'tracking_details', 'tracking_status', 'invoice_status', 'shipment_status', 'order_status', 'created_at', 'updated_at')
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
                ->select('id', 'name', 'email', 'phone', 'country_code', 'billing_address', 'shipping_address', 'part_year', 'part_model', 'part_make', 'part_name', 'part_description', 'lead_source', 'sales_user_id', 'is_created_by_agent', 'assigned_at', 'sale_price', 'cost_price', 'shipping_cost', 'quotation_status', 'approval_by_id', 'approval_at', 'is_active', 'quotation_sent', 'created_at', 'updated_at');
            },
            'yards' => function($query){
                $query->select('id', 'yard', 'order_id', 'service_team_id', 'created_at', 'updated_at');
            }
        ])
        ->whereHas('quotation', function($query){
            $query
                ->whereHas('salesUser')
                ->whereHas('approvalBy')
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
                    AllowedFilter::callback('status', function (Builder $query, $value) {
                        if(strtolower($value) == "approved"){
                            $query->whereHas('quotation', function($q){
                                $q->whereNotNull('approval_by_id')->where('quotation_status', QuotationStatus::Approved->value());
                            });
                        }
                        if(strtolower($value) == "rejected"){
                            $query->whereHas('quotation', function($q){
                                $q->whereNotNull('approval_by_id')->where('quotation_status', QuotationStatus::Rejected->value());
                            });
                        }
                    }),
                    AllowedFilter::callback('approval_by_me', function (Builder $query, $value) {
                        if(strtolower($value) == "yes"){
                            $query->whereHas('quotation', function($q){
                                $q->where('approval_by_id', Auth::guard(Guards::API->value())->user()->id);
                            });
                        }
                        if(strtolower($value) == "no"){
                            $query->whereHas('quotation', function($q){
                                $q->where('approval_by_id', '!=', Auth::guard(Guards::API->value())->user()->id);
                            });
                        }
                    }),
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
                    AllowedFilter::callback('shipment_status', function (Builder $query, $value) {
                        $query->where('shipment_status', $value);
                    }),
                    AllowedFilter::callback('order_status', function (Builder $query, $value) {
                        $query->where('order_status', $value);
                    }),
                    AllowedFilter::callback('tracking_status', function (Builder $query, $value) {
                        $query->where('tracking_status', $value);
                    }),
                    AllowedFilter::callback('lead_source', function (Builder $query, $value) {
                        $query->whereHas('quotation', function($q) use($value){
                            $q->where('lead_source', $value);
                        });
                    }),
                ]);
    }

    public function getById(Int $id): Order
	{
		return $this->model()->findOrFail($id);
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
                ->orWhereHas('salesUser', function($q) use($value){
                    $q->where('name', 'LIKE', '%' . $value . '%')
                    ->orWhere('email', 'LIKE', '%' . $value . '%')
                    ->orWhere('phone', 'LIKE', '%' . $value . '%');
                })
                ->orWhereHas('approvalBy', function($q) use($value){
                    $q->where('name', 'LIKE', '%' . $value . '%')
                    ->orWhere('email', 'LIKE', '%' . $value . '%')
                    ->orWhere('phone', 'LIKE', '%' . $value . '%');
                });
            });
        });
    }
}
