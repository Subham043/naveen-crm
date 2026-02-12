<?php

namespace App\Features\SalesTeam\Exports;

use App\Features\Order\Enums\LeadSource;
use App\Features\Order\Enums\OrderStatus;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class SalesOrderExport implements FromQuery, WithHeadings, WithMapping
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
			$data->part_year,
			$data->part_model,
			$data->part_name,
			$data->part_description,
			LeadSource::getValue($data->lead_source),
			$data->sales_user_id,
			$data->salesUser->name,
			$data->salesUser->email,
			$data->is_created_by_agent,
			$data->assigned_at ? $data->assigned_at->format('Y-m-d H:i:s') : null,
			OrderStatus::getValue($data->order_status),
			$data->approval_by_id,
			$data->approvalBy->name,
			$data->approvalBy->email,
			$data->approval_at ? $data->approval_at->format('Y-m-d H:i:s') : null,
			$data->is_active,
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
			'Part Year',
			'Part Model',
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
			'Is Active',
			'Created At',
		];
	}
}
