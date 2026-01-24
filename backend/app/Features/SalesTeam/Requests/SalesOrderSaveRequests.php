<?php

namespace App\Features\SalesTeam\Requests;

use App\Features\Order\Enums\LeadSource;
use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;

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
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'is_active' => 'required|boolean',
            'phone' => ['required_if:is_active,1', 'numeric'],
            'country_code' => ['required_if:is_active,1', 'string', 'max:255'],
            'billing_address' => ['required_if:is_active,1', 'string'],
            'part_name' => ['required_if:is_active,1', 'string', 'max:255'],
            'part_description' => ['required_if:is_active,1', 'string'],
            'lead_source' => ['required', 'numeric', new Enum(LeadSource::class)],
        ];
    }

}
