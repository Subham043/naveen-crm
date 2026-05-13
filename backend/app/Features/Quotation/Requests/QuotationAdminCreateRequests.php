<?php

namespace App\Features\Quotation\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use Illuminate\Support\Facades\Auth;

class QuotationAdminCreateRequests extends InputRequest
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
            'phone' => ['nullable', 'numeric'],
            'country_code' => ['nullable', 'string', 'max:255'],
            'billing_address' => ['nullable', 'string'],
            'shipping_address' => ['nullable', 'string'],
            'part_year' => ['nullable', 'numeric', 'min:1900', 'max:2100'],
            'part_model' => ['nullable', 'string', 'max:255'],
            'part_make' => ['nullable', 'string', 'max:255'],
            'part_name' => ['nullable', 'string', 'max:255'],
            'part_number' => ['nullable', 'string', 'max:255'],
            'part_description' => ['nullable', 'string'],
            'part_warranty' => ['nullable', 'numeric', 'min:0', 'max:12'],
            'part_vin' => ['nullable', 'string', 'max:255'],
            'sale_price' => ['nullable', 'numeric'],
            'cost_price' => ['nullable', 'numeric'],
            'shipping_cost' => ['nullable', 'numeric'],
        ];

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
        ];
    }

}
