<?php

namespace App\Features\Order\Requests;

use App\Features\Order\Enums\InvoiceStatus;
use App\Features\Order\Enums\OrderStatus;
use App\Features\Order\Enums\PaymentCardType;
use App\Features\Order\Enums\PaymentGateway;
use App\Features\Order\Enums\PaymentStatus;
use App\Features\Order\Enums\POStatus;
use App\Features\Order\Enums\TrackingStatus;
use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rule;

class OrderSaveRequests extends InputRequest
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
            'email' => 'required|string|email:rfc,dns|max:255',
            'phone' => ['required', 'numeric'],
            'country_code' => ['required', 'string', 'max:255'],
            'billing_address' => ['required', 'string'],
            'shipping_address' => ['required', 'string'],
            'part_year' => ['required', 'numeric', 'min:1900', 'max:2100'],
            'part_model' => ['required', 'string', 'max:255'],
            'part_make' => ['required', 'string', 'max:255'],
            'part_name' => ['required', 'string', 'max:255'],
            'part_number' => ['required', 'string', 'max:255'],
            'part_description' => ['required', 'string'],
            'sale_price' => 'required|numeric',
            'cost_price' => 'required|numeric',
            'shipping_cost' => 'required|numeric',
            'tracking_details' => 'nullable|string',
            'tracking_status' => ['required', 'numeric', new Enum(TrackingStatus::class)],
            'yard_located' => 'required|boolean',
            'yards' => [Rule::excludeIf(fn() => $this->yard_located == 0), 'array', 'min:1'],
            'yards.*.yard' => [Rule::excludeIf(fn() => $this->yard_located == 0), 'string'],
            'yards.*.id' => ['nullable', 'numeric', 'exists:yards,id'],
            'payment_status' => ['required', 'numeric', new Enum(PaymentStatus::class)],
            'payment_card_type' => ['required_if:payment_status,1', 'required_if:payment_status,2', 'numeric', new Enum(PaymentCardType::class)],
            'payment_gateway' => ['required_if:payment_status,1', 'required_if:payment_status,2', 'numeric', new Enum(PaymentGateway::class)],
            'transaction_id' => ['required_if:payment_status,1', 'required_if:payment_status,2', 'string'],
            'invoice_status' => ['required', 'numeric', new Enum(InvoiceStatus::class)],
            'po_status' => ['required', 'numeric', new Enum(POStatus::class)],
            'order_status' => ['required', 'numeric', new Enum(OrderStatus::class)],
        ];
    }

}
