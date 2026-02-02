<?php

namespace App\Features\Report\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class AgentPerformanceReportExport implements FromQuery, WithHeadings, WithMapping
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
			$data->sales_user_id,
			$data->salesUser->name,
			$data->salesUser->email,
			$data->salesUser->phone,
			$data->total_leads,
			$data->total_sales,
			$data->total_profit,
			$data->converted_leads,
			$data->conversion_rate,
		];
	}

	public function headings(): array
	{
		return [
			'Sales User Id',
			'Sales User Name',
			'Sales User Email',
			'Sales User Phone',
			'Total Leads',
			'Total Sales',
			'Total Profit',
			'Converted Leads',
			'Conversion Rate',
		];
	}
}
