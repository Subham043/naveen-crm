<?php

namespace App\Features\Order\Exports;

use App\Features\Order\Enums\InvoiceStatus;
use App\Features\Quotation\Enums\LeadSource;
use App\Features\Order\Enums\OrderStatus;
use App\Features\Quotation\Enums\QuotationStatus;
use App\Features\Order\Enums\PaymentStatus;
use App\Features\Order\Enums\PaymentCardType;
use App\Features\Order\Enums\PaymentGateway;
use App\Features\Order\Enums\TrackingStatus;
use App\Features\Order\Enums\POStatus;
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
			$data->quotation->name,
			$data->quotation->email,
			$data->quotation->country_code,
			$data->quotation->phone,
			$data->quotation->part_year,
			$data->quotation->part_make,
			$data->quotation->part_model,
			$data->quotation->part_name,
			$data->quotation->part_number,
			$data->quotation->part_description,
			$data->quotation->billing_address,
			LeadSource::getValue($data->quotation->lead_source),
			$data->quotation->sales_user_id,
			$data->quotation->salesUser->name,
			$data->quotation->salesUser->email,
			$data->quotation->is_created_by_agent ? 'Yes' : 'No',
			$data->quotation->assigned_at ? $data->quotation->assigned_at->format('Y-m-d H:i:s') : null,
			QuotationStatus::getValue($data->quotation->quotation_status),
			PaymentStatus::getValue($data->payment_status),
			PaymentCardType::getValue($data->payment_card_type),
			PaymentGateway::getValue($data->payment_gateway),
			$data->quotation->sale_price ?? 'N/A',
			$data->quotation->cost_price ?? 'N/A',
			$data->quotation->shipping_cost ?? 'N/A',
			$data->quotation->sales_tax ?? 'N/A',
			$data->quotation->gross_profit ?? 'N/A',
			$data->tracking_details ?? 'N/A',
			TrackingStatus::getValue($data->tracking_status),
			InvoiceStatus::getValue($data->invoice_status),
			POStatus::getValue($data->po_status),
			$data->yard_located ? 'Yes' : 'No',
			OrderStatus::getValue($data->order_status),
			$data->quotation->approval_by_id,
			$data->quotation->approvalBy->name,
			$data->quotation->approvalBy->email,
			$data->quotation->approval_at ? $data->quotation->approval_at->format('Y-m-d H:i:s') : null,
			$data->quotation->is_active ? 'Yes' : 'No',
			$data->created_at->format('Y-m-d H:i:s'),
		];
	}

	public function headings(): array
	{
		return [
			'Id',
			'Name',
			'Email',
			'Country Code',
			'Phone',
			'Part Year',
			'Part Make',
			'Part Model',
			'Part Name',
			'Part Number',
			'Part Description',
			'Billing Address',
			'Lead Source',
			'Sales User Id',
			'Sales User Name',
			'Sales User Email',
			'Is Created By Agent',
			'Assigned At',
			'Quotation Status',
			'Payment Status',
			'Payment Card Type',
			'Payment Gateway',
			'Sale Price',
			'Cost Price',
			'Shipment Price',
			'Sales Tax',
			'Gross Profit',
			'Tracking Details',
			'Tracking Status',
			'Invoice Status',
			'PO Status',
			'Yard Located',
			'Order Status',
			'Approval By Id',
			'Approval By Name',
			'Approval By Email',
			'Approval At',
			'Is Active',
			'Created At',
		];
	}
}
