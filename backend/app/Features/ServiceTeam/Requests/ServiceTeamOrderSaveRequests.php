<?php

namespace App\Features\ServiceTeam\Requests;

use App\Features\Order\Enums\InvoiceStatus;
use App\Features\Order\Enums\PaymentStatus;
use App\Features\Order\Enums\ShipmentStatus;
use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;

class ServiceTeamOrderSaveRequests extends InputRequest
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
            'total_price' => 'nullable|numeric',
            'cost_price' => 'nullable|numeric',
            'shipping_cost' => 'nullable|numeric',
            'tracking_details' => 'nullable|string',
            'yard_located' => 'required|boolean',
            'yards' => ['required_if:yard_located,1', 'array', 'min:1'],
            'yards.*.yard' => ['required_if:yard_located,1', 'string'],
            'yards.*.id' => ['nullable', 'numeric', 'exists:yards,id'],
            'payment_status' => ['required', 'numeric', new Enum(PaymentStatus::class)],
            'invoice_status' => ['required', 'numeric', new Enum(InvoiceStatus::class)],
            'shipment_status' => ['required', 'numeric', new Enum(ShipmentStatus::class)],
            'comment' => 'required|string',
        ];
    }

}
