<?php

namespace App\Features\Quotation\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use Illuminate\Support\Facades\Auth;

class QuotationSaveRequests extends InputRequest
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
            'quotation_sent' => 'required|boolean',
            'phone' => ['required', 'numeric'],
            'country_code' => ['required', 'string', 'max:255'],
            'billing_address' => ['required', 'string'],
            'shipping_address' => ['required', 'string'],
            'part_year' => ['required', 'numeric', 'min:1900', 'max:2100'],
            'part_model' => ['required', 'string', 'max:255'],
            'part_make' => ['required', 'string', 'max:255'],
            'part_name' => ['required', 'string', 'max:255'],
            'part_description' => ['required', 'string'],
            'sale_price' => ['required', 'numeric'],
            'cost_price' => ['required', 'numeric'],
            'shipping_cost' => ['required', 'numeric'],
        ];

        return $rules;
    }

}
