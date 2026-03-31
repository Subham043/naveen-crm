<?php

namespace App\Features\SalesTeam\Services;

use App\Features\Quotation\Enums\QuotationStatus;
use App\Features\Quotation\Models\Quotation;
use App\Http\Abstracts\AbstractService;
use App\Http\Enums\Guards;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Support\Facades\Auth;

class SalesQuotationService extends AbstractService
{

    public function model(): Builder
    {
        return Quotation::select('id', 'name', 'email', 'phone', 'country_code', 'billing_address', 'shipping_address', 'part_year', 'part_model', 'part_make', 'part_name', 'part_number', 'part_warranty', 'part_description', 'lead_source', 'sales_user_id', 'is_created_by_agent', 'assigned_at', 'sale_price', 'cost_price', 'shipping_cost', 'quotation_status', 'approval_by_id', 'approval_at', 'is_active', 'quotation_sent', 'created_at', 'updated_at')
        ->with([
            'salesUser' => function($query){
                $query->select('id', 'name', 'email', 'phone')->where('id', Auth::guard(Guards::API->value())->user()->id);
            },
            'approvalBy' => function($query){
                $query->select('id', 'name', 'email', 'phone');
            }
        ])->whereHas('salesUser', function($query){
            $query->where('id', Auth::guard(Guards::API->value())->user()->id);
        })->where('sales_user_id', Auth::guard(Guards::API->value())->user()->id);
    }

    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'name')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                    AllowedFilter::callback('status', function (Builder $query, $value) {
                        if(strtolower($value) == "draft"){
                            $query->where('is_active', false)->whereNull('approval_by_id')->where('quotation_status', QuotationStatus::Pending->value());
                        }
                        if(strtolower($value) == "submitted-for-approval"){
                            $query->where('is_active', true)->whereNull('approval_by_id')->where('quotation_status', QuotationStatus::Pending->value());
                        }
                        if(strtolower($value) == "approved"){
                            $query->where('is_active', true)->whereNotNull('approval_by_id')->where('quotation_status', QuotationStatus::Approved->value());
                        }
                        if(strtolower($value) == "rejected"){
                            $query->where('is_active', true)->whereNotNull('approval_by_id')->where('quotation_status', QuotationStatus::Rejected->value());
                        }
                    }),
                    AllowedFilter::callback('is_created_by_agent', function (Builder $query, $value) {
                        if(strtolower($value) == "yes"){
                            $query->where('is_created_by_agent', true);
                        }
                        if(strtolower($value) == "no"){
                            $query->where('is_created_by_agent', false);
                        }
                    }),
                    AllowedFilter::callback('lead_source', function (Builder $query, $value) {
                        $query->where('lead_source', $value);
                    }),
                    AllowedFilter::callback('from_date', function (Builder $query, $value) {
                        if($value){
                            $query->whereDate('created_at', '>=', $value);
                        }
                    }),
                    AllowedFilter::callback('to_date', function (Builder $query, $value) {
                        if($value){
                            $query->whereDate('created_at', '<=', $value);
                        }
                    }),
                ]);
    }

    public function getByIdAndIsInactive(Int $id): Quotation
	{
		return $this->model()->where('is_active', false)->findOrFail($id);
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
            ->orWhere('part_year', 'LIKE', '%' . $value . '%')
            ->orWhere('part_model', 'LIKE', '%' . $value . '%')
            ->orWhere('part_make', 'LIKE', '%' . $value . '%')
            ->orWhere('part_name', 'LIKE', '%' . $value . '%')
            ->orWhere('part_number', 'LIKE', '%' . $value . '%')
            ->orWhere('part_description', 'LIKE', '%' . $value . '%')
            ->orWhere('billing_address', 'LIKE', '%' . $value . '%')
            ->orWhere('shipping_address', 'LIKE', '%' . $value . '%')
            ->orWhereHas('approvalBy', function($q) use($value){
                $q->where('name', 'LIKE', '%' . $value . '%')
                ->orWhere('email', 'LIKE', '%' . $value . '%')
                ->orWhere('phone', 'LIKE', '%' . $value . '%');
            });
        });
    }
}
