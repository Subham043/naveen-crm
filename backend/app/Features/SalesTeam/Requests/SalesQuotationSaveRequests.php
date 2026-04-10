<?php

namespace App\Features\SalesTeam\Requests;

use App\Features\Quotation\Enums\LeadSource;
use App\Features\SalesTeam\Services\SalesQuotationService;
use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rule;

class SalesQuotationSaveRequests extends InputRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return Auth::guard(Guards::API->value())->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email:rfc,dns|max:255',
            'is_active' => 'required|boolean',
            'quotation_sent' => 'required|boolean',
            'phone' => ['required_if:is_active,1', 'numeric'],
            'country_code' => ['required_if:is_active,1', 'string', 'max:255'],
            'billing_address' => ['required_if:is_active,1', 'string'],
            'shipping_address' => ['required_if:is_active,1', 'string'],
            'part_year' => ['required_if:is_active,1', 'numeric', 'min:1900', 'max:2100'],
            'part_model' => ['required_if:is_active,1', 'string', 'max:255'],
            'part_make' => ['required_if:is_active,1', 'string', 'max:255'],
            'part_name' => ['required_if:is_active,1', 'string', 'max:255'],
            'part_number' => ['required_if:is_active,1', 'string', 'max:255'],
            'part_description' => ['required_if:is_active,1', 'string'],
            'part_warranty' => ['required_if:is_active,1', 'numeric', 'min:0', 'max:12'],
            'part_vin' => ['required_if:is_active,1', 'string', 'max:255'],
            'sale_price' => ['required_if:is_active,1', 'numeric'],
            'cost_price' => ['required_if:is_active,1', 'numeric'],
            'shipping_cost' => ['required_if:is_active,1', 'numeric'],
        ];

        if ($this->route('id')) {
            $data = (new SalesQuotationService)->getByIdAndIsInactive($this->route('id'));
            if ($data->lead_source === LeadSource::Website->value()) {
                $rules['lead_source'] = ['required', 'numeric', new Enum(LeadSource::class), Rule::in([LeadSource::Website->value])];
            } else {
                $rules['lead_source'] = ['required', 'numeric', new Enum(LeadSource::class), Rule::notIn([LeadSource::Website->value])];
            }
        } else {
            $rules['lead_source'] = ['required', 'numeric', new Enum(LeadSource::class), Rule::notIn([LeadSource::Website->value])];
        }

        return $rules;
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'part_name' => 'part',
            'part_number' => 'part#',
            'part_description' => 'description',
            'part_year' => 'year',
            'part_make' => 'make',
            'part_model' => 'model',
            'part_warranty' => 'warranty',
            'part_warranty' => 'vin',
        ];
    }

}
