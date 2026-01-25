<?php

namespace App\Features\Order\Exports;

use App\Features\Order\Enums\InvoiceStatus;
use App\Features\Order\Enums\LeadSource;
use App\Features\Order\Enums\OrderStatus;
use App\Features\Order\Enums\PaymentStatus;
use App\Features\Order\Enums\ShipmentStatus;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class OrderExport implements FromQuery, WithHeadings, WithMapping
{

	private QueryBuilder $query;
	public function __construct(QueryBuilder $query)
	{
		$this->query = $query;
	}
	public function query()
	{
		return $this->query; // Using cursor() to avoid memory overload
	}

	public function map($data): array
	{
		return [
			$data->id,
			$data->name,
			$data->email,
			$data->phone,
			$data->country_code,
			$data->billing_address,
			$data->part_name,
			$data->part_description,
			LeadSource::getValue($data->lead_source),
			$data->sales_user_id,
			$data->salesUser->name,
			$data->salesUser->email,
			$data->is_created_by_agent ? 'Yes' : 'No',
			$data->assigned_at ? $data->assigned_at->format('Y-m-d H:i:s') : null,
			PaymentStatus::getValue($data->payment_status),
			$data->total_price ?? 'N/A',
			$data->cost_price ?? 'N/A',
			$data->shipping_cost ?? 'N/A',
			$data->sales_tax ?? 'N/A',
			$data->gross_profit ?? 'N/A',
			$data->tracking_details ?? 'N/A',
			InvoiceStatus::getValue($data->invoice_status),
			ShipmentStatus::getValue($data->shipment_status),
			$data->yard_located ? 'Yes' : 'No',
			OrderStatus::getValue($data->order_status),
			$data->approval_by_id,
			$data->approvalBy->name,
			$data->approvalBy->email,
			$data->approval_at ? $data->approval_at->format('Y-m-d H:i:s') : null,
			$data->is_active ? 'Yes' : 'No',
			$data->created_at->format('Y-m-d H:i:s'),
		];
	}

	public function headings(): array
	{
		return [
			'Id',
			'Name',
			'Email',
			'Phone',
			'Country Code',
			'Billing Address',
			'Part Name',
			'Part Description',
			'Lead Source',
			'Sales User Id',
			'Sales User Name',
			'Sales User Email',
			'Is Created By Agent',
			'Assigned At',
			'Order Status',
			'Approval By Id',
			'Approval By Name',
			'Approval By Email',
			'Approval At',
			'Payment Status',
			'Total Price',
			'Cost Price',
			'Shipment Price',
			'Sales Tax',
			'Gross Profit',
			'Tracking Details',
			'Invoice Status',
			'Shipment Status',
			'Yard Located',
			'Is Active',
			'Created At',
		];
	}
}
