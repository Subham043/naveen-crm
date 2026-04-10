<?php

namespace App\Features\SalesTeam\Exports;

use App\Features\Quotation\Enums\LeadSource;
use App\Features\Quotation\Enums\QuotationStatus;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class SalesQuotationExport implements FromQuery, WithHeadings, WithMapping
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
			$data->country_code,
			$data->phone,
			$data->part_year,
			$data->part_make,
			$data->part_model,
			$data->part_name,
			$data->part_number,
			$data->part_warranty,
			$data->part_vin,
			$data->part_description,
			$data->billing_address,
			$data->shipping_address,
			LeadSource::getValue($data->lead_source),
			$data->sales_user_id,
			$data->salesUser->name,
			$data->salesUser->email,
			$data->is_created_by_agent ? 'Yes' : 'No',
			$data->assigned_at ? $data->assigned_at->format('Y-m-d H:i:s') : null,
			$data->sale_price ?? 'N/A',
			$data->cost_price ?? 'N/A',
			$data->shipping_cost ?? 'N/A',
			$data->sales_tax ?? 'N/A',
			$data->gross_profit ?? 'N/A',
			QuotationStatus::getValue($data->quotation_status),
			$data->approval_by_id,
			$data->approvalBy->name,
			$data->approvalBy->email,
			$data->approval_at ? $data->approval_at->format('Y-m-d H:i:s') : null,
			$data->is_active ? 'Yes' : 'No',
			$data->quotation_sent ? 'Yes' : 'No',
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
			'Year',
			'Make',
			'Model',
			'Part',
			'Part#',
			'Warranty',
			'VIN',
			'Description',
			'Billing Address',
			'Shipping Address',
			'Lead Source',
			'Sales User Id',
			'Sales User Name',
			'Sales User Email',
			'Is Created By Agent',
			'Assigned At',
			'Sale Price',
			'Cost Price',
			'Shipment Price',
			'Sales Tax',
			'Gross Profit',
			'Quotation Status',
			'Approval By Id',
			'Approval By Name',
			'Approval By Email',
			'Approval At',
			'Is Active',
			'Quotation Sent',
			'Created At',
		];
	}
}
