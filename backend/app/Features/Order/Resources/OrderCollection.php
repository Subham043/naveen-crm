<?php

namespace App\Features\Order\Resources;

use App\Features\Order\Enums\InvoiceStatus;
use App\Features\Order\Enums\OrderStatus;
use App\Features\Order\Enums\PaymentStatus;
use App\Features\Order\Enums\PaymentCardType;
use App\Features\Order\Enums\PaymentGateway;
use App\Features\Order\Enums\TrackingStatus;
use App\Features\Order\Enums\ShipmentStatus;
use App\Features\Quotation\Resources\QuotationCollection;
use Illuminate\Http\Resources\Json\JsonResource;


class OrderCollection extends JsonResource
{
	/**
	 * Transform the resource collection into an array.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
	 */
	public function toArray($request)
	{
		return [
			'id' => $this->id,
			'payment_status' => $this->payment_status,
			'payment_status_info' => PaymentStatus::getValue($this->payment_status),
			'payment_card_type' => $this->payment_card_type,
			'payment_card_type_info' => PaymentCardType::getValue($this->payment_card_type),
			'payment_gateway' => $this->payment_gateway,
			'payment_gateway_info' => PaymentGateway::getValue($this->payment_gateway),
			'transaction_id' => $this->transaction_id,
			'yard_located' => $this->yard_located,
			'tracking_details' => $this->tracking_details,
			'tracking_status' => $this->tracking_status,
			'tracking_status_info' => TrackingStatus::getValue($this->tracking_status),
			'invoice_status' => $this->invoice_status,
			'invoice_status_info' => InvoiceStatus::getValue($this->invoice_status),
			'shipment_status' => $this->shipment_status,
			'shipment_status_info' => ShipmentStatus::getValue($this->shipment_status),
			'order_status' => $this->order_status,
			'order_status_info' => OrderStatus::getValue($this->order_status),
			'quotation_id' => $this->quotation_id,
			'quotation_info' => $this->quotation_id ? QuotationCollection::make($this->quotation) : null,
			'created_at' => $this->created_at,
			'updated_at' => $this->updated_at,
			'yards' => OrderYardCollection::collection($this->yards),
		];
	}
}
