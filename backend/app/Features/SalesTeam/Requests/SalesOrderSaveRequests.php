<?php

namespace App\Features\SalesTeam\Requests;

use App\Features\Order\Enums\LeadSource;
use App\Features\SalesTeam\Services\SalesOrderService;
use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rule;

class SalesOrderSaveRequests extends InputRequest
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
            'phone' => ['required_if:is_active,1', 'numeric'],
            'country_code' => ['required_if:is_active,1', 'string', 'max:255'],
            'billing_address' => ['required_if:is_active,1', 'string'],
            'part_year' => ['required_if:is_active,1', 'numeric', 'min:1900', 'max:2100'],
            'part_model' => ['required_if:is_active,1', 'string', 'max:255'],
            'part_name' => ['required_if:is_active,1', 'string', 'max:255'],
            'part_description' => ['required_if:is_active,1', 'string'],
        ];

        if ($this->route('id')) {
            $data = (new SalesOrderService)->getByIdAndIsInactive($this->route('id'));
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

}
